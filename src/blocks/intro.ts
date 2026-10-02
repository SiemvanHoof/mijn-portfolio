import type { Block } from "payload";
import { styleField } from "./style";

export const introBlock: Block = {
  slug: "intro",
  interfaceName: "IntroBlockData",
  labels: { singular: "Intro", plural: "Intro's" },
  fields: [
    {
      name: "layout",
      type: "select",
      label: "Opbouw",
      defaultValue: "line",
      options: [
        { label: "Label links met lijn", value: "line" },
        { label: "Kop links, tekst rechts", value: "split" },
      ],
    },
    {
      name: "label",
      type: "text",
      label: "Label",
      admin: {
        description: "Klein woord links, bijv. 'Werkwijze'.",
        condition: (_, siblingData) => siblingData?.layout !== "split",
      },
    },
    {
      name: "heading",
      type: "textarea",
      label: "Kop",
      required: true,
      admin: { description: "Elke regel wordt een aparte regel die omhoog schuift." },
    },
    { name: "text", type: "textarea", label: "Korte tekst" },
    styleField,
  ],
};