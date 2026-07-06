import { createClient } from 'npm:@supabase/supabase-js@2.45.1';
import * as kv from './kv_store.tsx';

export class DarajaTokenManager {
  private supabase;
  private consumerKey: string;
  private consumerSecret: string;
  private tokenRefreshInterval: NodeJS.Timeout | null = null;
  private autoRefreshEnabled = false;

  constructor() {
    this.supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    this.consumerKey = Deno.env.get('DARAJA_CONSUMER_KEY') || '';
    this.consumerSecret = Deno.env.get('DARAJA_CONSUMER_SECRET') || '';
  }

  /**
   * Generate Base64 encoded credentials for Daraja API
   */
  private generateAuthHeader(): string {
    const credentials = `${this.consumerKey}:${this.consumerSecret}`;
    const base64Credentials = btoa(credentials);
    return `Basic ${base64Credentials}`;
  }

  /**
   * Fetch new access token from Daraja API
   */
  async fetchNewToken(): Promise<{ success: boolean; token?: string; expiresIn?: number; error?: string }> {
    try {
      const authHeader = this.generateAuthHeader();
      
      // Using sandbox URL - change to production URL when going live
      const response = await fetch(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Token fetch failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.access_token) {
        // Store token in KV store with timestamp
        const tokenData = {
          access_token: data.access_token,
          expires_in: data.expires_in || 3599, // Default to 59 minutes 59 seconds
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + (data.expires_in || 3599) * 1000).toISOString()
        };

        await kv.set('daraja_access_token', tokenData);
        
        console.log('✅ New Daraja access token generated successfully');
        
        return {
          success: true,
          token: data.access_token,
          expiresIn: data.expires_in
        };
      } else {
        throw new Error('No access token in response');
      }
    } catch (error) {
      console.error('❌ Error fetching Daraja token:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get current valid token (fetch new if expired or missing)
   */
  async getCurrentToken(): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
      const storedToken = await kv.get('daraja_access_token');
      
      if (storedToken && storedToken.access_token) {
        const expiresAt = new Date(storedToken.expires_at);
        const now = new Date();
        const timeUntilExpiry = expiresAt.getTime() - now.getTime();
        
        // If token expires in less than 5 minutes, refresh it
        if (timeUntilExpiry > 5 * 60 * 1000) {
          return {
            success: true,
            token: storedToken.access_token
          };
        }
      }

      // Token is expired or missing, fetch a new one
      console.log('🔄 Token expired or missing, fetching new token...');
      return await this.fetchNewToken();
    } catch (error) {
      console.error('❌ Error getting current token:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Start automatic token refresh every 59 minutes
   */
  async startAutoRefresh(): Promise<void> {
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
    }

    // Fetch initial token
    await this.fetchNewToken();

    // Set up automatic refresh every 59 minutes (3540000 ms)
    this.tokenRefreshInterval = setInterval(async () => {
      console.log('🔄 Auto-refreshing Daraja token...');
      await this.fetchNewToken();
    }, 59 * 60 * 1000);

    this.autoRefreshEnabled = true;
    await kv.set('daraja_auto_refresh_enabled', true);
    
    console.log('✅ Auto token refresh started (every 59 minutes)');
  }

  /**
   * Stop automatic token refresh
   */
  async stopAutoRefresh(): Promise<void> {
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
      this.tokenRefreshInterval = null;
    }

    this.autoRefreshEnabled = false;
    await kv.set('daraja_auto_refresh_enabled', false);
    
    console.log('🛑 Auto token refresh stopped');
  }

  /**
   * Get auto refresh status
   */
  async getAutoRefreshStatus(): Promise<boolean> {
    const status = await kv.get('daraja_auto_refresh_enabled');
    return status === true;
  }

  /**
   * Get token status information
   */
  async getTokenStatus(): Promise<{
    hasToken: boolean;
    expiresAt?: string;
    timeUntilExpiry?: number;
    autoRefreshEnabled: boolean;
  }> {
    const storedToken = await kv.get('daraja_access_token');
    const autoRefreshEnabled = await this.getAutoRefreshStatus();
    
    if (!storedToken || !storedToken.access_token) {
      return {
        hasToken: false,
        autoRefreshEnabled
      };
    }

    const expiresAt = new Date(storedToken.expires_at);
    const now = new Date();
    const timeUntilExpiry = Math.max(0, expiresAt.getTime() - now.getTime());

    return {
      hasToken: true,
      expiresAt: storedToken.expires_at,
      timeUntilExpiry,
      autoRefreshEnabled
    };
  }

  /**
   * Initialize the token manager based on stored settings
   */
  async initialize(): Promise<void> {
    const autoRefreshEnabled = await this.getAutoRefreshStatus();
    
    if (autoRefreshEnabled) {
      await this.startAutoRefresh();
    }
  }
}

// Export singleton instance
export const darajaTokenManager = new DarajaTokenManager();