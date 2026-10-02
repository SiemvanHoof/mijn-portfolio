import type { Block } from "payload";
import { styleField } from "./style";

export const imageBlock: Block = {
  slug: "image",
  interfaceName: "ImageBlockData",
  labels: { singular: "Beeld", plural: "Beelden" },
  fields: [
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      label: "Beeld(en)",
      required: true,
      minRows: 1,
      maxRows: 2,
      admin: { description: "Eén beeld, of twee die versprongen naast elkaar staan." },
    },
    {
      type: "row",
      fields: [
        {
          name: "position",
          type: "select",
          label: "Positie",
          defaultValue: "center",
          options: [
            { label: "Links", value: "left" },
            { label: "Midden", value: "center" },
            { label: "Rechts", value: "right" },
            { label: "Volle breedte", value: "full" },
          ],
          admin: {
            condition: (_, siblingData) => !siblingData?.images || siblingData.images.length < 2,
          },
        },
        {
          name: "size",
          type: "select",
          label: "Grootte",
          defaultValue: "medium",
          options: [
            { label: "Klein", value: "small" },
            { label: "Middel", value: "medium" },
            { label: "Groot", value: "large" },
          ],
          admin: { condition: (_, siblingData) => siblingData?.position !== "full" },
        },
      ],
    },
    { name: "parallax", type: "checkbox", label: "Beeld beweegt mee bij scrollen", defaultValue: true },
    { name: "caption", type: "text", label: "Onderschrift (optioneel)" },
    styleField,
  ],
};