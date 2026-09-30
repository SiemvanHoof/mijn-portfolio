"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { navLinks } from "@/data/site";
import { projects } from "@/data/projects";

// Welke tekst hoort bij welke pagina?
function labelFor(path: string) {
  const project = projects.find((p) => `/work/${p.slug}` === path);
  if (project) return project.title;
  const link = navLinks.find((l) => l.href === path);
  return link?.label ?? "Even laden";
}

export default function PageTransition() {
  const overlay = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const busy = useRef(false);
  const leaving = useRef(false);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Gordijn weghalen (na navigatie, of als vangnet)
  const reveal = () => {
    if (safety.current) clearTimeout(safety.current);
    leaving.current = false;

    // Focus naar de nieuwe pagina, zodat schermlezers daar verder gaan
    document.getElementById("content")?.focus({ preventScroll: true });

    gsap
      .timeline({
        onComplete: () => {
          busy.current = false;
        },
      })
      .to(label.current, { yPercent: -100, duration: 0.4, ease: "power3.in" })
      .to(overlay.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7, ease: "power4.inOut" }, "-=0.1")
      .set(overlay.current, { autoAlpha: 0 });
  };

  // 1. Klikken op interne links onderscheppen en eerst het gordijn dichtdoen
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Laat speciale klikken met rust (nieuw tabblad, rechtsklik, enz.)
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as HTMLElement).closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return; // externe link
      if (url.pathname === window.location.pathname) return; // zelfde pagina of #anker
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault();
      e.stopPropagation();
      if (busy.current) return;
      busy.current = true;
      leaving.current = true;

      // Naam van de bestemming in het gordijn zetten
      if (label.current) label.current.textContent = labelFor(url.pathname);

      gsap
        .timeline()
        .set(overlay.current, { autoAlpha: 1 })
        .fromTo(
          overlay.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power4.inOut" }
        )
        .fromTo(label.current, { yPercent: 100 }, { yPercent: 0, duration: 0.5, ease: "power3.out" }, "-=0.2")
        .call(() => {
          router.push(url.pathname + url.search + url.hash);
          // Vangnet: als er na 4 seconden nog geen nieuwe pagina is, toch weer open
          safety.current = setTimeout(() => {
            if (leaving.current) reveal();
          }, 4000);
        });
    };

    // "true" = capture: we zijn eerder dan de klik-afhandeling van Next.js
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // 2. Nieuwe pagina staat er: gordijn omhoog weg
  useEffect(() => {
    if (!leaving.current) return;
    const frame = requestAnimationFrame(reveal);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div
      ref={overlay}
      aria-hidden
      style={{ visibility: "hidden", clipPath: "inset(100% 0% 0% 0%)" }}
      className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-fg text-bg"
    >
      <span className="overflow-hidden">
        <span ref={label} className="block text-sm font-medium tracking-tight" />
      </span>
    </div>
  );
}