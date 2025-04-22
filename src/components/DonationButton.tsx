
import React, { useState } from "react";
import { BadgeDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import DonationDialog from "@/components/DonationDialog";

interface DonationButtonProps {
  lang: string;
}

const DonationButton: React.FC<DonationButtonProps> = ({ lang }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 border-blue-300 dark:border-blue-700"
        onClick={() => setIsDialogOpen(true)}
      >
        <BadgeDollarSign className="h-4 w-4" />
        <span>Zap me a coffee</span>
      </Button>
      <DonationDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        lang={lang}
      />
    </>
  );
};

export default DonationButton;
