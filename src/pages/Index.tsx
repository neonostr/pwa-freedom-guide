import { useState, useRef, useEffect } from "react";
import DonationButton from "@/components/DonationButton";

const LANGS = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
];

const CONTENT = {
  en: {
    title: "What is a PWA?",
    what: [
      "A Progressive Web App (PWA) is a website that works like a native app on your device.",
      "PWAs run entirely in your browser, but you can install them to your home screen and use them offline.",
      "They don't require visiting an app store—just install from your browser for a fast, native-like experience.",
    ],
    install: {
      ios: [
        { step: "Open this site in Safari.", icon: "menu" },
        { step: "Tap the Share icon.", icon: "square-plus" },
        { step: "Choose \"Add to Home Screen.\"", icon: "plus" },
        { step: "Tap Add.", icon: "" },
        { step: "The app is now on your home screen!", icon: "" },
      ],
      android: [
        { step: "Open in Chrome or Firefox.", icon: "menu" },
        { step: "Tap the browser menu (⋮ or ≡).", icon: "menu" },
        { step: "Select \"Add to Home screen.\"", icon: "square-plus" },
        { step: "Confirm to install.", icon: "plus" },
        { step: "The app launches from your home screen!", icon: "" },
      ],
    },
    why: [
      "PWAs give you privacy—your data stays on your device.",
      "They're fast and lightweight for better performance.",
      "No need for Apple or Google app stores: install freely from any browser.",
      "No gatekeepers or censorship: what you use is your choice.",
    ],
    otherAppsTitle: "Other Apps",
    apps: [
      { name: "FreeWrite", url: "https://freewrite.app" },
      { name: "OffGrid Tasks", url: "https://offgridtasks.com" },
      { name: "OpenHabit", url: "https://openhabi.com" },
      { name: "EphemerNote", url: "https://ephemernote.com" },
    ],
    builtBy: "Built by",
    developerName: "Neo",
    developerDescription: "freedom‑first app developer.",
  },
  de: {
    title: "Was ist eine PWA?",
    what: [
      "Eine Progressive Web App (PWA) ist eine Website, die sich wie eine native App auf deinem Gerät verhält.",
      "PWAs laufen vollständig im Browser, können aber wie Apps installiert und offline genutzt werden.",
      "Kein App Store nötig—einfach im Browser installieren und loslegen!",
    ],
    install: {
      ios: [
        { step: "Diese Seite in Safari öffnen.", icon: "menu" },
        { step: "Teilen-Symbol antippen.", icon: "square-plus" },
        { step: "\"Zum Home-Bildschirm hinzufügen\" wählen.", icon: "plus" },
        { step: "Auf \"Hinzufügen\" tippen.", icon: "" },
        { step: "Die App erscheint auf deinem Startbildschirm!", icon: "" },
      ],
      android: [
        { step: "Im Chrome oder Firefox öffnen.", icon: "menu" },
        { step: "Browsermenü (⋮ oder ≡) antippen.", icon: "menu" },
        { step: "\"Zum Startbildschirm hinzufügen\" wählen.", icon: "square-plus" },
        { step: "Hinzufügen bestätigen.", icon: "plus" },
        { step: "Jetzt startet die App vom Startbildschirm!", icon: "" },
      ],
    },
    why: [
      "PWAs bieten Privatsphäre – alle Daten bleiben auf deinem Gerät.",
      "Sie sind schnell und ressourcensparend.",
      "Keine Apple- oder Google-Store-Pflicht: installation direkt aus dem Browser.",
      "Ohne Zensur oder Gatekeeper – du entscheidest, was du nutzt.",
    ],
    otherAppsTitle: "Weitere Apps",
    apps: [
      { name: "FreeWrite", url: "https://freewrite.app" },
      { name: "OffGrid Tasks", url: "https://offgridtasks.com" },
      { name: "OpenHabit", url: "https://openhabi.com" },
      { name: "EphemerNote", url: "https://ephemernote.com" },
    ],
    builtBy: "Erstellt von",
    developerName: "Neo",
    developerDescription: "Entwickler für freie Apps.",
  },
  es: {
    title: "¿Qué es una PWA?",
    what: [
      "Una Aplicación Web Progresiva (PWA) es un sitio web que funciona como una app nativa en tu dispositivo.",
      "Las PWAs se ejecutan en el navegador pero pueden instalarse en la pantalla de inicio y usarse sin conexión.",
      "No necesitas tienda de apps: instálala directamente desde tu navegador para vivir una experiencia rápida.",
    ],
    install: {
      ios: [
        { step: "Abre este sitio en Safari.", icon: "menu" },
        { step: "Toca el ícono de Compartir.", icon: "square-plus" },
        { step: "Selecciona \"Agregar a pantalla de inicio\".", icon: "plus" },
        { step: "Toca Añadir.", icon: "" },
        { step: "¡Ya tienes la app en tu pantalla de inicio!", icon: "" },
      ],
      android: [
        { step: "Abre en Chrome o Firefox.", icon: "menu" },
        { step: "Toca el menú del navegador (⋮ o ≡).", icon: "menu" },
        { step: "Selecciona \"Agregar a pantalla de inicio\".", icon: "square-plus" },
        { step: "Confirma para instalar.", icon: "plus" },
        { step: "¡Ya puedes abrirlo desde tu pantalla de inicio!", icon: "" },
      ],
    },
    why: [
      "Las PWAs cuidan tu privacidad: tus datos permanecen en tu dispositivo.",
      "Son rápidas y ligeras para un mejor rendimiento.",
      "Sin depender de Apple o Google: instálala desde cualquier navegador.",
      "Sin censura ni limitaciones: tú eliges qué usar.",
    ],
    otherAppsTitle: "Otras Apps",
    apps: [
      { name: "FreeWrite", url: "https://freewrite.app" },
      { name: "OffGrid Tasks", url: "https://offgridtasks.com" },
      { name: "OpenHabit", url: "https://openhabi.com" },
      { name: "EphemerNote", url: "https://ephemernote.com" },
    ],
    builtBy: "Creado por",
    developerName: "Neo",
    developerDescription: "desarrollador de apps libres.",
  },
};

