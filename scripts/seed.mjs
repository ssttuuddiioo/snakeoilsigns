import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import path from "path";

const client = createClient({
  projectId: "fix50z8g",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const IMAGES_DIR = path.resolve("images");

async function uploadImage(filePath) {
  const stream = createReadStream(filePath);
  const asset = await client.assets.upload("image", stream, {
    filename: path.basename(filePath),
  });
  console.log(`  Uploaded ${path.basename(filePath)} -> ${asset._id}`);
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function seed() {
  console.log("Uploading images...");

  // Upload 5 mural images for projects
  const muralImages = [];
  for (let i = 1; i <= 5; i++) {
    const num = String(i).padStart(2, "0");
    const img = await uploadImage(path.join(IMAGES_DIR, "murals", `mural_${num}.jpg`));
    muralImages.push(img);
  }

  // Upload about hero
  const aboutHero = await uploadImage(path.join(IMAGES_DIR, "about", "hero.jpg"));

  // Upload home hero
  const homeHero = await uploadImage(path.join(IMAGES_DIR, "home", "hero.jpg"));

  console.log("\nCreating 5 projects...");

  const projects = [
    {
      title: "Cartier Mural",
      client: "Cartier",
      category: "Mural",
      shortDescription: "Large-scale hand-painted mural for Cartier's flagship retail location.",
      date: "2024-06-15",
      orderRank: 1,
    },
    {
      title: "HBO Campaign Wall",
      client: "HBO",
      category: "Mural",
      shortDescription: "Multi-story promotional mural for a major HBO series premiere in Los Angeles.",
      date: "2024-03-10",
      orderRank: 2,
    },
    {
      title: "Coca-Cola Heritage Sign",
      client: "Coca-Cola",
      category: "Sign Painting",
      shortDescription: "Hand-lettered vintage-style signage paying homage to classic Coca-Cola branding.",
      date: "2023-11-20",
      orderRank: 3,
    },
    {
      title: "Netflix Premiere Mural",
      client: "Netflix",
      category: "Mural",
      shortDescription: "Photorealistic outdoor mural promoting a Netflix original series launch.",
      date: "2023-08-05",
      orderRank: 4,
    },
    {
      title: "Dialog Cafe Gold Leaf",
      client: "Dialog Cafe",
      category: "Gold Leaf",
      shortDescription: "Traditional gold leaf window lettering and ornamental detail for a beloved LA cafe.",
      date: "2023-05-12",
      orderRank: 5,
    },
  ];

  const projectRefs = [];

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const doc = await client.create({
      _type: "project",
      ...p,
      slug: { _type: "slug", current: p.title.toLowerCase().replace(/\s+/g, "-") },
      featuredImage: muralImages[i],
    });
    console.log(`  Created project: ${doc.title} (${doc._id})`);
    projectRefs.push({ _type: "reference", _ref: doc._id, _key: `proj${i}` });
  }

  // Select first 3 projects for the home page
  const selectedRefs = projectRefs.slice(0, 3);

  console.log("\nUpdating home page...");

  // Find existing homePage doc
  const existingHome = await client.fetch(`*[_type == "homePage"][0]._id`);
  if (existingHome) {
    await client.patch(existingHome).set({
      heroImage: homeHero,
      selectedProjects: selectedRefs,
    }).commit();
    console.log(`  Patched home page (${existingHome})`);
  } else {
    const doc = await client.create({
      _type: "homePage",
      heroImage: homeHero,
      heroTagline: "Los Angeles based, nationally mobile.",
      selectedProjects: selectedRefs,
    });
    console.log(`  Created home page (${doc._id})`);
  }

  console.log("\nUpdating about page...");

  const existingAbout = await client.fetch(`*[_type == "aboutPage"][0]._id`);
  if (existingAbout) {
    await client.patch(existingAbout).set({
      heroImage: aboutHero,
    }).commit();
    console.log(`  Patched about page (${existingAbout})`);
  } else {
    const doc = await client.create({
      _type: "aboutPage",
      heading: "About",
      heroImage: aboutHero,
    });
    console.log(`  Created about page (${doc._id})`);
  }

  console.log("\nDone! 5 projects created, home page and about page updated.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
