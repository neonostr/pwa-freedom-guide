
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
      <div className="mb-6">
        <label className="block text-lg font-medium text-center mb-2">Amount (sats)</label>
        <input
          type="text"
          value={customAmount || amount}
          onChange={handleCustomAmountChange}
          className="w-full p-3 text-center text-xl border rounded-md dark:bg-gray-800 dark:border-gray-700"
          placeholder="Enter amount"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {presetAmounts.map(presetAmount => (
          <Button
            key={presetAmount}
            variant={amount === presetAmount && !customAmount ? "default" : "outline"}
            onClick={() => {
              setAmount(presetAmount);
              setCustomAmount("");
            }}
            className={`w-full ${amount === presetAmount && !customAmount ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
          >
            {presetAmount.toLocaleString()}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AmountSelector;
