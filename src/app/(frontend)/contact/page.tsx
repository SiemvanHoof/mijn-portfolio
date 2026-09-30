import type { Metadata } from "next";
import LineReveal from "@/components/LineReveal";
import Reveal from "@/components/Reveal";
import SectionIntro from "@/components/SectionIntro";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import { contact } from "@/data/contact";
import { email, availability, location, socials } from "@/data/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="pt-32 md:pt-40">
      {/* Intro */}
      <div className="flex flex-col gap-8 px-3 pb-16 md:flex-row md:items-end md:justify-between md:px-8 md:pb-20">
        <LineReveal
          tag="h1"
          lines={contact.heading}
          className="text-[14vw] font-medium leading-[1.05] tracking-tighter md:text-[8vw]"
        />
        <Reveal delay={0.2}>
          <p className="max-w-xs text-sm leading-relaxed text-muted md:mb-[0.8em] md:text-right md:text-base">
            {contact.intro}
          </p>
        </Reveal>
      </div>

      {/* Gegevens + formulier */}
      <div className="grid border-t border-line md:grid-cols-[1fr_2fr]">
        <aside className="space-y-10 border-b border-line px-3 py-10 md:border-b-0 md:border-r md:px-8 md:py-16">
          <div>
            <p className="mb-2 text-xs text-muted">E-mail</p>
            <a
              href={`mailto:${email}`}
              className="break-all text-2xl font-medium tracking-tight transition-opacity hover:opacity-60 md:text-3xl"
            >
              {email}
            </a>
          </div>

          <div>
            <p className="mb-2 text-xs text-muted">Beschikbaarheid</p>
            <p className="flex items-center gap-2 text-sm">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green-500" />
              {availability}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs text-muted">Reactietijd</p>
            <p className="text-sm">{contact.responseTime}</p>
          </div>

          <div>
            <p className="mb-2 text-xs text-muted">Locatie</p>
            <p className="text-sm">{location}</p>
          </div>

          <div>
            <p className="mb-2 text-xs text-muted">Social media</p>
            <ul className="space-y-1.5 text-sm">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-60"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="px-3 py-10 md:px-8 md:py-16">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </div>

      {/* FAQ */}
      <section className="border-t border-line">
        <SectionIntro
          label="FAQ"
          heading={["Goed om", "te weten."]}
          text="Staat je vraag er niet tussen? Stuur me gerust een bericht."
        />
        <Faq items={contact.faqs} />
      </section>
    </main>
  );
}