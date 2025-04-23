import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import PWAIntroduction from "@/components/PWAIntroduction";
import InstallationGuide from "@/components/InstallationGuide";
import WhyPWAs from "@/components/WhyPWAs";
import AppShowcase from "@/components/AppShowcase";
import Footer from "@/components/Footer";

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
        { step: "La aplicación está ahora en su pantalla de inicio! Ábrala desde allí para obtener la experiencia PWA completa.", icon: "home" },
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

export default function Index() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(false);
  const { toast } = useToast();

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

  const contentForLang = CONTENT[lang] || CONTENT.en;

  return (
    <>
      <Header lang={lang} setLang={setLang} dark={dark} setDark={setDark} />

      <main className="main-bg min-h-[90vh] flex items-center justify-center py-6 px-2 md:px-0">
        <section
          id="pwa"
          ref={sectionRefs[lang]}
          tabIndex={-1}
          className="max-w-2xl w-full space-y-10 mx-auto relative"
        >
          <PWAIntroduction title={contentForLang.title} introText={contentForLang.what} />
          <InstallationGuide lang={lang} content={contentForLang} />
          <WhyPWAs whyTitle={contentForLang.whyTitle} whyItems={contentForLang.why} />
        </section>
      </main>

      <AppShowcase title={contentForLang.otherAppsTitle} apps={contentForLang.apps} />
      <Footer lang={lang} />
    </>
  );
}
