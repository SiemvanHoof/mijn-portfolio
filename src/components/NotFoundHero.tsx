"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { usePreloaderDone } from "@/lib/usePreLoaderDone";

const images = [1, 2, 3, 4, 5].map((n) => `https://picsum.photos/seed/portfolio-${n}/600/800`);

export default function NotFoundHero() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const done = usePreloaderDone();

  // Intro: vieren omhoog, ovaal beeld opent, teksten faden in
  useEffect(() => {
    if (!done || !root.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline()
        .to(".nf-digit", { y: 0, duration: 1.2, stagger: 0.12, ease: "power4.out" })
        .to(
          ".nf-image",
          { clipPath: "inset(0% 0% 0% 0% round 999px)", duration: 1.2, ease: "power4.inOut" },
          0.15
        )
        .to(".nf-fade", { opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out" }, 0.6);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        tl.timeScale(10);
      }
    }, root);

    return () => ctx.revert();
  }, [done]);

  // Beelden in de nul wisselen
  useEffect(() => {
    if (!done) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 900);
    return () => clearInterval(id);
  }, [done]);

  return (
    <section
      ref={root}
      className="flex min-h-svh flex-col justify-between px-3 pb-8 pt-20 md:px-8 md:pt-24"
    >
      {/* Bovenste regel */}
      <div className="nf-fade flex justify-between text-xs text-muted" style={{ opacity: 0 }}>
        <span>Error 404</span>
        <span>Pagina niet gevonden</span>
      </div>

      {/* 4 ◯ 4 */}
      <h1
        aria-label="404, pagina niet gevonden"
        className="flex items-center justify-center gap-[2vw] text-[38vw] font-medium leading-[0.8] tracking-tighter md:text-[28vw]"
      >
        <span className="overflow-hidden pb-[0.02em]">
          <span aria-hidden className="nf-digit block" style={{ transform: "translateY(110%)" }}>
            4
          </span>
        </span>

        <span
          aria-hidden
          className="nf-image relative block aspect-[3/4] h-[0.72em] overflow-hidden rounded-full bg-surface"
          style={{ clipPath: "inset(100% 0% 0% 0% round 999px)" }}
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
        </span>

        <span className="overflow-hidden pb-[0.02em]">
          <span aria-hidden className="nf-digit block" style={{ transform: "translateY(110%)" }}>
            4
          </span>
        </span>
      </h1>

      {/* Uitleg en knoppen */}
      <div
        className="nf-fade flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        style={{ opacity: 0 }}
      >
        <p className="max-w-sm text-sm leading-relaxed text-muted md:text-base">
          Deze pagina bestaat niet (meer). Misschien is hij verhuisd, of zat er een typfout in de link.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-fg px-6 py-3 text-sm text-bg transition-opacity hover:opacity-80"
          >
            Terug naar home
          </Link>
          <Link
            href="/work"
            className="rounded-full border border-line px-6 py-3 text-sm transition-colors hover:bg-surface"
          >
            Bekijk projecten
          </Link>
        </div>
      </div>
    </section>
  );
}