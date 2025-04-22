import { Apple, Chrome } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import DonationButton from "@/components/DonationButton";

const LANGS = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
];

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
  safari: (
    <svg className="w-5 h-5 inline align-text-bottom mr-1" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#0066CC" />
      <path d="M12 2v20M2 12h20" stroke="white" strokeWidth="1" />
      <path d="M12 12L19 5M12 12L5 19" stroke="white" strokeWidth="1" />
    </svg>
  ),
  chrome: (
    <svg className="w-5 h-5 inline align-text-bottom mr-1" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#4285F4" />
      <circle cx="12" cy="12" r="4" fill="#FFFFFF" />
      <path d="M12 8v8M8 12h8" stroke="#DB4437" strokeWidth="2" />
    </svg>
  ),
  appleIcon: <Apple className="w-5 h-5 inline align-text-bottom mr-1" />,
  chromeIcon: <Chrome className="w-5 h-5 inline align-text-bottom mr-1" />
};

const CONTENT = {
  en: {
    title: "What is a PWA?",
    what: [
      "A Progressive Web App (PWA) is fast, private, and free from app stores.",
      "PWAs combine the best features of websites and native apps. They run entirely in your browser, offering enhanced privacy, automatic updates, and freedom from app-store censorship.",
    ],
    install: {
      ios: [
        { step: "Open the site in Safari.", icon: "safari" },
        { step: "Tap the Share icon.", icon: "share" },
        { step: "Choose \"Add to Home Screen.\"", icon: "plus" },
        { step: "Tap Add.", icon: "plus" },
        { step: "The app is now on your home screen! Open it from there to get the full PWA experience.", icon: "home" },
      ],
      android: [
        { step: "Open in Chrome or Firefox.", icon: "chrome" },
        { step: "Tap the browser menu (⋮ or ≡).", icon: "menu" },
        { step: "Select \"Add to Home screen.\"", icon: "home" },
        { step: "Confirm to install.", icon: "plus" },
        { step: "The app is now on your home screen! Open it from there to get the full PWA experience.", icon: "home" },
      ],
    },
    whyTitle: "Why PWAs are better",
    why: [
      "Universal compatibility with phones, tablets and desktops.",
      "More privacy, no invasive tracking or spying from big app stores",
      "Always up-to-date, without notifications or manual updates.",
      "No need for Apple or Google app stores: install free from any browser.",
      "No gatekeepers, no censorship—your choice."
    ],
    otherAppsTitle: "Check out the live examples below and experience PWAs for yourself.",
    apps: [
      { name: "Convy", url: "https://convy.click", description: "Privacy‑first Bitcoin currency converter" },
      { name: "Cashu.me", url: "https://wallet.cashu.me", description: "Free Bitcoin ecash wallet" },
      { name: "Coinos", url: "https://coinos.io", description: "Free Bitcoin web wallet & payments" },
    ],
    builtBy: "Built by",
    developerName: "PWA enthusiasts",
    developerDescription: "for a free and open web.",
    donateButton: "Zap me a coffee",
    thankyou: "Thank you for your support!"
  },
  de: {
    title: "Was ist eine PWA?",
    what: [
      "Eine Progressive Web App (PWA) ist schnell, datenschutzfreundlich und unabhängig von App Stores.",
      "PWAs kombinieren die besten Eigenschaften von Websites und nativen Apps. Sie laufen direkt im Browser, bieten starken Datenschutz, automatische Updates und sind frei von App-Store-Zensur.",
    ],
    install: {
      ios: [
        { step: "Öffne die Seite in Safari.", icon: "safari" },
        { step: "Tippe auf das Teilen-Symbol.", icon: "share" },
        { step: "Wähle \"Zum Home-Bildschirm hinzufügen\".", icon: "plus" },
        { step: "Tippe auf Hinzufügen.", icon: "plus" },
        { step: "Die App ist jetzt auf deinem Startbildschirm! Öffne sie von dort für die volle PWA-Erfahrung.", icon: "home" },
      ],
      android: [
        { step: "In Chrome oder Firefox öffnen.", icon: "chrome" },
        { step: "Tippe auf das Browser-Menü (⋮ oder ≡).", icon: "menu" },
        { step: "Wähle \"Zum Startbildschirm hinzufügen\".", icon: "home" },
        { step: "Installation bestätigen.", icon: "plus" },
        { step: "Die App ist jetzt auf deinem Startbildschirm! Öffne sie von dort für die volle PWA-Erfahrung.", icon: "home" },
      ],
    },
    whyTitle: "Warum PWAs besser sind",
    why: [
      "Universelle Kompatibilität mit Smartphones, Tablets und Desktop-Computern.",
      "Mehr Privatsphäre, kein aufdringliches Tracking oder Ausspionieren durch große App‑Stores.",
      "Immer auf dem neuesten Stand, ohne Benachrichtigungen oder manuelle Updates.",
      "Keine App‑Stores von Apple oder Google erforderlich: kostenlose Installation über jeden Browser.",
      "Keine Gatekeeper, keine Zensur – deine Wahl."
    ],
    otherAppsTitle: "Entdecke die Live-Beispiele unten und erlebe PWAs selbst.",
    apps: [
      { name: "Convy", url: "https://convy.click", description: "Datenschutzorientierter Bitcoin-Währungsrechner" },
      { name: "Cashu.me", url: "https://wallet.cashu.me", description: "Kostenlose Bitcoin E-Cash Wallet" },
      { name: "Coinos", url: "https://coinos.io", description: "Kostenlose Bitcoin Web-Wallet" },
    ],
    builtBy: "Erstellt von",
    developerName: "PWA-Enthusiasten",
    developerDescription: "für ein freies und offenes Web.",
    donateButton: "Spendiere einen Kaffee",
    thankyou: "Vielen Dank für deine Unterstützung!"
  },
  es: {
    title: "¿Qué es una PWA?",
    what: [
      "Una Aplicación Web Progresiva (PWA) es rápida, privada y libre de tiendas de aplicaciones.",
      "Las PWAs combinan las mejores características de los sitios web y las aplicaciones nativas. Se ejecutan completamente en su navegador, ofreciendo mayor privacidad, actualizaciones automáticas y libertad de la censura de las tiendas de aplicaciones.",
    ],
    install: {
      ios: [
        { step: "Abra el sitio en Safari.", icon: "safari" },
        { step: "Toque el ícono Compartir.", icon: "share" },
        { step: "Elija \"Añadir a la pantalla de inicio\".", icon: "plus" },
        { step: "Toque Añadir.", icon: "plus" },
        { step: "��La aplicación está ahora en su pantalla de inicio! Ábrala desde allí para obtener la experiencia PWA completa.", icon: "home" },
      ],
      android: [
        { step: "Abra en Chrome o Firefox.", icon: "chrome" },
        { step: "Toque el menú del navegador (⋮ o ≡).", icon: "menu" },
        { step: "Seleccione \"Añadir a la pantalla de inicio\".", icon: "home" },
        { step: "Confirme la instalación.", icon: "plus" },
        { step: "¡La aplicación está ahora en su pantalla de inicio! Ábrala desde allí para obtener la experiencia PWA completa.", icon: "home" },
      ],
    },
    whyTitle: "Por qué las PWAs son mejores",
    why: [
      "Compatibilidad universal con teléfonos, tabletas y ordenadores de sobremesa.",
      "Mayor privacidad, sin rastreos invasivos ni espionaje de las grandes tiendas de apps.",
      "Siempre actualizado, sin notificaciones ni actualizaciones manuales.",
      "Sin necesidad de las tiendas de apps de Apple o Google: instalación gratuita desde cualquier navegador.",
      "Sin guardianes ni censura: tú eliges."
    ],
    otherAppsTitle: "Explore los ejemplos en vivo a continuación y experimente las PWAs por sí mismo.",
    apps: [
      { name: "Convy", url: "https://convy.click", description: "Conversor de Bitcoin enfocado en la privacidad" },
      { name: "Cashu.me", url: "https://wallet.cashu.me", description: "Monedero Bitcoin E-cash gratuito" },
      { name: "Coinos", url: "https://coinos.io", description: "Monedero web Bitcoin gratuito" },
    ],
    builtBy: "Creado por",
    developerName: "entusiastas de PWA",
    developerDescription: "para una web libre y abierta.",
    donateButton: "Invítame un café",
    thankyou: "¡Gracias por tu apoyo!"
  },
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
                    {ICONS.appleIcon}
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
                    {ICONS.chromeIcon}
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
              {CONTENT[lang].whyTitle}
            </h2>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-lg space-y-2">
              {CONTENT[lang].why.map((item, i) => (
                <li key={i} >{item}</li>
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
                  aria-label={`Visit ${app.name} (opens in new window)`}
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
          <DonationButton lang={lang} />
        </div>
        <div>
          Built by{" "}
          <a 
            href="https://github.com/neonostr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Neo
          </a>
          , freedom‑first app developer.
        </div>
      </footer>
    </>
  );
}
