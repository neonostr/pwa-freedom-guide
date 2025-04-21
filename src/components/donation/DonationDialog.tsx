
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
import { fetchLnurlData, generateInvoice, checkPaymentStatus, LnurlResponse, InvoiceResponse } from "@/services/coinosService";
import { toast } from "@/hooks/use-toast";
import AmountSelector from "@/components/donation/AmountSelector";
import InvoiceDisplay from "@/components/donation/InvoiceDisplay";
import ThankYouView from "@/components/donation/ThankYouView";

interface DonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_AMOUNTS = [1000, 5000, 10000, 21000];
const POLLING_INTERVAL = 2000; // ms
const TIMEOUT_DURATION = 300000; // ms (5 min)

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

  // Fetch LNURL data when dialog opens
  useEffect(() => {
    if (isOpen && step === "select") {
      setIsLoading(true);
      fetchLnurlData()
        .then(data => {
          setLnurlData(data);
          setError(null);
        })
        .catch(err => {
          setError("Failed to load donation info. Please try again later.");
          console.error("LNURL fetch error:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // Cleanup on close/unmount
    return () => {
      if (timerId) clearInterval(timerId);
      if (timeoutId) clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, step]);

  // User selects to proceed to pay
  const handleProceedToPayment = async () => {
    if (!lnurlData) return;
    const finalAmount = customAmount ? parseInt(customAmount) : amount;
    
    // Validate amount
    if (!finalAmount) {
      toast({
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }
    
    // Validate min/max
    if (finalAmount < lnurlData.minSendable / 1000 || finalAmount > lnurlData.maxSendable / 1000) {
      toast({
        description: `Amount must be between ${lnurlData.minSendable / 1000} and ${lnurlData.maxSendable / 1000} sats`,
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // Changed recipient from "neo21" to "pwa"
      const invoiceData = await generateInvoice(finalAmount, lnurlData, "pwa");
      console.log("Invoice generated:", invoiceData);
      setInvoice(invoiceData);
      setStep("pay");
      
      // Poll payment status
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
      
      // Set timeout after 5min
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

  const handlePaymentSuccess = () => {
    if (timerId) clearInterval(timerId);
    if (timeoutId) clearTimeout(timeoutId);
    setIsPaid(true);
    setStep("thankyou");
    toast({
      description: "Your support is greatly appreciated.",
    });
  };

  // always clean up on close
  const handleClose = () => {
    if (timerId) clearInterval(timerId);
    if (timeoutId) clearTimeout(timeoutId);
    setAmount(PRESET_AMOUNTS[0]);
    setCustomAmount("");
    setInvoice(null);
    setError(null);
    setIsPaid(false);
    setStep("select");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] dark:bg-[#0f172a]">
        {step === "select" && (
          <>
            <DialogHeader>
              <DialogTitle>
                <span className="flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-orange-400" />
                  Zap me a coffee
                </span>
              </DialogTitle>
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
                <AmountSelector 
                  amount={amount}
                  customAmount={customAmount}
                  setAmount={setAmount}
                  setCustomAmount={setCustomAmount}
                  presetAmounts={PRESET_AMOUNTS}
                />
              )}
            </div>
            <DialogFooter>
              <Button
                onClick={handleProceedToPayment}
                disabled={isLoading || (!amount && !customAmount) || !!error}
                className="w-full bg-orange-500 hover:bg-orange-600 dark:text-white dark:bg-[#121f38] dark:hover:bg-[#1a2942] dark:border dark:border-gray-700"
              >
                Zap {customAmount || amount} sats
              </Button>
            </DialogFooter>
          </>
        )}
        {step === "pay" && invoice && (
          <>
            <DialogHeader>
              <DialogTitle>Scan to pay</DialogTitle>
              <DialogDescription>
                Pay {customAmount || amount} sats to support this project
              </DialogDescription>
            </DialogHeader>
            <InvoiceDisplay 
              invoice={invoice}
              amount={customAmount || amount}
              isLoading={isLoading}
              error={error}
            />
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={handleClose}
                className="dark:bg-[#121f38] dark:hover:bg-[#1a2942] dark:border dark:border-gray-700"
              >
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
            <ThankYouView />
            <DialogFooter>
              <Button 
                onClick={handleClose}
                className="dark:bg-[#121f38] dark:hover:bg-[#1a2942] dark:border dark:border-gray-700"
              >
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DonationDialog;
