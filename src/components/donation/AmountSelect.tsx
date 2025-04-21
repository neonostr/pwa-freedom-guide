
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BadgeDollarSign } from "lucide-react";

interface AmountSelectProps {
  amount: number;
  customAmount: string;
  isLoading: boolean;
  error: string | null;
  presetAmounts: number[];
  onAmountSelect: (amount: number) => void;
  onCustomAmountChange: (value: string) => void;
  onProceed: () => void;
}

const AmountSelect: React.FC<AmountSelectProps> = ({
  amount,
  customAmount,
  isLoading,
  error,
  presetAmounts,
  onAmountSelect,
  onCustomAmountChange,
  onProceed,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <span className="flex items-center gap-2">
            <BadgeDollarSign className="w-5 h-5 text-yellow-400" />
            Zap me a coffee
          </span>
        </DialogTitle>
        <DialogDescription>Support this project with a Bitcoin Lightning donation</DialogDescription>
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
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Custom amount (sats)</label>
              <input
                type="text"
                value={customAmount}
                onChange={(e) => onCustomAmountChange(e.target.value.replace(/[^0-9]/g, ""))}
                onFocus={() => onAmountSelect(0)}
                placeholder={`Enter custom amount (${amount} sats)`}
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {presetAmounts.map((presetAmount) => (
                <Button
                  key={presetAmount}
                  variant={amount === presetAmount && !customAmount ? "default" : "outline"}
                  onClick={() => {
                    onAmountSelect(presetAmount);
                    onCustomAmountChange("");
                  }}
                  className="w-full"
                >
                  {presetAmount.toLocaleString()} sats
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
      <DialogFooter>
        <Button
          onClick={onProceed}
          disabled={isLoading || (!amount && !customAmount) || !!error}
        >
          Continue
        </Button>
      </DialogFooter>
    </>
  );
};

export default AmountSelect;
