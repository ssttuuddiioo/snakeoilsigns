import { defineType, defineField } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const workshopsPage = defineType({
  name: "workshopsPage",
  title: "Workshops Page",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "skillLevels",
      title: "Skill Levels",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "level", title: "Level", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "level" },
          },
        },
      ],
    }),
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "string",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "string",
    }),
    defineField({
      name: "ctaEmail",
      title: "CTA Email",
      type: "string",
      description: "Defaults to site contact email if left empty",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Workshops Page" };
    },
  },
});
