"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useSmoothScroll } from "./SmoothScroll";
import { usePreloaderDone } from "@/lib/usePreLoaderDone";
import { location } from "@/data/site";

const title = ["Ik ontwerp", "én bouw."];
const place = `Uit ${location}`;
const disciplines = ["Web design", "Development", "WordPress", "Next.js", "Animatie"];
const images = [1, 2, 3, 4, 5].map((n) => `https://picsum.photos/seed/portfolio-${n}/600/800`);

function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = new Intl.DateTimeFormat("nl-NL", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Amsterdam",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time || "--:--"}</span>;
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const done = usePreloaderDone();
  const lenis = useSmoothScroll();

  // Intro-animatie, marquee en parallax — pas als de preloader klaar is
  useGSAP(
    () => {
      if (!done) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const tl = gsap
        .timeline({ delay: 0.1 })
        .to(".hero-line", { y: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" })
        .to(card.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut" }, 0.2)
        .to(".hero-fade", { opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out" }, 0.6);

      if (reduce) {
        tl.timeScale(10);
        return;
      }

      // Marquee: twee identieke rijen, schuif precies één rij op en herhaal
      gsap.to(track.current, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });

      // Parallax: het beeld schuift sneller omhoog dan de pagina
      gsap.to(card.current, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root, dependencies: [done] }
  );

  // Beelden wisselen
  useEffect(() => {
    if (!done) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 1400);
    return () => clearInterval(id);
  }, [done]);

  // Scroll naar de sectie direct na de hero
  const scrollDown = () => {
    const target = root.current?.nextElementSibling as HTMLElement | null;
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={root}
      className="relative flex h-svh min-h-[36rem] flex-col overflow-hidden px-3 pb-6 pt-16 md:px-8 md:pb-8 md:pt-20"
    >
      {/* Bovenste regel */}
      <div className="hero-fade relative z-10 flex justify-between text-xs text-muted" style={{ opacity: 0 }}>
        <span>{place}</span>
        <span>
          Lokale tijd <LocalTime />
        </span>
      </div>

      {/* Midden: marquee met beeld erbovenop */}
      <div className="relative my-6 flex min-h-0 flex-1 items-center justify-center">
        <p className="sr-only">{disciplines.join(", ")}</p>
        <div
          aria-hidden
          className="hero-fade pointer-events-none absolute -inset-x-3 top-1/2 -translate-y-1/2 overflow-hidden md:-inset-x-8"
          style={{ opacity: 0 }}
        >
          <div ref={track} className="flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {disciplines.map((d) => (
                  <span
                    key={d}
                    className="flex items-center text-5xl font-medium leading-[1.3] tracking-tight text-muted md:text-7xl"
                  >
                    <span className="px-6 md:px-10">{d}</span>
                    <span className="h-2 w-2 rounded-full bg-current md:h-3 md:w-3" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          ref={card}
          className="relative z-10 aspect-[3/4] h-[80%] max-h-[22rem] overflow-hidden"
          style={{ clipPath: "inset(100% 0% 0% 0%)" }}
        >
          {images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover ${i === index ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </div>

      {/* Onderaan: titel met scroll-knop */}
      <div className="flex items-end justify-between gap-6">
        <h1 className="text-[13vw] font-medium leading-[1.05] tracking-tighter md:text-[7.5vw]">
          {title.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span className="hero-line block" style={{ transform: "translateY(110%)" }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <button
          onClick={scrollDown}
          className="hero-fade mb-[0.6em] flex shrink-0 items-center gap-2 text-xs"
          style={{ opacity: 0 }}
        >
          Scroll
          <span aria-hidden className="animate-bounce">↓</span>
        </button>
      </div>
    </section>
  );
}