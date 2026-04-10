import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import path from "path";

const client = createClient({
  projectId: "fix50z8g",
  dataset: "production",
  apiVersion: "2024-01-01",
  token:
    "sks9jG030q2OjWgapuAOO8xaClMvv1pcCbTjpoPqNWFZPuFcJIx3J1cFEvTON2Gcj1qowfsYc5wIIQyF35iXPAdMOJvsqDzFjzD0X57iu5kLmdmbYuusXbbisgJozT1rubsxrJiOxY9RwN23inaK6zr0rgQijDFO7nb4Q4COh21v4QQdIsUY",
  useCdn: false,
});

const IMAGES_DIR = path.resolve("images/oil-paintings");

async function uploadImage(filePath) {
  const stream = createReadStream(filePath);
  const asset = await client.assets.upload("image", stream, {
    filename: path.basename(filePath),
  });
  console.log(`  Uploaded ${path.basename(filePath)} -> ${asset._id}`);
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function seed() {
  console.log("Uploading oil painting images...");

  const paintingImages = [];
  for (let i = 1; i <= 5; i++) {
    const num = String(i).padStart(2, "0");
    const img = await uploadImage(path.join(IMAGES_DIR, `painting_${num}.jpg`));
    paintingImages.push(img);
  }

  console.log("\nCreating 5 oil painting projects...");

  const projects = [
    {
      title: "Still Life with Bottles and Citrus",
      client: "Private Collection",
      category: "Oil Painting",
      shortDescription:
        "A classical still life arrangement exploring light and texture through glass, ceramic, and fruit. Oil on linen, 24 x 30 inches.",
      date: "2024-09-12",
      orderRank: 1,
    },
    {
      title: "Portrait Commission — The Architect",
      client: "Morrison & Partners",
      category: "Oil Painting",
      shortDescription:
        "Commissioned portrait of firm founder David Morrison, rendered in a contemporary realist style with warm, muted earth tones. Oil on panel, 36 x 48 inches.",
      date: "2024-05-03",
      orderRank: 2,
    },
    {
      title: "Golden Hour on Sixth Street",
      client: "Galleria Moderna",
      category: "Oil Painting",
      shortDescription:
        "An urban landscape capturing the fleeting warmth of late afternoon light across downtown facades. Oil on canvas, 30 x 40 inches.",
      date: "2024-01-18",
      orderRank: 3,
    },
    {
      title: "Study of Hands (After Sargent)",
      client: "Private Collection",
      category: "Oil Painting",
      shortDescription:
        "An intimate figure study paying homage to John Singer Sargent's gestural brushwork. Alla prima technique, oil on linen panel, 16 x 20 inches.",
      date: "2023-10-07",
      orderRank: 4,
    },
    {
      title: "Overcast, Pacific Coast Highway",
      client: "Linden Gallery",
      category: "Oil Painting",
      shortDescription:
        "Plein air seascape painted on location along the Malibu coastline. Layered glazes over impasto passages evoke the weight of marine fog. Oil on canvas, 24 x 36 inches.",
      date: "2023-06-22",
      orderRank: 5,
    },
  ];

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const slug = p.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const doc = await client.create({
      _type: "project",
      ...p,
      slug: { _type: "slug", current: slug },
      featuredImage: paintingImages[i],
    });
    console.log(`  Created project: ${doc.title} (${doc._id})`);
  }

  console.log("\nDone! 5 oil painting projects seeded.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
