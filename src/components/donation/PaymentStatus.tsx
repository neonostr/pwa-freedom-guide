
import React from "react";
import { DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PaymentStatusProps {
  onClose: () => void;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ onClose }) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Thank You!</DialogTitle>
        <DialogDescription>Your support is greatly appreciated</DialogDescription>
      </DialogHeader>
      <div className="py-8 text-center">
        <div className="mb-4 text-5xl">✨</div>
        <p className="text-lg">Thank you for your generous donation!</p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Your support helps keep this project going.
        </p>
      </div>
      <DialogFooter>
        <Button onClick={onClose}>Close</Button>
      </DialogFooter>
    </>
  );
};

export default PaymentStatus;
