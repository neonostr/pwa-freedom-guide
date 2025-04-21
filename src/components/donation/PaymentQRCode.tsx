
import React from "react";
import { DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import QRCode from "@/components/QRCode";
import CopyButton from "@/components/CopyButton";

interface PaymentQRCodeProps {
  amount: number | string;
  invoice: { pr: string };
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}

const PaymentQRCode: React.FC<PaymentQRCodeProps> = ({
  amount,
  invoice,
  isLoading,
  error,
  onClose,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Scan to pay</DialogTitle>
        <DialogDescription>{`Pay ${amount} sats to support this project`}</DialogDescription>
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
            <CopyButton textToCopy={invoice.pr} />
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
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </DialogFooter>
    </>
  );
};

export default PaymentQRCode;
