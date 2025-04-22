
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BadgeDollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";

const TRANSLATIONS = {
  en: {
    title: "Zap me a coffee",
    description: "Support this project with a Bitcoin Lightning donation",
    customAmount: "Custom amount (sats)",
    enterCustomAmount: "Enter custom amount",
    continue: "Continue"
  },
  de: {
    title: "Spendiere mir einen Kaffee",
    description: "Unterstütze dieses Projekt mit einer Spende über Bitcoin Lightning",
    customAmount: "Individueller Betrag (Sats)",
    enterCustomAmount: "Gib einen Betrag ein",
    continue: "Weiter"
  },
  es: {
    title: "Invítame un café",
    description: "Apoya este proyecto con una donación mediante Bitcoin Lightning",
    customAmount: "Cantidad personalizada (sats)",
    enterCustomAmount: "Ingresa una cantidad",
    continue: "Continuar"
  }
};

interface AmountSelectProps {
  amount: number;
  customAmount: string;
  isLoading: boolean;
  error: string | null;
  presetAmounts: number[];
  onAmountSelect: (amount: number) => void;
  onCustomAmountChange: (value: string) => void;
  onProceed: (lang: string) => void;
  lang: string;
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
  lang,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  const handlePresetAmountSelect = (presetAmount: number) => {
    onAmountSelect(presetAmount);
    onCustomAmountChange(presetAmount.toString()); // Update the input field with the selected amount
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <span className="flex items-center gap-2">
            <BadgeDollarSign className="w-5 h-5 text-yellow-400" />
            {t.title}
          </span>
        </DialogTitle>
        <DialogDescription>{t.description}</DialogDescription>
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
              <label className="block text-sm font-medium mb-1">{t.customAmount}</label>
              <Input
                type="text"
                value={customAmount}
                onChange={(e) => onCustomAmountChange(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder={`${t.enterCustomAmount} (${amount} sats)`}
                className="w-full dark:bg-gray-800"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {presetAmounts.map((presetAmount) => (
                <Button
                  key={presetAmount}
                  variant={amount === presetAmount ? "default" : "outline"}
                  onClick={() => handlePresetAmountSelect(presetAmount)}
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
          onClick={() => onProceed(lang)}
          disabled={isLoading || (!amount && !customAmount) || !!error}
        >
          {t.continue}
        </Button>
      </DialogFooter>
    </>
  );
};

export default AmountSelect;
