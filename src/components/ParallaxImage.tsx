"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  reveal?: boolean;
  parallax?: boolean;
};

export default function ParallaxImage({
  src,
  alt = "",
  className = "",
  style,
  reveal = true,
  parallax = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const box = ref.current!;

      // Opent van onder naar boven zodra het in beeld komt
      if (reveal) {
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
      }

      // De foto beweegt licht mee tijdens het scrollen
      if (parallax) {
        gsap.fromTo(
          box.querySelector("img"),
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
    },
    { scope: ref }
  );

  return (
    <div ref={ref} style={style} className={`overflow-hidden rounded-[1.25rem] bg-surface ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${parallax ? "scale-[1.15]" : ""}`}
      />
    </div>
  );
}