import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';
import { 
  Settings, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Smartphone,
  Shield,
  Zap
} from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface TokenStatus {
  hasToken: boolean;
  expiresAt?: string;
  timeUntilExpiry?: number;
  autoRefreshEnabled: boolean;
}

export function DarajaApiSettings() {
  const [tokenStatus, setTokenStatus] = useState<TokenStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [toggling, setToggling] = useState(false);

  const fetchTokenStatus = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2faa717c/daraja/token/status`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();
      if (result.success) {
        setTokenStatus(result.data);
      } else {
        console.error('Failed to fetch token status:', result.error);
        toast.error('Failed to fetch token status');
      }
    } catch (error) {
      console.error('Error fetching token status:', error);
      toast.error('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    setRefreshing(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2faa717c/daraja/token/refresh`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();
      if (result.success) {
        toast.success('Token refreshed successfully!');
        await fetchTokenStatus();
      } else {
        toast.error(result.error || 'Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      toast.error('Error refreshing token');
    } finally {
      setRefreshing(false);
    }
  };

  const toggleAutoRefresh = async (enabled: boolean) => {
    setToggling(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2faa717c/daraja/auto-refresh/toggle`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ enabled }),
        }
      );

      const result = await response.json();
      if (result.success) {
        setTokenStatus(result.data);
        toast.success(`Auto-refresh ${enabled ? 'enabled' : 'disabled'} successfully!`);
      } else {
        toast.error(result.error || 'Failed to toggle auto-refresh');
      }
    } catch (error) {
      console.error('Error toggling auto-refresh:', error);
      toast.error('Error updating settings');
    } finally {
      setToggling(false);
    }
  };

  const formatTimeRemaining = (milliseconds: number): string => {
    if (milliseconds <= 0) return 'Expired';
    
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const getTokenStatusColor = (): string => {
    if (!tokenStatus?.hasToken) return 'text-red-600';
    if (!tokenStatus.timeUntilExpiry || tokenStatus.timeUntilExpiry < 5 * 60 * 1000) return 'text-orange-600';
    return 'text-green-600';
  };

  const getTokenStatusIcon = () => {
    if (!tokenStatus?.hasToken) return <AlertTriangle className="h-4 w-4 text-red-600" />;
    if (!tokenStatus.timeUntilExpiry || tokenStatus.timeUntilExpiry < 5 * 60 * 1000) return <Clock className="h-4 w-4 text-orange-600" />;
    return <CheckCircle className="h-4 w-4 text-green-600" />;
  };

  useEffect(() => {
    fetchTokenStatus();
    
    // Refresh status every 30 seconds
    const interval = setInterval(fetchTokenStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-600">Loading API settings...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-amber-600" />
            <span>M-Pesa Daraja API Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Token Status */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getTokenStatusIcon()}
                <span className="font-medium">Access Token Status</span>
              </div>
              <Badge variant={tokenStatus?.hasToken ? 'default' : 'destructive'}>
                {tokenStatus?.hasToken ? 'Active' : 'Missing'}
              </Badge>
            </div>

            {tokenStatus?.hasToken && tokenStatus.expiresAt && (
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Expires at:</span>
                  <span>{new Date(tokenStatus.expiresAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time remaining:</span>
                  <span className={getTokenStatusColor()}>
                    {formatTimeRemaining(tokenStatus.timeUntilExpiry || 0)}
                  </span>
                </div>
              </div>
            )}

            <Button
              onClick={refreshToken}
              disabled={refreshing}
              variant="outline"
              size="sm"
              className="w-full"
            >
              {refreshing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Token Now
                </>
              )}
            </Button>
          </div>

          {/* Auto Refresh Toggle */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Auto Token Refresh</span>
                </div>
                <p className="text-sm text-gray-600">
                  Automatically refresh token every 59 minutes
                </p>
              </div>
              <Switch
                checked={tokenStatus?.autoRefreshEnabled || false}
                onCheckedChange={toggleAutoRefresh}
                disabled={toggling}
              />
            </div>

            {tokenStatus?.autoRefreshEnabled && (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Auto-refresh is enabled. Your M-Pesa API token will be automatically renewed every 59 minutes to ensure uninterrupted service.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* M-Pesa Information */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4 text-green-600" />
              <span className="font-medium">M-Pesa Integration</span>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Environment:</span>
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    Sandbox
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Till Number:</span>
                  <span className="font-mono">8470666</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Business Name:</span>
                  <span>Wamocho's Cuts and Locks</span>
                </div>
              </div>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Production Note:</strong> This is currently configured for Safaricom's sandbox environment. 
                For production use, update the API endpoints and credentials in your environment variables.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}