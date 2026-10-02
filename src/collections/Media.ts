import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Beeld",
    plural: "Media",
  },
  access: {
    // Iedereen mag beelden bekijken, anders kan je website ze niet tonen
    read: () => true,
  },
  upload: {
    // Alleen afbeeldingen en mp4-video's
    mimeTypes: ["image/*", "video/mp4"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt-tekst",
      required: true,
      admin: {
        description: "Korte beschrijving van wat er op het beeld staat. Belangrijk voor schermlezers en Google.",
      },
    },
  ],
};
