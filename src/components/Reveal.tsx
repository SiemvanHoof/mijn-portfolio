"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  disabled?: boolean;
};

export default function Reveal({ children, delay = 0, className, disabled = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (disabled) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = ref.current!;

      // Beginstand: iets lager en onzichtbaar
      gsap.set(el, { y: 60, opacity: 0 });

      // Start zodra het element écht in beeld komt
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          gsap.to(el, { y: 0, opacity: 1, duration: 1.1, delay, ease: "power3.out" });
          observer.disconnect();
        },
        { rootMargin: "0px 0px -15% 0px" }
      );
      observer.observe(el);

      return () => observer.disconnect();
    },
    { scope: ref, dependencies: [disabled] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}