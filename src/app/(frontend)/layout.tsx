import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/Providers";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import PageTransitions from "@/components/PageTransitions";
import Footer from "@/components/Footer";
import { siteName, siteUrl } from "@/data/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const description =
  "Portfolio van Siem van Hoof: websites ontworpen en gebouwd met oog voor detail, typografie en beweging.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteName} — Digital designer & developer`, template: `%s — ${siteName}` },
  description,
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "/",
    siteName,
    title: `${siteName} — Digital designer & developer`,
    description,
  },
  twitter: { card: "summary_large_image" },
};

// Loader verbergen als hij al gespeeld heeft, of als je niet op de homepage binnenkomt
const preloadCheck = `try{if(sessionStorage.getItem("preloaded")||location.pathname!=="/")document.documentElement.dataset.preloaded="1"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Draait vóór React laadt, zodat de preloader niet even flitst */}
        <Script id="preload-check" strategy="beforeInteractive">
          {preloadCheck}
        </Script>

        {/* Verschijnt pas als je op Tab drukt */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
        >
          Naar de inhoud
        </a>

        <Providers>
          <SmoothScroll>
            <Header />
            <Preloader />
            <PageTransitions />
            <div id="content" tabIndex={-1}>
              {children}
            </div>
            <Footer />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}