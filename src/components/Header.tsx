"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import ScrollProgress from "./ScrollProgress";
import Menu from "./Menu";
import { siteName } from "@/data/site";
import { useSmoothScroll } from "./SmoothScroll";

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const lenis = useSmoothScroll();
  const pathname = usePathname();

  // Menu sluiten zodra je naar een andere pagina gaat
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll pauzeren, Escape om te sluiten, Tab binnen de header houden
  useEffect(() => {
    if (lenis) {
      if (open) lenis.stop();
      else lenis.start();
    } else {
      document.documentElement.style.overflow = open ? "hidden" : "";
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);

      if (open && e.key === "Tab" && headerRef.current) {
        const focusable = Array.from(
          headerRef.current.querySelectorAll<HTMLElement>("a[href], button")
        ).filter((el) => el.offsetParent !== null);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  // Focus: bij openen naar de eerste menulink, bij sluiten terug naar de knop
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const t = setTimeout(() => {
        document.querySelector<HTMLElement>("#site-menu a")?.focus();
      }, 400);
      return () => clearTimeout(t);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      toggleRef.current?.focus();
    }
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-3 py-3 md:px-8"
    >
      {/* Klik naast het paneel = sluiten */}
      {open && <div aria-hidden className="fixed inset-0" onClick={() => setOpen(false)} />}

      <Link href="/" className="relative justify-self-start text-sm font-medium tracking-tight">
        {siteName}
      </Link>

      <div className="relative z-10 flex justify-center">
        <Menu open={open} onClose={() => setOpen(false)} pillRef={pillRef} />

        <div ref={pillRef} className="relative z-10 flex items-center gap-1 rounded-full bg-fg p-1 text-bg">
          <button
            ref={toggleRef}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="flex h-6 items-center gap-2 rounded-full pl-2 pr-2.5 text-xs"
          >
            <span aria-hidden className="relative block h-2 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </span>
            <span className="w-8 text-left">{open ? "Close" : "Menu"}</span>
          </button>
          <ThemeToggle />
          <ScrollProgress />
        </div>
      </div>

      <Link
        href="/contact"
        className="relative hidden justify-self-end rounded-full bg-fg px-3 py-1.5 text-xs text-bg transition-opacity hover:opacity-80 md:inline-flex"
      >
        Contact
      </Link>
    </header>
  );
}