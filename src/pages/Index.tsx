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
    whyTitle: "Why PWAs Are Awesome",
    why: [
      "**Privacy-Focused:** Runs securely within your browser sandbox; no invasive tracking or spying from big app stores.",
      "**No App Stores, No Restrictions:** Installs directly from your browser, bypassing corporate gatekeepers and censorship.",
      "**Instant & Automatic Updates:** Always up-to-date, without notifications or manual updates.",
      "**Super Fast:** Loads instantly with no need for bulky app downloads.",
      "**Universal & Accessible:** Works seamlessly on any device—phones, tablets, and desktops alike.",
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
      "Eine Progressive Web App (PWA) ist schnell, privat und frei von App Stores.",
      "PWAs verbinden die besten Funktionen von Websites und nativen Apps. Sie laufen vollständig in Ihrem Browser und bieten verbesserte Privatsphäre, automatische Updates und Freiheit von App-Store-Zensur.",
    ],
    install: {
      ios: [
        { step: "Öffnen Sie die Seite in Safari.", icon: "safari" },
        { step: "Tippen Sie auf das Teilen-Symbol.", icon: "share" },
        { step: "Wählen Sie \"Zum Home-Bildschirm hinzufügen\".", icon: "plus" },
        { step: "Tippen Sie auf Hinzufügen.", icon: "plus" },
        { step: "Die App ist jetzt auf Ihrem Startbildschirm! Öffnen Sie sie von dort für die volle PWA-Erfahrung.", icon: "home" },
      ],
      android: [
        { step: "In Chrome oder Firefox öffnen.", icon: "chrome" },
        { step: "Tippen Sie auf das Browser-Menü (⋮ oder ≡).", icon: "menu" },
        { step: "Wählen Sie \"Zum Startbildschirm hinzufügen\".", icon: "home" },
        { step: "Installation bestätigen.", icon: "plus" },
        { step: "Die App ist jetzt auf Ihrem Startbildschirm! Öffnen Sie sie von dort für die volle PWA-Erfahrung.", icon: "home" },
      ],
    },
    whyTitle: "Warum PWAs großartig sind",
    why: [
      "**Datenschutz im Fokus:** Läuft sicher in Ihrer Browser-Sandbox; keine invasive Verfolgung oder Spionage durch große App Stores.",
      "**Keine App Stores, keine Einschränkungen:** Installation direkt aus Ihrem Browser, umgeht Unternehmens-Gatekeeper und Zensur.",
      "**Sofortige & automatische Updates:** Immer auf dem neuesten Stand, ohne Benachrichtigungen oder manuelle Updates.",
      "**Superschnell:** Lädt sofort ohne umfangreiche App-Downloads.",
      "**Universal & zugänglich:** Funktioniert nahtlos auf allen Geräten—Handys, Tablets und Desktops.",
    ],
    otherAppsTitle: "Entdecken Sie die Live-Beispiele unten und erleben Sie PWAs selbst.",
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
        { step: "¡La aplicación está ahora en su pantalla de inicio! Ábrala desde allí para obtener la experiencia PWA completa.", icon: "home" },
      ],
      android: [
        { step: "Abra en Chrome o Firefox.", icon: "chrome" },
        { step: "Toque el menú del navegador (⋮ o ≡).", icon: "menu" },
        { step: "Seleccione \"Añadir a la pantalla de inicio\".", icon: "home" },
        { step: "Confirme la instalación.", icon: "plus" },
        { step: "¡La aplicación está ahora en su pantalla de inicio! Ábrala desde allí para obtener la experiencia PWA completa.", icon: "home" },
      ],
    },
    whyTitle: "Por qué las PWAs son increíbles",
    why: [
      "**Enfocado en la privacidad:** Se ejecuta de forma segura dentro del sandbox de su navegador; sin rastreo invasivo ni espionaje de las grandes tiendas de aplicaciones.",
      "**Sin tiendas de aplicaciones, sin restricciones:** Se instala directamente desde su navegador, evitando los guardianes corporativos y la censura.",
      "**Actualizaciones instantáneas y automáticas:** Siempre actualizado, sin notificaciones ni actualizaciones manuales.",
      "**Súper rápido:** Carga instantáneamente sin necesidad de descargas voluminosas.",
      "**Universal y accesible:** Funciona perfectamente en cualquier dispositivo—teléfonos, tabletas y computadoras por igual.",
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
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path d="M12 20.0735C10.2321 20.0735 8.5262 19.5215 7.0998 18.5004C5.67341 17.4793 4.59339 16.0339 4.00122 14.3814C3.40905 12.7289 3.3298 10.9492 3.77643 9.25052C4.22305 7.5518 5.17368 6.01715 6.51256 4.84807C7.85145 3.679 9.51973 2.93539 11.2856 2.71556C13.0515 2.49573 14.8475 2.81097 16.4421 3.62066C18.0367 4.43034 19.355 5.69717 20.239 7.26629C21.1229 8.83541 21.5363 10.632 21.4255 12.4362C21.4255 12.6051 21.3579 12.767 21.2375 12.8873C21.1171 13.0077 20.9553 13.0754 20.7864 13.0754H14.2202L14.9732 17.2493C15.0021 17.3963 15.0009 17.548 14.9695 17.6944C14.9382 17.8407 14.8774 17.9783 14.7912 18.0981C14.7051 18.218 14.596 18.3174 14.471 18.3893C14.346 18.4613 14.208 18.5042 14.0662 18.5152C13.9243 18.5262 13.7821 18.5051 13.6486 18.4532C13.5151 18.4014 13.3933 18.3199 13.2918 18.2142C13.1903 18.1085 13.1114 17.9813 13.0607 17.8415C13.01 17.7017 12.9886 17.5529 12.9983 17.4048L12.9944 17.4121L11.9993 12.4362H7.62526L6.63012 17.4121L6.62619 17.4048C6.60407 17.5732 6.55186 17.7358 6.47266 17.8835C6.39346 18.0313 6.28888 18.161 6.16505 18.2648C6.04122 18.3686 5.90076 18.4443 5.75147 18.4874C5.60217 18.5306 5.44684 18.5404 5.29412 18.5163C5.14139 18.4922 4.99448 18.4347 4.86252 18.3475C4.73056 18.2603 4.61639 18.1451 4.52675 18.0087C4.43711 17.8724 4.37413 17.7179 4.34175 17.5548C4.30937 17.3917 4.30827 17.2237 4.33851 17.0601L5.33757 12.0842C4.88343 11.4783 4.49195 10.8252 4.17105 10.1387C4.07602 9.9269 4.05525 9.69056 4.11177 9.46611C4.16828 9.24167 4.29874 9.04331 4.48473 8.90351C4.67072 8.76371 4.90046 8.69136 5.13315 8.69818C5.36585 8.70499 5.59088 8.79052 5.76832 8.93918C6.17371 9.26555 6.51905 9.6538 6.79012 10.0881C7.06119 10.5224 7.25413 10.9963 7.36167 11.4915H17.6371C17.7446 10.9963 17.9376 10.5224 18.2086 10.0881C18.4797 9.6538 18.825 9.26555 19.2304 8.93918C19.4079 8.79052 19.6329 8.70499 19.8656 8.69818C20.0983 8.69136 20.328 8.76371 20.514 8.90351C20.7 9.04331 20.8305 9.24167 20.887 9.46611C20.9435 9.69056 20.9227 9.9269 20.8277 10.1387C20.5068 10.8252 20.1153 11.4783 19.6612 12.0842L20.6602 17.0601C20.6931 17.2347 20.685 17.4143 20.6365 17.585C20.588 17.7557 20.5005 17.9127 20.3807 18.0442C20.2608 18.1757 20.112 18.2784 19.9457 18.3442C19.7794 18.4101 19.6002 18.4375 19.4209 18.4243C19.2417 18.4111 19.0682 18.3576 18.913 18.2677C18.7577 18.1778 18.6242 18.0539 18.5224 17.9051C18.4207 17.7563 18.3528 17.5867 18.3236 17.4086C18.2943 17.2306 18.3043 17.0487 18.3527 16.8755L19.0292 13.0754H15.782L15.0251 17.2528C14.9962 17.3998 14.9974 17.5515 15.0288 17.6978C15.0601 17.8442 15.1209 17.9818 15.2071 18.1016C15.2932 18.2214 15.4023 18.3208 15.5273 18.3928C15.6523 18.4647 15.7903 18.5076 15.9322 18.5186C16.074 18.5296 16.2162 18.5085 16.3498 18.4566C16.4833 18.4048 16.605 18.3233 16.7065 18.2176C16.808 18.1119 16.887 17.9847 16.9376 17.8449C16.9883 17.7051 17.0097 17.5563 17 17.4082L16.0019 12.4362C16.0019 12.2674 16.0696 12.1055 16.19 11.9852C16.3103 11.8648 16.4722 11.7971 16.6411 11.7971H19.7864C19.9178 10.1978 19.5369 8.60048 18.7004 7.22341C17.8639 5.84633 16.6121 4.75862 15.1454 4.10947C13.6786 3.46031 12.0642 3.28193 10.5038 3.5966C8.94348 3.91126 7.51522 4.70138 6.42893 5.85675C5.34265 7.01212 4.65303 8.47356 4.45187 10.0471C4.25071 11.6207 4.54798 13.2179 5.30241 14.6145C6.05685 16.0111 7.23414 17.13 8.67949 17.8224C10.1248 18.5149 11.753 18.7445 13.3324 18.4767C13.4991 18.4549 13.6676 18.4677 13.8288 18.5143C13.99 18.561 14.1401 18.6405 14.2695 18.7482C14.3989 18.856 14.5046 18.9899 14.5801 19.142C14.6556 19.2941 14.6992 19.4611 14.7082 19.6323C14.7172 19.8035 14.6915 19.9744 14.6326 20.1336C14.5737 20.2927 14.483 20.4363 14.3658 20.5553C14.2487 20.6742 14.1077 20.766 13.9523 20.8252C13.7968 20.8844 13.6304 20.9097 13.4639 20.8997C12.9769 20.8713 12.4931 20.8049 12.0171 20.7009C12.0114 20.7009 12.0057 20.7009 12 20.7009V20.0735Z" fill="#A2AAAD"/>
                    </svg>
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
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path d="M17.523 15.3414C17.523 14.7338 17.4391 14.1451 17.2714 13.5754H12V16.0054H15.2196C15.0823 16.6338 14.7177 17.1889 14.1805 17.5643V19.5461H16.1719C17.4600 18.4196 17.9996 16.9154 17.523 15.3414Z" fill="#4285F4"/>
                      <path d="M11.9999 21C13.7159 21 15.1796 20.3941 16.1718 19.5461L14.1804 17.5643C13.5265 18.0064 12.7152 18.2721 11.9999 18.2721C10.2438 18.2721 8.81532 17.1116 8.28375 15.5775H6.20703V17.6189C7.18553 19.6171 9.45214 21 11.9999 21Z" fill="#34A853"/>
                      <path d="M8.28387 15.5775C8.1432 15.092 8.06641 14.5765 8.06641 14C8.06641 13.4235 8.1432 12.908 8.28387 12.4225V10.3811H6.20715C5.70674 11.6737 5.43555 12.8005 5.43555 14C5.43555 15.1995 5.70674 16.3263 6.20715 17.6189L8.28387 15.5775Z" fill="#FBBC05"/>
                      <path d="M11.9999 9.72789C13.3086 9.72789 14.3307 10.1911 15.0795 10.9093L16.8048 9.1839C15.1648 7.64339 13.7011 6.85789 11.9999 6.85789C9.45214 6.85789 7.18553 8.24076 6.20703 10.3811L8.28375 12.4225C8.81532 10.8884 10.2438 9.72789 11.9999 9.72789Z" fill="#EA4335"/>
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
          <DonationButton />
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
