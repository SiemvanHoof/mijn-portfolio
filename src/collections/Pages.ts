import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";
import { introBlock } from "../blocks/intro";
import { textBlock } from "../blocks/text";
import { imageBlock } from "../blocks/image";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Pagina", plural: "Pagina's" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
  },

  // Concepten: alleen gepubliceerde pagina's zijn zichtbaar voor bezoekers
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true; // ingelogd (jij): alles
      return { _status: { equals: "published" } }; // bezoekers: alleen gepubliceerd
    },
  },

  fields: [
    { name: "title", type: "text", label: "Titel", required: true },
    slugField(),
    {
      name: "layout",
      type: "blocks",
      label: "Secties",
      labels: { singular: "Sectie", plural: "Secties" },
      blocks: [introBlock, textBlock, imageBlock],
    },
  ],
};