
import React from "react";

interface HeaderProps {
  lang: string;
  setLang: (lang: string) => void;
  dark: boolean;
  setDark: (dark: boolean) => void;
}

function classNames(...cls: string[]) {
  return cls.filter(Boolean).join(" ");
}

const LANGS = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
];

export default function Header({ lang, setLang, dark, setDark }: HeaderProps) {
  return (
    <header className="bg-white/80 dark:bg-[#1a1f2ccf] backdrop-blur sticky top-0 z-20 shadow-sm">
      <nav className="flex flex-col md:flex-row items-center justify-between px-4 py-2 max-w-3xl mx-auto">
        <a
          href="#pwa"
          className="text-lg md:text-xl font-bold text-purple-600 hover:text-purple-800 dark:text-purple-300 dark:hover:text-purple-200 transition"
          aria-label="What is a PWA?"
          id="pwa-link"
        >
          What is a PWA?
        </a>
        <div className="flex gap-4 items-center mt-4 md:mt-0">
          <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-[#282841] p-1 border border-gray-200 dark:border-gray-700">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={classNames(
                  "px-3 py-1 rounded-md text-sm font-medium transition focus:outline-none",
                  lang === l.code
                    ? "bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-100"
                    : "text-gray-500 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-200"
                )}
                aria-pressed={lang === l.code}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDark(!dark)}
            className={`ml-2 rounded-full p-2 bg-gray-200 dark:bg-gray-700 shadow transition`}
          >
            {dark ? (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path
                  fill="#ffe082"
                  className="dark:fill-gray-100"
                  d="M21 12.79A9 9 0 0111.21 3c-.14 0-.19.18-.09.26A7 7 0 1012 22c4.27 0 7.83-3.69 8.79-8.91.02-.11-.08-.23-.2-.16z"
                />
              </svg>
            ) : (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" fill="#fbbf24" />
                <g stroke="#fbbf24" strokeWidth="2">
                  <line x1="12" x2="12" y1="1" y2="4" />
                  <line x1="12" x2="12" y1="20" y2="23" />
                  <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
                  <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
                  <line x1="1" x2="4" y1="12" y2="12" />
                  <line x1="20" x2="23" y1="12" y2="12" />
                  <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
                  <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
                </g>
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
