/**
 * Service for Coinos LNURL donation.
 *
 * Uses username: "pwa"
 */
const COINOS_USERNAME = "pwa"; // updated from "neo21" to "pwa"

export interface LnurlResponse {
  callback: string;
  maxSendable: number; // in msats
  minSendable: number; // in msats
  metadata: string;
  commentAllowed: number;
  tag: string;
  domain: string;
}

export interface InvoiceResponse {
  pr: string; // invoice
  routes: any[];
  verify?: string; // optional: status-check url
}

export async function fetchLnurlData(): Promise<LnurlResponse> {
  const res = await fetch(`https://coinos.io/.well-known/lnurlp/${COINOS_USERNAME}`);
  if (!res.ok) throw new Error("Unable to get LNURL details.");
  return await res.json();
}

export async function generateInvoice(amountSats: number, lnurl: LnurlResponse): Promise<InvoiceResponse> {
  if (!lnurl.callback) throw new Error("LNURL callback not found.");
  // Coinos wants msats!
  const msats = amountSats * 1000;
  const url = `${lnurl.callback}?amount=${msats}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to create invoice.");
  return await res.json();
}

export async function checkPaymentStatus(verifyUrl: string): Promise<{ settled: boolean }> {
  // Coinos verify URL returns { settled: true/false } if payment detected
  const res = await fetch(verifyUrl, { cache: "no-store" });
  if (!res.ok) throw new Error("Unable to check payment status.");
  return await res.json();
}
