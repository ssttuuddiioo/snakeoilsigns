import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./schemas/siteSettings";
import { homePage } from "./schemas/homePage";
import { project } from "./schemas/project";
import { aboutPage } from "./schemas/aboutPage";
import { workshopsPage } from "./schemas/workshopsPage";
import { contactPage } from "./schemas/contactPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, homePage, project, aboutPage, workshopsPage, contactPage],
};
