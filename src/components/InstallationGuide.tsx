import React from "react";
import { Chrome, Apple } from "lucide-react";

interface InstallationGuideProps {
  lang: string;
  content: any;
}

export default function InstallationGuide({ lang, content }: InstallationGuideProps) {
  // Safari icon based on Safari_browser_logo.svg from Wikipedia
  const safariIcon = (
    <svg className="w-5 h-5 inline align-text-bottom mr-1" viewBox="0 0 1024 1024">
      <defs>
        <linearGradient id="b">
          <stop offset="0" stopColor="#06c2e7"/>
          <stop offset=".25000015" stopColor="#0db8ec"/>
          <stop offset=".5000003" stopColor="#12aef1"/>
          <stop offset=".75000012" stopColor="#1f86f9"/>
          <stop offset="1" stopColor="#107ddd"/>
        </linearGradient>
        <linearGradient id="a">
          <stop offset="0" stopColor="#bdbdbd"/>
          <stop offset="1" stopColor="#fff"/>
        </linearGradient>
      </defs>
      <circle cx="512" cy="512" r="512" fill="#fff"/>
      <path fill="url(#b)" d="M380.83911 211.97671a28.870571 28.870571 0 0 1-28.87057 28.87057 28.870571 28.870571 0 0 1-28.87057-28.87057 28.870571 28.870571 0 0 1 28.87057-28.87057 28.870571 28.870571 0 0 1 28.87057 28.87057z" transform="translate(-318.88562 -180.59501)"/>
      <path fill="#f4f2f3" d="M33.08292 4.01671l-.42092.42092V9.2928l.42092.42092.42092-.42092V4.43763z"/>
    </svg>
  );

  // Chrome icon based on Google_Chrome_icon_(February_2022).svg from Wikipedia
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
