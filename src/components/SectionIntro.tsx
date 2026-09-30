import LineReveal from "./LineReveal";
import Reveal from "./Reveal";

type Props = {
  label: string;
  heading: string[];
  text?: string;
};

export default function SectionIntro({ label, heading, text }: Props) {
  return (
    <div className="grid px-3 md:grid-cols-[1fr_3fr] md:px-8">
      <p className="pt-8 text-sm md:border-r md:border-line md:pr-8">{label}</p>

      <div className="pb-20 pt-6 md:pb-32 md:pl-8 md:pt-8">
        <LineReveal
          lines={heading}
          className="text-[12vw] font-medium leading-[1.05] tracking-tighter md:text-[7vw]"
        />
        {text && (
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted md:text-base">{text}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}