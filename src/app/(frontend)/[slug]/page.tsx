import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import RenderBlocks from "@/components/blocks/RenderBlocks";

// Altijd de nieuwste versie uit de database tonen
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

async function getPage(slug: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    overrideAccess: false,
  });
  return docs[0] ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  return page ? { title: page.title } : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <main className="pt-24 md:pt-32">
      <RenderBlocks blocks={page.layout} />
    </main>
  );
}