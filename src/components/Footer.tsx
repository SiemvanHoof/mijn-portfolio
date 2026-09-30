"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteName, email, navLinks, socials, availability, location } from "@/data/site";
import { useSmoothScroll } from "./SmoothScroll";
import LineReveal from "./LineReveal";

export default function Footer() {
  const pathname = usePathname();
  const lenis = useSmoothScroll();
  const showCta = pathname !== "/contact";

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-line">
      {/* Contactblok (niet op de contactpagina zelf) */}
      {showCta && (
        <div className="grid px-3 md:grid-cols-[1fr_3fr] md:px-8">
          <p className="pt-8 text-sm md:border-r md:border-line md:pr-8">Contact</p>
          <div className="pb-10 pt-6 md:pb-14 md:pl-8 md:pt-8">
            <LineReveal
              lines={["Heb je een idee?", "Laten we praten."]}
              className="text-[12vw] font-medium leading-[1.05] tracking-tighter md:text-[7vw]"
            />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-fg px-6 py-3 text-sm text-bg transition-opacity hover:opacity-80"
              >
                Start een project
              </Link>
              <a
                href={`mailto:${email}`}
                className="rounded-full border border-line px-6 py-3 text-sm transition-colors hover:bg-surface"
              >
                {email}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Lijnengrid met links */}
      <div
        className={`grid gap-px border-line bg-line md:grid-cols-3 ${showCta ? "border-y" : "border-b"}`}
      >
        <div className="bg-bg p-4 md:p-6">
          <p className="mb-3 text-xs text-muted">Menu</p>
          <ul className="space-y-1.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-opacity hover:opacity-60">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-bg p-4 md:p-6">
          <p className="mb-3 text-xs text-muted">Social media</p>
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

        <div className="bg-bg p-4 md:p-6">
          <p className="mb-3 text-xs text-muted">Info</p>
          <ul className="space-y-1.5 text-sm">
            <li>Based in {location}</li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green-500" />
              {availability}
            </li>
          </ul>
        </div>
      </div>

      {/* Onderste regel */}
      <div className="flex items-center justify-between px-3 py-4 text-xs text-muted md:px-8">
        <span>
          © {new Date().getFullYear()} {siteName}
        </span>
        <button onClick={toTop} className="transition-colors hover:text-fg">
          Terug naar boven ↑
        </button>
      </div>
    </footer>
  );
}