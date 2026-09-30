"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { navLinks, socials, email, availability } from "@/data/site";

type Props = {
  open: boolean;
  onClose: () => void;
  pillRef: React.RefObject<HTMLDivElement | null>;
};

export default function Menu({ open, onClose, pillRef }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = panel.current;
    const pill = pillRef.current;
    if (!el || !pill) return;

    if (!open) {
      tl.current?.reverse();
      return;
    }

    // Oude animatie netjes terugzetten en opruimen
    tl.current?.progress(0).kill();

    // Meet waar de pil zit binnen het paneel
    const p = el.getBoundingClientRect();
    const q = pill.getBoundingClientRect();
    const startShape = `inset(${q.top - p.top}px ${p.right - q.right}px ${p.bottom - q.bottom}px ${
      q.left - p.left
    }px round ${q.height / 2}px)`;

    tl.current = gsap
      .timeline()
      .set(el, { autoAlpha: 1 })
      .fromTo(
        el,
        { clipPath: startShape },
        { clipPath: "inset(0px 0px 0px 0px round 20px)", duration: 0.7, ease: "power4.inOut" }
      )
      .fromTo(
        el.querySelectorAll(".menu-item"),
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "power3.out" },
        "-=0.3"
      );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tl.current.timeScale(20);
    }
  }, [open, pillRef]);

  useEffect(() => () => {
    tl.current?.kill();
  }, []);

  return (
    <div
      ref={panel}
      id="site-menu"
      style={{ visibility: "hidden" }}
      className="absolute left-1/2 top-[-0.5rem] flex h-[min(34rem,calc(100svh-1rem))] w-[min(16rem,calc(100vw-1.5rem))] -translate-x-1/2 flex-col rounded-[1.25rem] bg-panel px-7 pb-7 pt-18"
    >
      <nav aria-label="Hoofdmenu">
        <p className="menu-item mb-4 text-[11px] text-muted">Menu</p>
        <ul className="space-y-2.5">
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.href} className="menu-item">
                <Link
                  href={link.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="flex items-center gap-2 text-xl leading-tight font-medium tracking-tight transition-opacity hover:opacity-60"
                >
                  {link.label}
                  {active && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-fg" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <hr className="menu-item mb-7 mt-12 border-line" />

      <div className="menu-item">
        <p className="mb-3 text-[11px] text-muted">Info</p>
        <ul className="space-y-2 text-xs">
          <li>
            <a href={`mailto:${email}`} className="transition-opacity hover:opacity-60">
              {email}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green-500" />
            {availability}
          </li>
        </ul>
      </div>

      <div className="menu-item mt-auto">
        <p className="mb-3 text-[11px] text-muted">Social media</p>
        <ul className="space-y-2 text-xs">
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
    </div>
  );
}