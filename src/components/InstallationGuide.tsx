import React from "react";
import { Apple, Chrome } from "lucide-react";

interface InstallationGuideProps {
  lang: string;
  content: any;
}

export default function InstallationGuide({ lang, content }: InstallationGuideProps) {
  // Safari icon based on requested link https://en.m.wikipedia.org/wiki/File:Safari_browser_logo.svg
  const safariIcon = (
    <svg className="w-5 h-5 inline align-text-bottom mr-1" viewBox="0 0 1024 1024">
      <circle cx="512" cy="512" r="512" fill="#FFFFFF"/>
      <circle cx="512" cy="512" r="474" fill="#0FB5EE"/>
      <circle cx="512" cy="512" r="420" fill="#FFFFFF"/>
      <linearGradient id="safari-red" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C8010F" stopOpacity="1" />
        <stop offset="100%" stopColor="#FF3647" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="safari-blue" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00329B" stopOpacity="1" />
        <stop offset="100%" stopColor="#0868F9" stopOpacity="1" />
      </linearGradient>
      <path d="M512,92 L512,932" stroke="url(#safari-red)" strokeWidth="40"/>
      <path d="M92,512 L932,512" stroke="url(#safari-blue)" strokeWidth="40"/>
    </svg>
  );

  // Chrome icon based on requested link https://en.m.wikipedia.org/wiki/File:Google_Chrome_icon_(February_2022).svg
  const chromeIcon = (
    <svg className="w-5 h-5 inline align-text-bottom mr-1" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="#FFFFFF"/>
      <path d="M50,13 A37,37 0 1,1 13,50 L50,50 Z" fill="#EA4335"/>
      <path d="M87,50 A37,37 0 0,1 50,87 L50,50 Z" fill="#34A853"/>
      <path d="M50,87 A37,37 0 0,1 13,50 L50,50 Z" fill="#FBBC05"/>
      <path d="M50,13 A37,37 0 0,1 87,50 L50,50 Z" fill="#4285F4"/>
      <circle cx="50" cy="50" r="15" fill="#FFFFFF"/>
      <circle cx="50" cy="50" r="12" fill="#4285F4"/>
    </svg>
  );

  // Other icons from the original file
  const ICONS = {
    menu: (
      <svg className="w-5 h-5 inline align-text-bottom mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    ),
    plus: (
      <svg className="w-5 h-5 inline align-text-bottom mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
    home: (
      <svg className="w-5 h-5 inline align-text-bottom mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    share: (
      <svg className="w-5 h-5 inline align-text-bottom mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <path d="M16 6l-4-4-4 4" />
        <path d="M12 2v13" />
      </svg>
    ),
    safari: safariIcon,
    chrome: chromeIcon,
    appleIcon: <Apple className="w-5 h-5 inline align-text-bottom mr-1" />,
    chromeIcon: <Chrome className="w-5 h-5 inline align-text-bottom mr-1" />
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-200 mb-2">
        {lang === "en"
          ? "How to install & use"
          : lang === "de"
          ? "Installation & Nutzung"
          : "Cómo instalar y usar"}
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white/70 dark:bg-[#22235b60] rounded-lg p-4 pb-3 shadow-sm">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center">
            <span className="inline-block w-7 h-7 bg-gray-100 dark:bg-[#2b2e3d] rounded mr-2 flex items-center justify-center font-bold text-purple-500 dark:text-purple-300 text-lg">
              {ICONS.appleIcon}
            </span>
            iOS (Safari)
          </h3>
          <ol className="space-y-2 text-gray-700 dark:text-gray-200">
            {content.install.ios.map((item, i) => (
              <li key={i} className="flex items-start gap-1">
                {item.icon ? <span className="mt-0.5">{ICONS[item.icon]}</span> : null}
                <span>{item.step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex-1 bg-white/70 dark:bg-[#15302660] rounded-lg p-4 pb-3 shadow-sm">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center">
            <span className="inline-block w-7 h-7 bg-green-100 dark:bg-green-800 rounded mr-2 flex items-center justify-center font-bold text-green-500 dark:text-green-200 text-lg">
              {ICONS.chromeIcon}
            </span>
            Android (Chrome/Firefox)
          </h3>
          <ol className="space-y-2 text-gray-700 dark:text-gray-200">
            {content.install.android.map((item, i) => (
              <li key={i} className="flex items-start gap-1">
                {item.icon ? <span className="mt-0.5">{ICONS[item.icon]}</span> : null}
                <span>{item.step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
