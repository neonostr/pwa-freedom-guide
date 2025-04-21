
import React from "react";
import { Button } from "@/components/ui/button";
import QRCode from "@/components/QRCode";
import { toast } from "@/hooks/use-toast";
import { InvoiceResponse } from "@/services/coinosService";

interface InvoiceDisplayProps {
  invoice: InvoiceResponse;
  amount: number | string;
  isLoading: boolean;
  error: string | null;
}

const InvoiceDisplay: React.FC<InvoiceDisplayProps> = ({ invoice, amount, isLoading, error }) => {
  const copyInvoiceToClipboard = () => {
    navigator.clipboard.writeText(invoice.pr)
      .then(() => {
        toast({
          description: "Invoice copied to clipboard",
        });
      })
      .catch(err => {
        console.error("Failed to copy:", err);
        toast({
          description: "Failed to copy. Please copy manually.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="py-4 flex flex-col items-center">
      <div className="bg-white p-4 rounded-lg mb-4">
        <QRCode data={invoice.pr} size={200} />
      </div>
      <div className="mt-2 w-full">
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
  );
};

export default InvoiceDisplay;