const ICONS = {
  menu: (
    <svg className="w-5 h-5 inline align-text-bottom mr-1 fill-purple-400 dark:fill-purple-300" viewBox="0 0 24 24">
      <rect x="3" y="6" width="18" height="2" rx="1" /><rect x="3" y="11" width="18" height="2" rx="1" /><rect x="3" y="16" width="18" height="2" rx="1" />
    </svg>
  ),
  plus: (
    <svg className="w-5 h-5 inline align-text-bottom mr-1 fill-green-400 dark:fill-green-300" viewBox="0 0 24 24">
      <rect x="11" y="4" width="2" height="16" rx="1"/><rect x="4" y="11" width="16" height="2" rx="1" />
    </svg>
  ),
  "square-plus": (
    <svg className="w-5 h-5 inline align-text-bottom mr-1 fill-blue-400 dark:fill-blue-300" viewBox="0 0 24 24">
      <rect x="5" y="5" width="14" height="14" rx="2"/><rect x="11" y="8" width="2" height="8" rx="1"/><rect x="8" y="11" width="8" height="2" rx="1"/>
    </svg>
  ),
};

function classNames(...cls) {
  return cls.filter(Boolean).join(" ");
}

export default function Index() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(false);

  const sectionRefs = {
    en: useRef<HTMLDivElement>(null),
    de: useRef<HTMLDivElement>(null),
    es: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  function handleAnchor(e) {
    e.preventDefault();
    const ref = sectionRefs[lang];
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <>
      <header className="bg-white/80 dark:bg-[#1a1f2ccf] backdrop-blur sticky top-0 z-20 shadow-sm">
        <nav className="flex flex-col md:flex-row items-center justify-between px-4 py-2 max-w-3xl mx-auto">
          <a
            href="#pwa"
            onClick={handleAnchor}
            className="text-lg md:text-xl font-bold text-purple-600 hover:text-purple-800 dark:text-purple-300 dark:hover:text-purple-200 transition"
            aria-label={CONTENT[lang].title}
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

      <main className="main-bg min-h-[90vh] flex items-center justify-center py-6 px-2 md:px-0">
        <section
          id="pwa"
          ref={sectionRefs[lang]}
          tabIndex={-1}
          className="max-w-2xl w-full space-y-10 mx-auto"
        >
          <div>
            <h1 className="text-3xl font-extrabold text-purple-700 dark:text-purple-300 mb-3">
              {CONTENT[lang].title}
            </h1>
            {CONTENT[lang].what.map((line, i) => (
              <p className="mb-2 text-gray-700 dark:text-gray-200 text-lg leading-relaxed" key={i}>
                {line}
              </p>
            ))}
          </div>
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
                    
                  </span>
                  iOS (Safari)
                </h3>
                <ol className="space-y-2 text-gray-700 dark:text-gray-200">
                  {CONTENT[lang].install.ios.map((item, i) => (
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
                    <svg viewBox="1 1 22 22" className="w-4 h-4">
                      <circle cx="12" cy="12" r="9" fill="#00e17e"></circle>
                    </svg>
                  </span>
                  Android (Chrome/Firefox)
                </h3>
                <ol className="space-y-2 text-gray-700 dark:text-gray-200">
                  {CONTENT[lang].install.android.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      {item.icon ? <span className="mt-0.5">{ICONS[item.icon]}</span> : null}
                      <span>{item.step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-200 mb-2">
              {lang === "en"
                ? "Why PWAs build a better Internet"
                : lang === "de"
                ? "Warum PWAs das Internet verbessern"
                : "Por qué las PWAs mejoran Internet"}
            </h2>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-lg space-y-2">
              {CONTENT[lang].why.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <aside className="my-10 max-w-2xl mx-auto">
        <div className="bg-purple-50 dark:bg-[#251c37] rounded-lg px-5 py-6 shadow-inner">
          <h3 className="text-lg font-semibold mb-3 text-purple-700 dark:text-purple-200">
            {CONTENT[lang].otherAppsTitle}
          </h3>
          <ul className="list-disc pl-5">
            {CONTENT[lang].apps.map((app) => (
              <li key={app.url} className="my-1">
                <a
                  href={app.url}
                  className="text-blue-700 dark:text-blue-300 underline underline-offset-2 hover:text-purple-700"
                  target="_blank" rel="noopener noreferrer"
                >
                  {app.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 w-full">
        <div className="mb-4 flex justify-center">
          <DonationButton />
        </div>
        <div>
          {CONTENT[lang].builtBy}{" "}
          <a 
            href="https://github.com/neonostr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {CONTENT[lang].developerName}
          </a>, {CONTENT[lang].developerDescription}
        </div>
      </footer>
    </>
  );
}
