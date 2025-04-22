import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { fetchLnurlData, generateInvoice, checkPaymentStatus, LnurlResponse, InvoiceResponse } from "@/services/coinosService";
import { toast } from "@/hooks/use-toast";
import AmountSelect from "./donation/AmountSelect";
import PaymentQRCode from "./donation/PaymentQRCode";
import PaymentStatus from "./donation/PaymentStatus";

interface DonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
}

const PRESET_AMOUNTS = [1000, 5000, 10000, 21000];
const POLLING_INTERVAL = 2000;
const TIMEOUT_DURATION = 300000;

const DonationDialog: React.FC<DonationDialogProps> = ({ isOpen, onClose, lang }) => {
  const [amount, setAmount] = useState<number>(PRESET_AMOUNTS[0]);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [lnurlData, setLnurlData] = useState<LnurlResponse | null>(null);
  const [invoice, setInvoice] = useState<InvoiceResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "pay" | "thankyou">("select");
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

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
    return () => {
      if (timerId) clearInterval(timerId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOpen, step]);

  const handleProceedToPayment = async () => {
    if (!lnurlData) return;
    const finalAmount = customAmount ? parseInt(customAmount) : amount;
    if (finalAmount < lnurlData.minSendable / 1000 || finalAmount > lnurlData.maxSendable / 1000) {
      toast({
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
    setStep("thankyou");
    toast({
      description: "Your support is greatly appreciated.",
    });
  };

  const handleClose = () => {
    if (timerId) clearInterval(timerId);
    if (timeoutId) clearTimeout(timeoutId);
    setAmount(PRESET_AMOUNTS[0]);
    setCustomAmount("");
    setInvoice(null);
    setError(null);
    setStep("select");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {step === "select" && (
          <AmountSelect
            amount={amount}
            customAmount={customAmount}
            isLoading={isLoading}
            error={error}
            presetAmounts={PRESET_AMOUNTS}
            onAmountSelect={setAmount}
            onCustomAmountChange={setCustomAmount}
            onProceed={handleProceedToPayment}
            lang={lang}
          />
        )}
        {step === "pay" && invoice && (
          <PaymentQRCode
            amount={customAmount || amount}
            invoice={invoice}
            isLoading={isLoading}
            error={error}
            onClose={handleClose}
          />
        )}
        {step === "thankyou" && <PaymentStatus onClose={handleClose} />}
      </DialogContent>
    </Dialog>
  );
};

export default DonationDialog;
