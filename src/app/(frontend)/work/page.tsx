import type { Metadata } from "next";
import LineReveal from "@/components/LineReveal";
import Reveal from "@/components/Reveal";
import ProjectList from "@/components/ProjectList";

export const metadata: Metadata = { title: "Werk" };

export default function WorkPage() {
  return (
    <main className="pt-32 md:pt-40">
      <div className="flex flex-col gap-8 px-3 pb-16 md:flex-row md:items-end md:justify-between md:px-8 md:pb-20">
        <LineReveal
          tag="h1"
          lines={["Geselecteerd", "werk."]}
          className="text-[16vw] font-medium leading-[1.05] tracking-tighter md:text-[9vw]"
        />
        <Reveal delay={0.2}>
          <p className="max-w-xs text-sm leading-relaxed text-muted md:mb-[0.8em] md:text-right md:text-base">
            Projecten waar ik aan heb gewerkt, tijdens mijn stage en daarbuiten.
          </p>
        </Reveal>
      </div>

      <ProjectList />
    </main>
  );
}