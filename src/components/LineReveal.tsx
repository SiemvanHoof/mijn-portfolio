"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  lines: string[];
  className?: string;
  tag?: "h1" | "h2" | "h3";
  disabled?: boolean;
};

export default function LineReveal({ lines, className, tag = "h2", disabled = false }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const Tag = tag;

  useGSAP(
    () => {
      if (disabled) return;
      const el = ref.current!;
      const els = el.querySelectorAll(".lr-line");

      // Beginstand: regels onder hun masker
      gsap.set(els, { y: 0, yPercent: 110 });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(els, { yPercent: 0 });
        return;
      }

      // Start zodra de kop écht in beeld komt
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          gsap.to(els, { yPercent: 0, duration: 1.1, stagger: 0.08, ease: "power4.out" });
          observer.disconnect();
        },
        { rootMargin: "0px 0px -10% 0px" }
      );
      observer.observe(el);

      return () => observer.disconnect();
    },
    { scope: ref, dependencies: [disabled] }
  );

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={`${i}-${line}`} className="block overflow-hidden pb-[0.06em]">
          <span
            className="lr-line block"
            style={disabled ? undefined : { transform: "translateY(110%)" }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}