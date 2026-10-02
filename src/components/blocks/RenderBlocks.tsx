import Section from "./Section";
import IntroBlock from "./IntroBlock";
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import type { Page } from "@/payload-types";

type Props = { blocks: Page["layout"] };

export default function RenderBlocks({ blocks }: Props) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, i) => {
        const animate = block.style?.animate !== false;
        let content: React.ReactNode = null;

        switch (block.blockType) {
          case "intro":
            content = <IntroBlock block={block} animate={animate} />;
            break;
          case "text":
            content = <TextBlock block={block} animate={animate} />;
            break;
          case "image":
            content = <ImageBlock block={block} animate={animate} />;
            break;
        }

        if (!content) return null;

        return (
          <Section key={block.id ?? i} style={block.style}>
            {content}
          </Section>
        );
      })}
    </>
  );
}