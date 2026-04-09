import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Home Page")
                .child(
                  S.document().schemaType("homePage").documentId("homePage")
                ),
              S.listItem()
                .title("About Page")
                .child(
                  S.document().schemaType("aboutPage").documentId("aboutPage")
                ),
              S.listItem()
                .title("Workshops Page")
                .child(
                  S.document()
                    .schemaType("workshopsPage")
                    .documentId("workshopsPage")
                ),
              S.listItem()
                .title("Contact Page")
                .child(
                  S.document()
                    .schemaType("contactPage")
                    .documentId("contactPage")
                ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Projects")
        .child(S.documentTypeList("project").title("Projects")),
    ]);
