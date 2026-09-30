"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        max > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100))) : 0;
      if (ref.current) ref.current.textContent = `${pct}%`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <span
      ref={ref}
      aria-hidden
      className="grid h-6 min-w-10 place-items-center rounded-full bg-bg/15 px-2.5 text-xs tabular-nums"
    >
      0%
    </span>
  );
}