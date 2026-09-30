"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { projects } from "@/data/projects";
import LineReveal from "./LineReveal";
import Reveal from "./Reveal";

const heading = ["Werk waar ik", "trots op ben."];
const intro =
  "Een selectie van projecten, van websites die ik tijdens mijn stage bouwde tot eigen ontwerpen. Elk project van eerste schets tot livegang.";

export default function WorkGrid() {
  const root = useRef<HTMLElement>(null);

  // Vakken komen één voor één omhoog als het grid in beeld komt
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".wg-cell", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".wg-grid", start: "top 80%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" className="border-t border-line">
      {/* Intro */}
      <div className="grid px-3 md:grid-cols-[1fr_3fr] md:px-8">
        <p className="pt-8 text-sm md:border-r md:border-line md:pr-8">Geselecteerd werk</p>

        <div className="pb-20 pt-6 md:pb-32 md:pl-8 md:pt-8">
          <LineReveal
            lines={heading}
            className="text-[12vw] font-medium leading-[1.05] tracking-tighter md:text-[7vw]"
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted md:text-base">{intro}</p>
          </Reveal>
        </div>
      </div>

      {/* Grid met lijnen: de 1px gaten laten de lijnkleur erachter zien */}
      <div className="wg-grid grid gap-px border-y border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <div key={p.slug} className="bg-bg">
            <Link
              href={`/work/${p.slug}`}
              className="wg-cell group block h-full p-4 transition-colors duration-500 hover:bg-surface md:p-6"
            >
              <div className="mb-4 flex justify-between text-xs text-muted">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span>{p.year}</span>
              </div>

              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.cover}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">{p.tags.join(" · ")}</p>
                </div>
                <span
                  aria-hidden
                  className="-translate-x-2 text-xl opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                >
                  →
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Link naar alle projecten */}
      <Link
        href="/work"
        className="group flex items-center justify-between border-b border-line px-3 py-8 transition-colors duration-500 hover:bg-surface md:px-8"
      >
        <span className="text-2xl font-medium tracking-tight md:text-4xl">Bekijk alle projecten</span>
        <span aria-hidden className="text-2xl transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
          →
        </span>
      </Link>
    </section>
  );
}