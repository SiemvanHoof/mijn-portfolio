import LineReveal from "../LineReveal";
import Reveal from "../Reveal";
import type { IntroBlockData } from "@/payload-types";

type Props = { block: IntroBlockData; animate: boolean };

export default function IntroBlock({ block, animate }: Props) {
  const lines = block.heading
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  // Opbouw: kop links, tekst rechts
  if (block.layout === "split") {
    return (
      <div className="flex flex-col gap-8 px-3 md:flex-row md:items-end md:justify-between md:px-8">
        <LineReveal
          lines={lines}
          disabled={!animate}
          className="text-[12vw] font-medium leading-[1.05] tracking-tighter md:text-[6vw]"
        />
        {block.text && (
          <Reveal delay={0.2} disabled={!animate}>
            <p className="max-w-xs text-sm leading-relaxed text-muted md:mb-[0.6em] md:text-right md:text-base">
              {block.text}
            </p>
          </Reveal>
        )}
      </div>
    );
  }

  // Opbouw: label links met lijn
  return (
    <div className="grid px-3 md:grid-cols-[1fr_3fr] md:px-8">
      <p className="text-sm md:border-r md:border-line md:pr-8">{block.label}</p>
      <div className="pt-6 md:pl-8 md:pt-0">
        <LineReveal
          lines={lines}
          disabled={!animate}
          className="text-[12vw] font-medium leading-[1.05] tracking-tighter md:text-[7vw]"
        />
        {block.text && (
          <Reveal delay={0.2} disabled={!animate}>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted md:text-base">{block.text}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}