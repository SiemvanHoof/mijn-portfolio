import type { Field } from "payload";

// Maakt van "Mijn Pagina!" → "mijn-pagina"
export const formatSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // é → e
    .replace(/[^a-z0-9]+/g, "-") // alles behalve letters/cijfers → streepje
    .replace(/(^-|-$)/g, ""); // geen streepjes aan begin of eind

// Een "slug"-veld dat zichzelf invult op basis van een ander veld (standaard de titel)
export const slugField = (from = "title"): Field => ({
  name: "slug",
  type: "text",
  label: "Slug (adres)",
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description: "Het adres van de pagina, bijv. 'privacy' wordt /privacy. Leeg laten = automatisch uit de titel.",
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === "string" && value.length > 0) return formatSlug(value);
        const source = data?.[from];
        return typeof source === "string" ? formatSlug(source) : value;
      },
    ],
  },
});