"use client";
import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { projects } from "@/data/projects";

const ALL = "Alles";

export default function ProjectList() {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState(ALL);
  const [active, setActive] = useState<string | null>(null);

  const tags = useMemo(() => [ALL, ...Array.from(new Set(projects.flatMap((p) => p.tags)))], []);
  const list = filter === ALL ? projects : projects.filter((p) => p.tags.includes(filter));
  const countFor = (tag: string) =>
    tag === ALL ? projects.length : projects.filter((p) => p.tags.includes(tag)).length;

  // Previewbeeld volgt de muis, met een beetje vertraging
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const el = preview.current!;
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      const move = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    }, root);
    return () => context.revert();
  }, []);

  // Rijen komen opnieuw binnen als het filter verandert
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".pl-row", { y: 30, opacity: 0, duration: 0.7, stagger: 0.05, ease: "power3.out" });
    }, root);
    return () => context.revert();
  }, [filter]);

  return (
    <div ref={root}>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 px-3 pb-8 md:px-8">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            aria-pressed={filter === tag}
            className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
              filter === tag ? "border-fg bg-fg text-bg" : "border-line hover:bg-surface"
            }`}
          >
            {tag} <span className="opacity-50">({countFor(tag)})</span>
          </button>
        ))}
      </div>

      {/* Kolomkoppen (alleen desktop) */}
      <div className="hidden grid-cols-[4rem_2fr_1fr_1fr_5rem] gap-4 border-t border-line px-8 py-3 text-xs text-muted md:grid">
        <span>#</span>
        <span>Project</span>
        <span>Klant</span>
        <span>Discipline</span>
        <span className="text-right">Jaar</span>
      </div>

      {/* Lijst */}
      <ul className="border-t border-line" onMouseLeave={() => setActive(null)}>
        {list.map((p) => (
          <li key={p.slug} className="pl-row border-b border-line">
            <Link
              href={`/work/${p.slug}`}
              onMouseEnter={() => setActive(p.slug)}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 px-3 py-6 transition-colors duration-500 hover:bg-surface md:grid-cols-[4rem_2fr_1fr_1fr_5rem] md:px-8 md:py-8"
            >
              <span className="text-xs text-muted">
                {String(projects.indexOf(p) + 1).padStart(2, "0")}
              </span>
              <span className="text-2xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                {p.title}
              </span>
              <span className="hidden text-sm text-muted md:block">{p.client}</span>
              <span className="hidden text-sm text-muted md:block">{p.tags.join(" · ")}</span>
              <span className="text-right text-xs text-muted">{p.year}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Zwevend previewbeeld (alleen desktop) */}
      <div
        ref={preview}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[4/3] w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl transition-[opacity,scale] duration-300 md:block ${
          active ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        {projects.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={p.slug}
            src={p.cover}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover ${active === p.slug ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
    </div>
  );
}