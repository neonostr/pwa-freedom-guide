
import React from "react";
import DonationButton from "@/components/DonationButton";

interface FooterProps {
  lang: string;
}

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="text-center py-6 text-gray-500 dark:text-gray-400 w-full">
      <div className="mb-4 flex justify-center">
        <DonationButton lang={lang} />
      </div>
      <div>
        Built by{" "}
        <a 
          href="https://neo21.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Neo
        </a>
        , freedom‑first app developer.
      </div>
    </footer>
  );
}
