import Reveal from "../Reveal";
import type { TextBlockData } from "@/payload-types";

type Props = { block: TextBlockData; animate: boolean };

export default function TextBlock({ block, animate }: Props) {
  // Alinea's: gescheiden door een lege regel
  const paragraphs = block.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const width = block.width === "wide" ? "max-w-4xl" : "max-w-2xl";

  const content = (
    <div className={`${width} space-y-6 text-base leading-relaxed md:text-lg`}>
      {paragraphs.map((text, i) => (
        <p key={i} className={i === 0 ? "" : "text-muted"}>
          {text}
        </p>
      ))}
    </div>
  );

  // Met label: label links met lijn, tekst rechts
  if (block.label) {
    return (
      <div className="grid px-3 md:grid-cols-[1fr_3fr] md:px-8">
        <p className="mb-6 text-sm md:mb-0 md:border-r md:border-line md:pr-8">{block.label}</p>
        <Reveal className="md:pl-8" disabled={!animate}>
          {content}
        </Reveal>
      </div>
    );
  }

  // Zonder label: links of in het midden
  return (
    <div className="px-3 md:px-8">
      <Reveal
        disabled={!animate}
        className={block.align === "center" ? "flex justify-center text-center" : ""}
      >
        {content}
      </Reveal>
    </div>
  );
}