import React from "react";
import { Chrome } from "lucide-react";

interface InstallationGuideProps {
  lang: string;
  content: any;
}

export default function InstallationGuide({ lang, content }: InstallationGuideProps) {
  // Safari icon from the provided SVG file
  const safariIcon = (
    <svg className="w-5 h-5 inline align-text-bottom mr-1" viewBox="0 0 66.17 65.8">
      <defs>
        <linearGradient id="safari-grad-b">
          <stop offset="0" stopColor="#06c2e7"/>
          <stop offset=".25" stopColor="#0db8ec"/>
          <stop offset=".5" stopColor="#12aef1"/>
          <stop offset=".75" stopColor="#1f86f9"/>
          <stop offset="1" stopColor="#107ddd"/>
        </linearGradient>
        <linearGradient id="safari-grad-a">
          <stop offset="0" stopColor="#bdbdbd"/>
          <stop offset="1" stopColor="#fff"/>
        </linearGradient>
      </defs>
      <circle cx="33.08" cy="32.9" r="32.9" fill="#fff"/>
      <circle cx="33.08" cy="32.9" r="28.87" fill="url(#safari-grad-b)"/>
      <path fill="#f4f2f3" d="M33.08 4.02a.42.42 0 00-.42.42v4.85c0 .23.19.42.42.42a.42.42 0 00.42-.42V4.44a.42.42 0 00-.42-.42zm-2.75.17c-.03 0-.06 0-.09 0-.23.03-.4.23-.37.47l.21 2.03c.02.23.23.4.46.37.23-.02.4-.23.38-.46l-.22-2.03c-.02-.2-.18-.36-.37-.38zm5.53 0c-.2.02-.36.17-.38.38l-.21 2.03c-.03.23.14.44.37.46.23.02.44-.14.46-.37l.22-2.03c.02-.23-.15-.44-.38-.47-.03 0-.06 0-.08 0z"/>
      <path fill="#ff5150" d="m36.38 34.84-6.6-6.91 23.42-15.75z"/>
      <path fill="#f1f1f1" d="m36.38 34.84-6.6-6.91-16.82 22.66z"/>
    </svg>
  );

  // Chrome icon
  const chromeIcon = (
    <svg className="w-5 h-5 inline align-text-bottom mr-1" viewBox="0 0 48 48">
      <defs>
        <linearGradient id="chrome-a" x1="3.2173" y1="15" x2="44.7812" y2="15">
          <stop offset="0" stopColor="#d93025"/>
          <stop offset="1" stopColor="#ea4335"/>
        </linearGradient>
        <linearGradient id="chrome-b" x1="20.7219" y1="47.6791" x2="41.5039" y2="11.6837">
          <stop offset="0" stopColor="#fcc934"/>
          <stop offset="1" stopColor="#fbbc04"/>
        </linearGradient>
        <linearGradient id="chrome-c" x1="26.5981" y1="46.5015" x2="5.8161" y2="10.506">
          <stop offset="0" stopColor="#1e8e3e"/>
          <stop offset="1" stopColor="#34a853"/>
        </linearGradient>
      </defs>
      <circle cx="24" cy="23.9947" r="12" fill="#fff"/>
      <path d="M24,12H44.7812a23.9939,23.9939,0,0,0-41.5639.0029L13.6079,30l.0093-.0024A11.9852,11.9852,0,0,1,24,12Z" fill="url(#chrome-a)"/>
      <circle cx="24" cy="24" r="9.5" fill="#1a73e8"/>
      <path d="M34.3913,30.0029,24.0007,48A23.994,23.994,0,0,0,44.78,12.0031H23.9989l-.0025.0093A11.985,11.985,0,0,1,34.3913,30.0029Z" fill="url(#chrome-b)"/>
      <path d="M13.6086,30.0031,3.218,12.006A23.994,23.994,0,0,0,24.0025,48L34.3931,30.0029l-.0067-.0068a11.9852,11.9852,0,0,1-20.7778.007Z" fill="url(#chrome-c)"/>
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
    appleIcon: (
      <svg className="w-5 h-5 inline align-text-bottom mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a9 9 0 0 0-9 9c0 4.17 2.84 7.67 6.69 8.69a.5.5 0 0 0 .62-.45V17.5c-2.5.5-3-1-3-1-.41-1.12-1-1.41-1-1.41-.82-.56.06-.55.06-.55.91.06 1.39.94 1.39.94.8 1.37 2.1.98 2.62.75.08-.58.31-.98.56-1.21-2-.23-4.1-1-4.1-4.44 0-.98.35-1.79.92-2.42-.09-.22-.4-1.13.09-2.35 0 0 .75-.24 2.44.91a8.5 8.5 0 0 1 4.5 0c1.69-1.15 2.44-.91 2.44-.91.49 1.22.18 2.13.09 2.35.57.63.91 1.44.91 2.42 0 3.47-2.1 4.2-4.1 4.42.32.27.6.8.6 1.62v2.42c0 .23.19.43.42.5A9 9 0 0 0 12 2z" />
      </svg>
    ),
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
              {ICONS.safari}
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
