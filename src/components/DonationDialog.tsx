
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useDonationPayment } from "@/hooks/useDonationPayment";
import AmountSelect from "./donation/AmountSelect";
import PaymentQRCode from "./donation/PaymentQRCode";
import PaymentStatus from "./donation/PaymentStatus";

interface DonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
}

const PRESET_AMOUNTS = [1000, 5000, 10000, 21000];

const DonationDialog: React.FC<DonationDialogProps> = ({ isOpen, onClose, lang }) => {
  const {
    amount,
    customAmount,
    invoice,
    isLoading,
    error,
    step,
    setAmount,
    setCustomAmount,
    loadLnurlData,
    handleProceedToPayment,
    reset
  } = useDonationPayment(PRESET_AMOUNTS);

  useEffect(() => {
    if (isOpen && step === "select") {
      loadLnurlData();
    }
  }, [isOpen, step]);

  const handleClose = () => {
    reset();
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
            lang={lang}
          />
        )}
        {step === "thankyou" && <PaymentStatus onClose={handleClose} lang={lang} />}
      </DialogContent>
    </Dialog>
  );
};

export default DonationDialog;
