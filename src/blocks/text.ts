import type { Block } from "payload";
import { styleField } from "./style";

export const textBlock: Block = {
  slug: "text",
  interfaceName: "TextBlockData",
  labels: { singular: "Tekst", plural: "Teksten" },
  fields: [
    {
      name: "label",
      type: "text",
      label: "Label (optioneel)",
      admin: { description: "Met label: label links met lijn, tekst rechts. Zonder: alleen tekst." },
    },
    {
      name: "body",
      type: "textarea",
      label: "Tekst",
      required: true,
      admin: { description: "Laat een lege regel tussen alinea's. De eerste alinea is donkerder." },
    },
    {
      type: "row",
      fields: [
        {
          name: "width",
          type: "select",
          label: "Breedte",
          defaultValue: "narrow",
          options: [
            { label: "Smal", value: "narrow" },
            { label: "Breed", value: "wide" },
          ],
        },
        {
          name: "align",
          type: "select",
          label: "Uitlijning",
          defaultValue: "left",
          options: [
            { label: "Links", value: "left" },
            { label: "Midden", value: "center" },
          ],
          admin: { condition: (_, siblingData) => !siblingData?.label },
        },
      ],
    },
    styleField,
  ],
};