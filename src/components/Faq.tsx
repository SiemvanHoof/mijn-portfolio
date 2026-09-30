"use client";
import { useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

type Item = { q: string; a: string };

export default function Faq({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-line border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `faq-${i}`;

        return (
          <li key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={id}
              className="flex w-full items-center justify-between gap-6 px-3 py-6 text-left transition-colors duration-500 hover:bg-surface md:px-8 md:py-8"
            >
              <span className="text-xl font-medium tracking-tight md:text-2xl">{item.q}</span>
              <span
                aria-hidden
                className={`relative h-4 w-4 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
              >
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
              </span>
            </button>

            <div
              id={id}
              onTransitionEnd={() => ScrollTrigger.refresh()}
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl px-3 pb-8 text-base leading-relaxed text-muted md:px-8 md:text-lg">
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}