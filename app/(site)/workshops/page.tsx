import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { workshopsPageQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import FadeIn from "@/components/FadeIn";

const DEFAULT_SKILL_LEVELS = [
  {
    level: "Beginner",
    description:
      "3-day course, 9am\u20135pm daily. Learn the fundamentals of blending with enamel paint, from basic techniques to bottles and cans. Starting at $1,500.",
  },
  {
    level: "Journeyman",
    description:
      "For painters with foundational experience. Advance into faces, hands, and complex compositions. Pricing varies \u2014 reach out for details.",
  },
  {
    level: "Expert",
    description:
      "Refine your craft at the highest level. Focused sessions on photorealism, gold leaf, and large-scale technique. Pricing varies \u2014 reach out for details.",
  },
];

async function getData() {
  try {
    const [workshops, settings] = await Promise.all([
      client.fetch(workshopsPageQuery),
      client.fetch(siteSettingsQuery),
    ]);
    return { workshops, email: settings?.contactEmail };
  } catch {
    return { workshops: null, email: null };
  }
}

export const metadata = {
  title: "Workshops \u2014 Snake Oil Signs",
  description:
    "Learn mural painting and sign painting from an expert. Beginner to expert courses available. Starting at $1,500.",
};

export default async function WorkshopsPage() {
  const { workshops } = await getData();
  const skillLevels = workshops?.skillLevels?.length
    ? workshops.skillLevels
    : DEFAULT_SKILL_LEVELS;
  const heroImage = workshops?.images?.[0];

  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-36 px-6 md:px-10 max-w-content mx-auto">
      {/* Header */}
      <FadeIn>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide text-ink leading-[1.1]">
          Workshops
        </h1>
      </FadeIn>

      {/* Hero image */}
      {heroImage && (
        <FadeIn delay={100}>
          <div className="relative mt-10 aspect-[16/7] overflow-hidden bg-border">
            <Image
              src={urlFor(heroImage).width(1400).quality(80).url()}
              alt="Workshop"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1280px"
            />
          </div>
        </FadeIn>
      )}

      {/* Description */}
      <FadeIn delay={150}>
        <div className="mt-14 md:mt-20 max-w-2xl">
          {workshops?.description ? (
            <div className="text-ink/80 text-base md:text-lg leading-[1.7] prose prose-neutral">
              <PortableText value={workshops.description} />
            </div>
          ) : (
            <p className="text-ink/80 text-base md:text-lg leading-[1.7]">
              We provide workshops to teach muralists and signpainters the craft.
              From beginners to experts, we love to talk and teach paint. Focus
              areas include blending with enamel paint, from basic techniques to
              bottles, cans, faces, and hands.
            </p>
          )}
        </div>
      </FadeIn>

      {/* Skill Levels */}
      <section className="mt-20 md:mt-28">
        <FadeIn>
          <div className="flex items-center gap-4 mb-12 md:mb-14">
            <h2 className="font-display text-xs tracking-display uppercase text-muted whitespace-nowrap">
              Course Levels
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {skillLevels.map((level: any, i: number) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="border border-border p-6 md:p-8">
                <h3 className="font-display text-lg tracking-display uppercase text-ink mb-3">
                  {level.level}
                </h3>
                <p className="text-sm text-ink/60 leading-relaxed">
                  {level.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Workshop images strip */}
      {workshops?.images && workshops.images.length > 1 && (
        <FadeIn>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3">
            {workshops.images.slice(1, 5).map((img: any, i: number) => (
              <div key={i} className="relative aspect-square overflow-hidden bg-border">
                <Image
                  src={urlFor(img).width(400).quality(75).url()}
                  alt={`Workshop photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {/* CTA */}
      <FadeIn>
        <div className="mt-20 md:mt-24 text-center">
          <p className="text-ink/70 text-base mb-4">
            {workshops?.ctaText || "Interested? Let\u2019s set up a class."}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-display text-sm tracking-display uppercase text-rust hover:text-rust-dark transition-colors group"
          >
            Get in Touch
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
