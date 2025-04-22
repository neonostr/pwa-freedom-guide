
import { useState, useEffect } from "react";
import { fetchLnurlData, generateInvoice, checkPaymentStatus, LnurlResponse, InvoiceResponse } from "@/services/coinosService";
import { toast } from "@/hooks/use-toast";

const POLLING_INTERVAL = 2000;
const TIMEOUT_DURATION = 300000;

export const useDonationPayment = (presetAmounts: number[]) => {
  const [amount, setAmount] = useState<number>(presetAmounts[0]);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [lnurlData, setLnurlData] = useState<LnurlResponse | null>(null);
  const [invoice, setInvoice] = useState<InvoiceResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "pay" | "thankyou">("select");
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const loadLnurlData = () => {
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
  };

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
      startPaymentPolling(invoiceData);
    } catch (err) {
      setError("Failed to generate invoice. Please try again.");
      console.error("Invoice generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const startPaymentPolling = (invoiceData: InvoiceResponse) => {
    clearTimeouts();
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
  };

  const handlePaymentSuccess = () => {
    clearTimeouts();
    setStep("thankyou");
    toast({
      description: "Your support is greatly appreciated.",
    });
  };

  const clearTimeouts = () => {
    if (timerId) clearInterval(timerId);
    if (timeoutId) clearTimeout(timeoutId);
  };

  const reset = () => {
    setAmount(presetAmounts[0]);
    setCustomAmount("");
    setInvoice(null);
    setError(null);
    setStep("select");
    clearTimeouts();
  };

  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, []);

  return {
    amount,
    customAmount,
    lnurlData,
    invoice,
    isLoading,
    error,
    step,
    setAmount,
    setCustomAmount,
    loadLnurlData,
    handleProceedToPayment,
    handlePaymentSuccess,
    reset,
  };
};
