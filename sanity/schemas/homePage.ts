import { defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "string",
    }),
    defineField({
      name: "introDescription",
      title: "Intro Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "selectedProjects",
      title: "Selected Projects",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
    }),
    defineField({
      name: "clientList",
      title: "Client List",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
