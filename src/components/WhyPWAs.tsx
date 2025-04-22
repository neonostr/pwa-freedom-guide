
import React from "react";

interface WhyPWAsProps {
  whyTitle: string;
  whyItems: string[];
}

export default function WhyPWAs({ whyTitle, whyItems }: WhyPWAsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-200 mb-2">
        {whyTitle}
      </h2>
      <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-lg space-y-2">
        {whyItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
