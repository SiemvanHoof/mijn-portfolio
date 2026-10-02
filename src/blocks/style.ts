import type { Field } from "payload";

// Stijlkeuzes die elke sectie krijgt
export const styleField: Field = {
  name: "style",
  type: "group",
  label: "Stijl",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "background",
          type: "select",
          label: "Achtergrond",
          defaultValue: "default",
          options: [
            { label: "Standaard (volgt licht/donker)", value: "default" },
            { label: "Grijs", value: "surface" },
            { label: "Altijd zwart", value: "dark" },
            { label: "Altijd wit", value: "light" },
          ],
        },
        {
          name: "spacing",
          type: "select",
          label: "Ruimte boven en onder",
          defaultValue: "normal",
          options: [
            { label: "Klein", value: "small" },
            { label: "Normaal", value: "normal" },
            { label: "Groot", value: "large" },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "borderTop", type: "checkbox", label: "Lijn erboven", defaultValue: false },
        { name: "animate", type: "checkbox", label: "Animatie", defaultValue: true },
      ],
    },
  ],
};