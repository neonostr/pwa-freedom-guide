
import React, { useEffect, useState } from "react";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QRCode from "@/components/QRCode";
import { fetchLnurlData, generateInvoice, checkPaymentStatus, LnurlResponse, InvoiceResponse } from "@/services/coinosService";
import { toast } from "@/components/ui/sonner";

interface DonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_AMOUNTS = [1000, 5000, 10000, 21000];
const POLLING_INTERVAL = 2000; // 2 seconds
const TIMEOUT_DURATION = 300000; // 5 minutes

const DonationDialog: React.FC<DonationDialogProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<number>(PRESET_AMOUNTS[0]);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [lnurlData, setLnurlData] = useState<LnurlResponse | null>(null);
  const [invoice, setInvoice] = useState<InvoiceResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "pay" | "thankyou">("select");
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Fetch LNURL data when the dialog opens
  useEffect(() => {
    if (isOpen && step === "select") {
      setIsLoading(true);
      fetchLnurlData()
        .then(data => {
          setLnurlData(data);
          setError(null);
        })
        .catch(err => {
          setError("Failed to load donation information. Please try again later.");
          console.error("LNURL fetch error:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOpen, step]);

  // Handle custom amount change
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
  };

  // Handle proceed to payment
  const handleProceedToPayment = async () => {
    if (!lnurlData) return;

    const finalAmount = customAmount ? parseInt(customAmount) : amount;
    
    // Validate amount
    if (finalAmount < lnurlData.minSendable / 1000 || finalAmount > lnurlData.maxSendable / 1000) {
      toast({
        title: "Invalid amount",
        description: `Amount must be between ${lnurlData.minSendable / 1000} and ${lnurlData.maxSendable / 1000} sats`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const invoiceData = await generateInvoice(finalAmount, lnurlData);
      setInvoice(invoiceData);
      setStep("pay");
      
      // Start polling for payment status
      const intervalId = setInterval(() => {
        if (invoiceData.verify) {
          checkPaymentStatus(invoiceData.verify)
            .then(status => {
              if (status.settled) {
                handlePaymentSuccess();
              }
            })
            .catch(err => console.error("Payment status check error:", err));
        }
      }, POLLING_INTERVAL);
      
      setTimerId(intervalId);
      
      // Set timeout after 5 minutes
      const timeout = setTimeout(() => {
        clearInterval(intervalId);
        setError("Payment timeout. Please try again.");
        setStep("select");
      }, TIMEOUT_DURATION);
      
      setTimeoutId(timeout);
    } catch (err) {
      setError("Failed to generate invoice. Please try again.");
      console.error("Invoice generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle payment success
  const handlePaymentSuccess = () => {
    if (timerId) clearInterval(timerId);
    if (timeoutId) clearTimeout(timeoutId);
    
    setIsPaid(true);
    setStep("thankyou");
    toast({
      title: "Thank you for your donation!",
      description: "Your support is greatly appreciated.",
    });
  };

  // Handle dialog close
  const handleClose = () => {
    if (timerId) clearInterval(timerId);
    if (timeoutId) clearTimeout(timeoutId);
    
    // Reset state
    setAmount(PRESET_AMOUNTS[0]);
    setCustomAmount("");
    setInvoice(null);
    setError(null);
    setIsPaid(false);
    setStep("select");
    
    onClose();
  };

  // Copy invoice to clipboard
  const copyInvoiceToClipboard = () => {
    if (!invoice) return;
    
    navigator.clipboard.writeText(invoice.pr)
      .then(() => {
        toast({
          title: "Copied to clipboard!",
          description: "Invoice copied to clipboard",
        });
      })
      .catch(err => {
        console.error("Failed to copy:", err);
        toast({
          title: "Failed to copy",
          description: "Please copy the invoice manually",
          variant: "destructive",
        });
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {step === "select" && (
          <>
            <DialogHeader>
              <DialogTitle>Zap me a coffee</DialogTitle>
              <DialogDescription>
                Support this project with a Bitcoin Lightning donation
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              {isLoading ? (
                <div className="flex justify-center my-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {PRESET_AMOUNTS.map(presetAmount => (
                      <Button
                        key={presetAmount}
                        variant={amount === presetAmount && !customAmount ? "default" : "outline"}
                        onClick={() => {
                          setAmount(presetAmount);
                          setCustomAmount("");
                        }}
                        className="w-full"
                      >
                        {presetAmount.toLocaleString()} sats
                      </Button>
                    ))}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Custom amount (sats)</label>
                    <input
                      type="text"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      onFocus={() => setAmount(0)}
                      className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                      placeholder="Enter custom amount"
                    />
                  </div>
                </>
              )}
            </div>
            
            <DialogFooter>
              <Button
                onClick={handleProceedToPayment}
                disabled={isLoading || (!amount && !customAmount) || !!error}
              >
                Continue
              </Button>
            </DialogFooter>
          </>
        )}
        
        {step === "pay" && invoice && (
          <>
            <DialogHeader>
              <DialogTitle>Scan to pay</DialogTitle>
              <DialogDescription>
                {`Pay ${customAmount || amount} sats to support this project`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 flex flex-col items-center">
              <QRCode data={invoice.pr} size={200} />
              <div className="mt-4 w-full">
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={invoice.pr}
                    className="w-full p-2 pr-10 border rounded-md bg-gray-100 dark:bg-gray-800 dark:border-gray-700 text-xs overflow-hidden text-ellipsis"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                    onClick={copyInvoiceToClipboard}
                  >
                    Copy
                  </Button>
                </div>
              </div>
              {isLoading && (
                <div className="mt-4 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500 mr-2"></div>
                  <span>Waiting for payment...</span>
                </div>
              )}
              {error && <div className="mt-4 text-red-500">{error}</div>}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DialogFooter>
          </>
        )}
        
        {step === "thankyou" && (
          <>
            <DialogHeader>
              <DialogTitle>Thank You!</DialogTitle>
              <DialogDescription>
                Your support is greatly appreciated
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-8 text-center">
              <div className="mb-4 text-5xl">✨</div>
              <p className="text-lg">Thank you for your generous donation!</p>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Your support helps keep this project going.
              </p>
            </div>
            
            <DialogFooter>
              <Button onClick={handleClose}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DonationDialog;
