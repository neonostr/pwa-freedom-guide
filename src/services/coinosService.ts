
import { toast } from "@/components/ui/sonner";

// Configuration
const COINOS_USERNAME = "pwa";
const LNURL_BASE = `https://coinos.io/.well-known/lnurlp/${COINOS_USERNAME}`;

// Types
export interface LnurlResponse {
  callback: string;
  maxSendable: number;
  minSendable: number;
  metadata: string;
  tag: string;
}

export interface InvoiceResponse {
  pr: string;
  routes: any[];
  successAction: {
    tag: string;
    message: string;
  };
  verify: string;
}

export interface PaymentStatus {
  settled: boolean;
}

// Fetch LNURL data
export async function fetchLnurlData(): Promise<LnurlResponse> {
  try {
    const response = await fetch(LNURL_BASE);
    
    if (!response.ok) {
      throw new Error(`LNURL fetch failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching LNURL data:", error);
    throw error;
  }
}

// Generate an invoice
export async function generateInvoice(amount: number, lnurlData: LnurlResponse): Promise<InvoiceResponse> {
  try {
    // Convert sats to millisats
    const amountInMillisats = amount * 1000;
    
    // Validate amount
    if (amountInMillisats < lnurlData.minSendable || amountInMillisats > lnurlData.maxSendable) {
      throw new Error(`Amount must be between ${lnurlData.minSendable / 1000} and ${lnurlData.maxSendable / 1000} sats`);
    }
    
    // Generate invoice using the callback URL
    const callbackURL = `${lnurlData.callback}?amount=${amountInMillisats}`;
    const response = await fetch(callbackURL);
    
    if (!response.ok) {
      throw new Error(`Invoice generation failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error generating invoice:", error);
    throw error;
  }
}

// Check payment status
export async function checkPaymentStatus(verifyUrl: string): Promise<PaymentStatus> {
  try {
    const response = await fetch(verifyUrl);
    
    if (!response.ok) {
      throw new Error(`Payment verification failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error checking payment status:", error);
    throw error;
  }
}
