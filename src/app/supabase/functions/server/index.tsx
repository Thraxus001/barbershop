import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { darajaTokenManager } from './daraja-token-manager.tsx';

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Daraja token manager on server start
darajaTokenManager.initialize().catch(console.error);

// Health check endpoint
app.get("/make-server-2faa717c/health", (c) => {
  return c.json({ status: "ok" });
});

// Daraja API Management Routes
app.get('/make-server-2faa717c/daraja/token/status', async (c) => {
  try {
    const status = await darajaTokenManager.getTokenStatus();
    return c.json({ success: true, data: status });
  } catch (error) {
    console.error('Error getting token status:', error);
    return c.json({ success: false, error: 'Failed to get token status' }, 500);
  }
});

app.post('/make-server-2faa717c/daraja/token/refresh', async (c) => {
  try {
    const result = await darajaTokenManager.fetchNewToken();
    return c.json(result);
  } catch (error) {
    console.error('Error refreshing token:', error);
    return c.json({ success: false, error: 'Failed to refresh token' }, 500);
  }
});

app.post('/make-server-2faa717c/daraja/auto-refresh/toggle', async (c) => {
  try {
    const { enabled } = await c.req.json();
    
    if (enabled) {
      await darajaTokenManager.startAutoRefresh();
    } else {
      await darajaTokenManager.stopAutoRefresh();
    }
    
    const status = await darajaTokenManager.getTokenStatus();
    return c.json({ success: true, data: status });
  } catch (error) {
    console.error('Error toggling auto-refresh:', error);
    return c.json({ success: false, error: 'Failed to toggle auto-refresh' }, 500);
  }
});

// M-Pesa STK Push Route
app.post('/make-server-2faa717c/daraja/stk-push', async (c) => {
  try {
    const { phone, amount, accountReference, transactionDesc } = await c.req.json();
    
    // Get current valid token
    const tokenResult = await darajaTokenManager.getCurrentToken();
    if (!tokenResult.success || !tokenResult.token) {
      return c.json({ success: false, error: 'Failed to get access token' }, 500);
    }

    // Format phone number (remove + and ensure it starts with 254)
    let formattedPhone = phone.replace(/[^0-9]/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    }
    if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').substring(0, 14);
    const shortCode = '174379'; // Sandbox shortcode
    const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'; // Sandbox passkey
    const password = btoa(shortCode + passkey + timestamp);

    const stkPushPayload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: shortCode,
      PhoneNumber: formattedPhone,
      CallBackURL: 'https://your-callback-url.com/callback', // Replace with actual callback URL
      AccountReference: accountReference || 'Wamocho Cuts',
      TransactionDesc: transactionDesc || 'Barber Shop Payment'
    };

    const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenResult.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stkPushPayload),
    });

    const result = await response.json();
    
    if (response.ok && result.ResponseCode === '0') {
      // Store transaction for tracking
      await kv.set(`transaction_${result.CheckoutRequestID}`, {
        checkoutRequestId: result.CheckoutRequestID,
        merchantRequestId: result.MerchantRequestID,
        phone: formattedPhone,
        amount,
        timestamp: new Date().toISOString(),
        status: 'initiated'
      });

      return c.json({ 
        success: true, 
        data: {
          checkoutRequestId: result.CheckoutRequestID,
          merchantRequestId: result.MerchantRequestID,
          responseDescription: result.ResponseDescription
        }
      });
    } else {
      console.error('STK Push failed:', result);
      return c.json({ success: false, error: result.errorMessage || 'STK Push failed' }, 400);
    }
  } catch (error) {
    console.error('Error initiating STK push:', error);
    return c.json({ success: false, error: 'Failed to initiate payment' }, 500);
  }
});

// M-Pesa Callback Route (for production use)
app.post('/make-server-2faa717c/daraja/callback', async (c) => {
  try {
    const callbackData = await c.req.json();
    console.log('M-Pesa Callback received:', callbackData);
    
    // Process callback and update transaction status
    // This is where you'd handle payment confirmation
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error processing callback:', error);
    return c.json({ success: false, error: 'Callback processing failed' }, 500);
  }
});

Deno.serve(app.fetch);