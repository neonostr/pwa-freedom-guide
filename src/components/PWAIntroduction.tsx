
import React from "react";

interface PWAIntroductionProps {
  title: string;
  introText: string[];
}

export default function PWAIntroduction({ title, introText }: PWAIntroductionProps) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-purple-700 dark:text-purple-300 mb-3">
        {title}
      </h1>
      {introText.map((line, i) => (
        <p className="mb-2 text-gray-700 dark:text-gray-200 text-lg leading-relaxed" key={i}>
          {line}
        </p>
      ))}
    </div>
  );
}
