"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

type Props = { src: string; alt?: string; className?: string };

export default function ParallaxImage({ src, alt = "", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const box = ref.current!;

      // Opent van onder naar boven zodra het in beeld komt
      gsap.fromTo(
        box,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: box, start: "top 85%" },
        }
      );

      // De foto beweegt licht mee tijdens het scrollen
      gsap.fromTo(
        box.querySelector("img"),
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`overflow-hidden rounded-[1.25rem] bg-surface ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full scale-[1.15] object-cover" />
    </div>
  );
}