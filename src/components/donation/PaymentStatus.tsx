
import React from "react";
import { DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const TRANSLATIONS = {
  en: {
    title: "Thank You!",
    description: "Your support is greatly appreciated",
    message1: "Thank you for your generous donation!",
    message2: "Your support helps keep this project going.",
    close: "Close"
  },
  de: {
    title: "Vielen Dank!",
    description: "Deine Unterstützung wird sehr geschätzt",
    message1: "Vielen Dank für deine großzügige Spende!",
    message2: "Deine Unterstützung hilft, dieses Projekt am Laufen zu halten.",
    close: "Schließen"
  },
  es: {
    title: "¡Gracias!",
    description: "Tu apoyo es muy apreciado",
    message1: "¡Gracias por tu generosa donación!",
    message2: "Tu apoyo ayuda a mantener este proyecto en marcha.",
    close: "Cerrar"
  }
};

interface PaymentStatusProps {
  onClose: () => void;
  lang: string;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ onClose, lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t.title}</DialogTitle>
        <DialogDescription>{t.description}</DialogDescription>
      </DialogHeader>
      <div className="py-8 text-center">
        <div className="mb-4 text-5xl">✨</div>
        <p className="text-lg">{t.message1}</p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {t.message2}
        </p>
      </div>
      <DialogFooter>
        <Button onClick={onClose}>{t.close}</Button>
      </DialogFooter>
    </>
  );
};

export default PaymentStatus;
