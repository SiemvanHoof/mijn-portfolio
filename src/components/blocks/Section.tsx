type SectionStyle =
  | {
      background?: string | null;
      spacing?: string | null;
      borderTop?: boolean | null;
    }
  | null
  | undefined;

const backgrounds: Record<string, string> = {
  default: "",
  surface: "bg-surface",
  dark: "dark bg-bg text-fg",
  light: "light bg-bg text-fg",
};

const spacings: Record<string, string> = {
  small: "py-12 md:py-16",
  normal: "py-20 md:py-28",
  large: "py-28 md:py-40",
};

export default function Section({ style, children }: { style: SectionStyle; children: React.ReactNode }) {
  const className = [
    backgrounds[style?.background ?? "default"] ?? "",
    spacings[style?.spacing ?? "normal"] ?? spacings.normal,
    style?.borderTop ? "border-t border-line" : "",
  ].join(" ");

  return <section className={className}>{children}</section>;
}