import ParallaxImage from "../ParallaxImage";
import Reveal from "../Reveal";
import type { ImageBlockData, Media } from "@/payload-types";

type Props = { block: ImageBlockData; animate: boolean };

type Size = "small" | "medium" | "large";
type Position = "left" | "center" | "right";

// Volledige classnamen, zodat Tailwind ze vindt
const spans: Record<Size, string> = {
  small: "md:col-span-4",
  medium: "md:col-span-6",
  large: "md:col-span-8",
};

const starts: Record<Position, Record<Size, string>> = {
  left: { small: "md:col-start-1", medium: "md:col-start-1", large: "md:col-start-1" },
  center: { small: "md:col-start-5", medium: "md:col-start-4", large: "md:col-start-3" },
  right: { small: "md:col-start-9", medium: "md:col-start-7", large: "md:col-start-5" },
};

// Bij twee beelden: iets smaller, de tweede rechts en lager
const pairSpans: Record<Size, string> = {
  small: "md:col-span-4",
  medium: "md:col-span-5",
  large: "md:col-span-6",
};
const pairSecondStarts: Record<Size, string> = {
  small: "md:col-start-9",
  medium: "md:col-start-8",
  large: "md:col-start-7",
};

export default function ImageBlock({ block, animate }: Props) {
  // Alleen beelden die echt zijn opgehaald (geen losse id's)
  const images = (block.images ?? []).filter(
    (img): img is Media => typeof img === "object" && img !== null && Boolean(img.url)
  );
  if (images.length === 0) return null;

  const size = (block.size ?? "medium") as Size;
  const parallax = block.parallax !== false;

  const ratio = (img: Media) =>
    img.width && img.height ? { aspectRatio: `${img.width} / ${img.height}` } : { aspectRatio: "4 / 5" };

  let content: React.ReactNode;

  if (images.length === 2) {
    const [first, second] = images;
    content = (
      <div className="grid grid-cols-12 items-start gap-3">
        <ParallaxImage
          src={first.url!}
          alt={first.alt}
          style={ratio(first)}
          reveal={animate}
          parallax={parallax}
          className={`col-span-7 md:col-start-1 ${pairSpans[size]}`}
        />
        <ParallaxImage
          src={second.url!}
          alt={second.alt}
          style={ratio(second)}
          reveal={animate}
          parallax={parallax}
          className={`col-span-5 mt-24 md:mt-48 ${pairSpans[size]} ${pairSecondStarts[size]}`}
        />
      </div>
    );
  } else {
    const image = images[0];
    const position = block.position ?? "center";
    const placement =
      position === "full" ? "md:col-span-12" : `${spans[size]} ${starts[position as Position][size]}`;

    content = (
      <div className="grid grid-cols-12">
        <ParallaxImage
          src={image.url!}
          alt={image.alt}
          style={ratio(image)}
          reveal={animate}
          parallax={parallax}
          className={`col-span-12 ${placement}`}
        />
      </div>
    );
  }

  return (
    <div className="px-3 md:px-8">
      {content}
      {block.caption && (
        <Reveal disabled={!animate}>
          <p className="mt-4 text-xs text-muted">{block.caption}</p>
        </Reveal>
      )}
    </div>
  );
}