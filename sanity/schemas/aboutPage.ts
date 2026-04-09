import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube or Vimeo URL",
    }),
    defineField({
      name: "videoCaption",
      title: "Video Caption",
      type: "string",
    }),
    defineField({
      name: "experienceEntries",
      title: "Experience",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "company", title: "Company", type: "string" }),
            defineField({ name: "startDate", title: "Start Date", type: "string" }),
            defineField({ name: "endDate", title: "End Date", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "role", subtitle: "company" },
          },
        },
      ],
    }),
    defineField({
      name: "educationEntries",
      title: "Education",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "degree", title: "Degree", type: "string" }),
            defineField({ name: "school", title: "School", type: "string" }),
            defineField({ name: "year", title: "Year", type: "string" }),
          ],
          preview: {
            select: { title: "degree", subtitle: "school" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
