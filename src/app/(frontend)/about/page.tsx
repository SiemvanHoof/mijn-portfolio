import type { Metadata } from "next";
import LineReveal from "@/components/LineReveal";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import SectionIntro from "@/components/SectionIntro";
import Age from "@/components/Age";
import { about, type Entry } from "@/data/about";
import { siteName } from "@/data/site";

export const metadata: Metadata = { title: "Over mij" };

function EntryList({ items }: { items: Entry[] }) {
  return (
    <ul className="divide-y divide-line border-t border-line">
      {items.map((item) => (
        <li
          key={item.period + item.role}
          className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 px-3 py-6 md:grid-cols-[12rem_2fr_1fr_8rem] md:items-center md:px-8 md:py-8"
        >
          <span className="order-2 text-xs text-muted md:order-none">{item.period}</span>
          <span className="order-1 col-span-2 text-xl font-medium tracking-tight md:order-none md:col-span-1 md:text-2xl">
            {item.role}
          </span>
          <span className="order-3 text-sm text-muted md:order-none">{item.company}</span>
          <span className="order-4 text-right text-xs text-muted md:order-none">{item.place}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  const [leadBefore, leadAfter] = about.lead.split("{age}");

  return (
    <main className="pt-32 md:pt-40">
      {/* Intro */}
      <div className="flex flex-col gap-8 px-3 pb-16 md:flex-row md:items-end md:justify-between md:px-8 md:pb-20">
        <LineReveal
          tag="h1"
          lines={about.heading}
          className="text-[11vw] font-medium leading-[1.05] tracking-tighter md:text-[6.5vw]"
        />
        <Reveal delay={0.2}>
          <p className="max-w-xs text-sm leading-relaxed text-muted md:mb-[0.8em] md:text-right md:text-base">
            {about.intro}
          </p>
        </Reveal>
      </div>

      {/* Portret en bio */}
      <div className="grid grid-cols-12 gap-y-12 border-t border-line px-3 pt-10 md:px-8 md:pt-16">
        <ParallaxImage
          src={about.portrait}
          alt={`Portret van ${siteName}`}
          className="col-span-10 aspect-[4/5] md:col-span-4"
        />

        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="text-2xl font-medium leading-snug tracking-tight md:text-4xl">
              {leadBefore}
              <Age birthDate={about.birthDate} />
              {leadAfter}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 space-y-6 text-base leading-relaxed md:text-lg">
              {about.bio.map((text, i) => (
                <p key={i} className={i === 0 ? "" : "text-muted"}>
                  {text}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Wat ik doe */}
      <section className="mt-24 border-t border-line md:mt-40">
        <SectionIntro
          label="Wat ik doe"
          heading={["Ontwerpen én bouwen,", "in één hand."]}
          text="Omdat ik allebei doe, gaat er tussen idee en eindresultaat niets verloren."
        />

        <div className="grid gap-px border-y border-line bg-line md:grid-cols-2">
          {about.services.map((service, i) => (
            <div key={service.title} className="flex flex-col bg-bg p-6 md:p-8">
              <span className="text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-10 text-3xl font-medium tracking-tight md:text-4xl">{service.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{service.text}</p>
              <ul className="mt-8 space-y-2 border-t border-line pt-6 text-sm">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-fg" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="grid px-3 py-20 md:grid-cols-[1fr_3fr] md:px-8 md:py-28">
        <p className="mb-6 text-sm md:mb-0 md:border-r md:border-line md:pr-8">Tools</p>
        <Reveal className="md:pl-8">
          <ul className="flex max-w-3xl flex-wrap gap-2">
            {about.tools.map((tool) => (
              <li key={tool} className="rounded-full border border-line px-4 py-2 text-sm">
                {tool}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">{about.toolsNote}</p>
        </Reveal>
      </section>

      {/* Werkervaring */}
      <section className="border-t border-line">
        <SectionIntro label="Werkervaring" heading={["Waar ik", "gewerkt heb."]} />
        <EntryList items={about.experience} />
      </section>

      {/* Opleiding */}
      <section className="border-t border-line">
        <SectionIntro label="Opleiding" heading={["Waar ik", "leer."]} />
        <EntryList items={about.education} />
      </section>
    </main>
  );
}