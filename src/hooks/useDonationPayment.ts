
import { useState, useEffect } from "react";
import { fetchLnurlData, generateInvoice, checkPaymentStatus, LnurlResponse, InvoiceResponse } from "@/services/coinosService";
import { toast } from "@/hooks/use-toast";

const POLLING_INTERVAL = 2000;
const TIMEOUT_DURATION = 300000;

const TRANSLATIONS = {
  en: {
    amountError: "Amount must be between {min} and {max} sats",
    paymentTimeout: "Payment timeout. Please try again.",
    fetchError: "Failed to load donation info. Please try again later.",
    invoiceError: "Failed to generate invoice. Please try again."
  },
  de: {
    amountError: "Der Betrag muss zwischen {min} und {max} Sats liegen",
    paymentTimeout: "Zahlungszeitüberschreitung. Bitte versuche es erneut.",
    fetchError: "Fehler beim Laden der Spendeninformationen. Bitte versuche es später noch einmal.",
    invoiceError: "Fehler beim Generieren der Rechnung. Bitte versuche es erneut."
  },
  es: {
    amountError: "La cantidad debe estar entre {min} y {max} sats",
    paymentTimeout: "Tiempo de pago agotado. Por favor, inténtalo de nuevo.",
    fetchError: "No se pudo cargar la información de la donación. Por favor, inténtalo más tarde.",
    invoiceError: "No se pudo generar la factura. Por favor, inténtalo de nuevo."
  }
};

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
  const [lang, setLang] = useState<string>("en");

  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  const loadLnurlData = () => {
    setIsLoading(true);
    fetchLnurlData()
      .then(data => {
        setLnurlData(data);
        setError(null);
      })
      .catch(err => {
        setError(t.fetchError);
        console.error("LNURL fetch error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleProceedToPayment = async (language: string = "en") => {
    setLang(language);
    if (!lnurlData) return;
    const finalAmount = customAmount ? parseInt(customAmount) : amount;
    if (finalAmount < lnurlData.minSendable / 1000 || finalAmount > lnurlData.maxSendable / 1000) {
      const minSats = lnurlData.minSendable / 1000;
      const maxSats = lnurlData.maxSendable / 1000;
      const errorMessage = TRANSLATIONS[language].amountError
        .replace("{min}", minSats.toString())
        .replace("{max}", maxSats.toString());
      
      toast({
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const invoiceData = await generateInvoice(finalAmount, lnurlData);
      setInvoice(invoiceData);
      setStep("pay");
      startPaymentPolling(invoiceData, language);
    } catch (err) {
      setError(TRANSLATIONS[language].invoiceError);
      console.error("Invoice generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const startPaymentPolling = (invoiceData: InvoiceResponse, language: string) => {
    clearTimeouts();
    const intervalId = setInterval(() => {
      if (invoiceData.verify) {
        checkPaymentStatus(invoiceData.verify)
          .then(status => {
            if (status.settled) {
              handlePaymentSuccess(language);
            }
          })
          .catch(err => console.error("Payment status check error:", err));
      }
    }, POLLING_INTERVAL);
    setTimerId(intervalId);
    
    const timeout = setTimeout(() => {
      clearInterval(intervalId);
      setError(TRANSLATIONS[language].paymentTimeout);
      setStep("select");
    }, TIMEOUT_DURATION);
    setTimeoutId(timeout);
  };

  const handlePaymentSuccess = (language: string) => {
    clearTimeouts();
    setStep("thankyou");
    // Success toast notification removed
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
