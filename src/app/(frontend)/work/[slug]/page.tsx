import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/data/projects";
import LineReveal from "@/components/LineReveal";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

// Tekstblok: label links met lijn, tekst rechts
function TextBlock({ label, paragraphs }: { label: string; paragraphs: string[] }) {
  return (
    <div className="grid px-3 py-20 md:grid-cols-[1fr_3fr] md:px-8 md:py-28">
      <p className="mb-6 text-sm md:mb-0 md:border-r md:border-line md:pr-8">{label}</p>
      <Reveal className="md:pl-8">
        <div className="max-w-2xl space-y-6 text-base leading-relaxed md:text-lg">
          {paragraphs.map((text, i) => (
            <p key={i} className={i === 0 ? "" : "text-muted"}>
              {text}
            </p>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const [question, research, design, development, result] = project.sections;
  const [g1, g2, g3, g4] = project.gallery;

  const meta = [
    ["Klant", project.client],
    ["Jaar", project.year],
    ["Rol", project.role],
    ["Discipline", project.tags.join(", ")],
  ];

  return (
    <main className="pt-32 md:pt-40">
      {/* Titel */}
      <div className="px-3 md:px-8">
        <p className="mb-6 text-xs text-muted">
          <Link href="/work" className="transition-colors hover:text-fg">
            ← Work
          </Link>{" "}
          / {String(index + 1).padStart(2, "0")}
        </p>
        <LineReveal
          tag="h1"
          lines={[project.title]}
          className="text-[14vw] font-medium leading-[1.05] tracking-tighter md:text-[9vw]"
        />
      </div>

      {/* Gegevens */}
      <div className="mt-12 grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-4">
        {meta.map(([label, value]) => (
          <div key={label} className="bg-bg p-4 md:p-6">
            <p className="mb-2 text-xs text-muted">{label}</p>
            <p className="text-sm">{value}</p>
          </div>
        ))}
      </div>

      {/* Cover (groot) */}
      <Reveal className="px-3 pt-3 md:px-8 md:pt-8">
        <div className="aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.cover} alt={project.title} className="h-full w-full object-cover" />
        </div>
      </Reveal>

      {/* Over het project */}
      <div className="grid px-3 py-20 md:grid-cols-[1fr_3fr] md:px-8 md:py-32">
        <p className="mb-6 text-sm md:mb-0 md:border-r md:border-line md:pr-8">Over het project</p>
        <Reveal className="md:pl-8">
          <p className="max-w-3xl text-2xl font-medium leading-snug tracking-tight md:text-4xl">
            {project.summary}
          </p>
        </Reveal>
      </div>

      <TextBlock label={question.label} paragraphs={question.paragraphs} />

      {/* Beeld rechts */}
      <div className="grid grid-cols-12 px-3 md:px-8">
        <ParallaxImage src={g1} className="col-span-10 col-start-3 aspect-[4/5] md:col-span-4 md:col-start-8" />
      </div>

      <TextBlock label={research.label} paragraphs={research.paragraphs} />
      <TextBlock label={design.label} paragraphs={design.paragraphs} />

      {/* Twee beelden, versprongen */}
      <div className="grid grid-cols-12 items-start gap-3 px-3 md:px-8">
        <ParallaxImage src={g2} className="col-span-7 aspect-[3/4] md:col-span-4 md:col-start-2" />
        <ParallaxImage
          src={g3}
          className="col-span-5 mt-24 aspect-[4/5] md:col-span-3 md:col-start-8 md:mt-48"
        />
      </div>

      <TextBlock label={development.label} paragraphs={development.paragraphs} />

      {/* Quote */}
      <figure className="border-y border-line px-3 py-20 md:px-8 md:py-32">
        <Reveal>
          <blockquote className="max-w-5xl text-3xl font-medium leading-tight tracking-tight md:text-5xl">
            “{project.quote.text}”
          </blockquote>
          <figcaption className="mt-8 text-sm text-muted">{project.quote.author}</figcaption>
        </Reveal>
      </figure>

      <TextBlock label={result.label} paragraphs={result.paragraphs} />

      {/* Cijfers */}
      <div className="grid grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-3">
        {project.stats.map((stat) => (
          <div key={stat.label} className="bg-bg p-6 md:p-8">
            <p className="text-5xl font-medium tracking-tighter md:text-7xl">{stat.value}</p>
            <p className="mt-3 text-xs text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Beeld links */}
      <div className="grid grid-cols-12 px-3 py-20 md:px-8 md:py-32">
        <ParallaxImage src={g4} className="col-span-12 aspect-[16/10] md:col-span-6 md:col-start-2" />
      </div>

      {/* Volgend project */}
      <Link
        href={`/work/${next.slug}`}
        className="group block border-t border-line px-3 py-12 transition-colors duration-500 hover:bg-surface md:px-8 md:py-16"
      >
        <p className="mb-4 text-xs text-muted">Volgend project</p>
        <div className="flex items-center justify-between gap-6">
          <span className="text-[10vw] font-medium leading-none tracking-tighter md:text-[6vw]">
            {next.title}
          </span>
          <span
            aria-hidden
            className="text-4xl transition-transform duration-500 group-hover:translate-x-3 md:text-6xl"
          >
            →
          </span>
        </div>
      </Link>
    </main>
  );
}