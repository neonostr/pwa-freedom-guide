
import React from "react";
import { Button } from "@/components/ui/button";

interface AmountSelectorProps {
  amount: number;
  customAmount: string;
  setAmount: (amount: number) => void;
  setCustomAmount: (amount: string) => void;
  presetAmounts: number[];
}

const AmountSelector: React.FC<AmountSelectorProps> = ({
  amount,
  customAmount,
  setAmount,
  setCustomAmount,
  presetAmounts,
}) => {
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {presetAmounts.map(presetAmount => (
          <Button
            key={presetAmount}
            variant="outline"
            onClick={() => {
              setAmount(presetAmount);
              setCustomAmount("");
            }}
            className={`w-full ${
              amount === presetAmount && !customAmount 
                ? 'bg-[#0f172a] text-white dark:bg-[#121f38] dark:text-white dark:border dark:border-gray-700'
                : 'border-gray-200 dark:border-gray-700 dark:bg-[#1a1f2c] dark:text-gray-200'
            }`}
          >
            {presetAmount.toLocaleString()} sats
          </Button>
        ))}
      </div>
      
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Custom amount (sats)
        </label>
        <input
          type="text"
          value={customAmount}
          onChange={handleCustomAmountChange}
          className="w-full p-3 text-center text-lg border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a1f2c] dark:border-gray-700 dark:text-gray-200"
          placeholder="Enter custom amount"
        />
      </div>
    </div>
  );
};

export default AmountSelector;
