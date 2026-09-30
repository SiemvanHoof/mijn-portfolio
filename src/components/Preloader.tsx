"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { siteName } from "@/data/site";
import { useSmoothScroll } from "./SmoothScroll";

const STORAGE_KEY = "preloaded";

// Snelheid: hoe lang de teller over 0 → 100 doet (in seconden)
const COUNT_DURATION = 5;

// Placeholderbeelden — later vervangen door je eigen beelden in /public
const images = [1, 2, 3, 4, 5].map((n) => `https://picsum.photos/seed/portfolio-${n}/600/800`);

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const imageWrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const lenis = useSmoothScroll();

  // Scrollen blokkeren zolang de loader zichtbaar is
  useEffect(() => {
    if (!lenis) return;
    if (active) lenis.stop();
    else lenis.start();
  }, [lenis, active]);

  useGSAP(
    () => {
      const html = document.documentElement;

      const markDone = () => {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {}
        html.dataset.preloaded = "1";
        setActive(false);
        window.dispatchEvent(new Event("preloader:done"));
      };

      // Alleen bij binnenkomst op de homepage, en maar één keer per sessie
      if (html.dataset.preloaded || window.location.pathname !== "/") {
        markDone();
        return;
      }

      let cancelled = false;
      const el = root.current!;
      const lines = el.querySelectorAll(".pl-line");
      const imageEls = el.querySelectorAll<HTMLElement>(".pl-image");
      const count = { value: 0 };

      window.scrollTo(0, 0);

      // Wacht op fonts en de volledige pagina (inclusief beelden)
      const pageLoaded = new Promise<void>((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", () => resolve(), { once: true });
      });
      const loaded = Promise.all([document.fonts.ready, pageLoaded]);

      // Intro: tekst omhoog, teller en lijn lopen gelijkmatig van 0 naar 100
      const intro = gsap
        .timeline()
        .from(lines, { yPercent: 100, duration: 1.1, stagger: 0.08, ease: "power3.out" })
        .to(
          count,
          {
            value: 100,
            duration: COUNT_DURATION,
            ease: "none",
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(count.value));
            },
          },
          0.3
        )
        .to(bar.current, { scaleX: 1, duration: COUNT_DURATION, ease: "none" }, 0.3);

      // Beelden: één voor één van onder naar boven, gelijk verdeeld over de teller
      imageEls.forEach((image, i) => {
        const at = 0.3 + (i * COUNT_DURATION) / imageEls.length;
        intro
          .to(image, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.inOut" }, at)
          .fromTo(
            image.querySelector("img"),
            { scale: 1.3 },
            { scale: 1, duration: 1.4, ease: "power3.out" },
            at
          );
      });

      // Pas weg als de intro klaar is én alles geladen is
      Promise.all([intro.then(), loaded]).then(() => {
        if (cancelled) return;
        gsap
          .timeline({ onComplete: markDone })
          .to(lines, { yPercent: -100, duration: 0.8, stagger: 0.05, ease: "power3.in" })
          .to(imageWrap.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "power3.in" }, 0)
          .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.2, ease: "power4.inOut" }, "-=0.2");
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        intro.timeScale(10);
      }

      return () => {
        cancelled = true;
      };
    },
    { scope: root }
  );

  if (!active) return null;

  return (
    <div
      ref={root}
      aria-hidden
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      className="preloader fixed inset-0 z-[60] flex flex-col justify-between bg-bg px-3 py-3 text-fg md:px-8 md:py-6"
    >
      <div className="flex justify-between text-sm">
        <span className="overflow-hidden">
          <span className="pl-line block font-medium tracking-tight">{siteName}</span>
        </span>
        <span className="overflow-hidden">
          <span className="pl-line block text-muted">Portfolio ©{new Date().getFullYear()}</span>
        </span>
      </div>

      {/* Beelden in het midden */}
      <div
        ref={imageWrap}
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-[3/4] w-[40vw] max-w-56 -translate-x-1/2 -translate-y-1/2 md:w-[16vw]"
      >
        {images.map((src) => (
          <div
            key={src}
            className="pl-image absolute inset-0 overflow-hidden"
            style={{ clipPath: "inset(100% 0% 0% 0%)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="flex items-end justify-between">
        <span className="overflow-hidden text-[11px] text-muted">
          <span className="pl-line block">Loading</span>
        </span>
        <span className="overflow-hidden">
          <span className="pl-line flex items-start font-medium leading-[0.8] tracking-tighter tabular-nums">
            <span ref={counter} className="text-[24vw] md:text-[14vw]">0</span>
            <span className="mt-[1vw] text-[5vw] md:text-[3vw]">%</span>
          </span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-line">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-fg" />
      </div>
    </div>
  );
}