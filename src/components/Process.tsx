"use client";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import SectionIntro from "./SectionIntro";

const steps = [
  {
    code: "KB",
    color: "#f4f4f5",
    title: ["Kennismaken", "& briefing."],
    tags: ["Kennismaking", "Wensen & doelen"],
    text: "We drinken een kop koffie of bellen even. Jij vertelt over je bedrijf en wat je nodig hebt, ik stel vragen en denk mee. Daarna krijg je een duidelijk voorstel.",
    image: "https://picsum.photos/seed/step-1/900/1100",
  },
  {
    code: "CD",
    color: "#ece6dc",
    title: ["Concept", "& design."],
    tags: ["Schetsen", "Ontwerp in Figma"],
    text: "Ik werk het idee uit tot een ontwerp in Figma. Je ziet precies hoe je site eruit komt te zien, en we schaven samen tot het klopt.",
    image: "https://picsum.photos/seed/step-2/900/1100",
  },
  {
    code: "DV",
    color: "#dfe6dc",
    title: ["Development", "& animatie."],
    tags: ["WordPress of Next.js", "Animaties"],
    text: "Het ontwerp wordt een echte website: snel, goed te lezen op elk scherm en, als je dat wilt, makkelijk zelf aan te passen.",
    image: "https://picsum.photos/seed/step-3/900/1100",
  },
  {
    code: "LN",
    color: "#dde3ea",
    title: ["Livegang", "& nazorg."],
    tags: ["Testen", "Hulp achteraf"],
    text: "Alles wordt getest en live gezet. Ook daarna blijf ik bereikbaar voor vragen, kleine aanpassingen of uitbreidingen.",
    image: "https://picsum.photos/seed/step-4/900/1100",
  },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);

  // Als de volgende kaart eroverheen schuift: huidige kaart krimpt en wordt donkerder
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = gsap.utils.toArray<HTMLElement>(".pc-inner");

      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: next.parentElement,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          })
          .to(card, { scale: 0.92, ease: "none" }, 0)
          .to(card.querySelector(".pc-shade"), { opacity: 0.35, ease: "none" }, 0);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="process">
      <SectionIntro
        label="Werkwijze"
        heading={["Van idee tot live", "in vier stappen."]}
        text="Geen ingewikkeld traject, wel duidelijke stappen. Zo weet je altijd waar we staan en wat er komt."
      />

      <div className="px-3 pb-[10vh]">
        {steps.map((step, i) => (
          <div
            key={step.code}
            className="sticky mb-6"
            style={{ top: `calc(4.5rem + ${i * 1.25}rem)` }}
          >
            <article
              className="pc-inner relative grid h-[min(80svh,44rem)] origin-top grid-rows-[10rem_1fr] gap-6 overflow-hidden rounded-[2rem] p-6 text-[#020108] md:grid-cols-2 md:grid-rows-1 md:gap-10 md:p-10"
              style={{ backgroundColor: step.color }}
            >
              {/* Tekstkant */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <span className="text-sm text-black/50">({step.code})</span>
                    <span className="text-5xl font-medium leading-none tracking-tighter md:text-7xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl">
                    {step.title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                </div>

                <div>
                  <ul className="flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-black/15 px-3 py-1 text-xs">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 max-w-sm text-sm leading-relaxed text-black/60">{step.text}</p>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex rounded-full bg-[#020108] px-4 py-2 text-xs text-white transition-opacity hover:opacity-80"
                  >
                    Start een project
                  </Link>
                </div>
              </div>

              {/* Beeld: op mobiel bovenaan, op desktop rechts */}
              <div className="order-first overflow-hidden rounded-[1.5rem] bg-black/10 md:order-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={step.image} alt="" className="h-full w-full object-cover" />
              </div>

              {/* Schaduwlaag die donkerder wordt als de volgende kaart eroverheen schuift */}
              <div aria-hidden className="pc-shade pointer-events-none absolute inset-0 bg-black opacity-0" />
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}