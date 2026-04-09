import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import {
  projectBySlugQuery,
  allProjectSlugsQuery,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import FadeIn from "@/components/FadeIn";

export async function generateStaticParams() {
  const slugs = await client.fetch(allProjectSlugsQuery);
  return (slugs || []).map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client.fetch(projectBySlugQuery, { slug });
  if (!project) return { title: "Project \u2014 Snake Oil Signs" };
  return {
    title: `${project.title} \u2014 Snake Oil Signs`,
    description: project.shortDescription || `${project.title} by Snake Oil Signs`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client.fetch(projectBySlugQuery, { slug });

  if (!project) notFound();

  const galleryImages = project.galleryImages || [];

  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-36">
      {/* Back link */}
      <div className="px-6 md:px-12 max-w-content mx-auto mb-10">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-display tracking-[0.1em] uppercase text-ink/40 hover:text-ink transition-colors"
        >
          &larr; All Murals
        </Link>
      </div>

      {/* Title + Short description */}
      <div className="px-6 md:px-12 max-w-content mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 md:gap-16 items-start">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-ink leading-[0.95]">
              {project.title}
            </h1>
            {project.shortDescription && (
              <p className="text-ink/60 text-sm md:text-base leading-relaxed md:pt-3 max-w-lg">
                {project.shortDescription}
              </p>
            )}
          </div>
        </FadeIn>
      </div>

      {/* Featured image — full bleed */}
      <FadeIn>
        <div className="mt-12 md:mt-16 px-6 md:px-12 max-w-content mx-auto">
          {project.featuredImage && (
            <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
              <Image
                src={urlFor(project.featuredImage).width(1600).quality(85).url()}
                alt={project.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1400px"
              />
            </div>
          )}
        </div>
      </FadeIn>

      {/* Client + Category + Description block */}
      <div className="mt-16 md:mt-24 px-6 md:px-12 max-w-content mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-16">
            {/* Left: big client name */}
            <div>
              {project.client && (
                <h2 className="font-display text-3xl md:text-4xl font-bold text-ink leading-[1.05]">
                  {project.client}
                </h2>
              )}
              <div className="mt-4 space-y-1.5">
                {project.category && (
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-ink/30 font-display">
                      Type
                    </span>
                    <span className="text-sm font-bold text-ink">
                      {project.category}
                    </span>
                  </div>
                )}
                {project.date && (
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-ink/30 font-display">
                      Date
                    </span>
                    <span className="text-sm font-bold text-ink">
                      {new Date(project.date).getFullYear()}
                    </span>
                  </div>
                )}
                {project.externalUrl && (
                  <div className="mt-4">
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-display tracking-[0.1em] uppercase text-rust hover:text-rust-dark transition-colors group"
                    >
                      Visit
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        &nearr;
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Right: extended description */}
            <div>
              {project.shortDescription && (
                <p className="text-ink/70 text-base md:text-lg leading-[1.7]">
                  {project.shortDescription}
                </p>
              )}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Gallery images — staggered grid */}
      {galleryImages.length > 0 && (
        <div className="mt-16 md:mt-24 px-6 md:px-12 max-w-content mx-auto">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {galleryImages.map((gi: any, i: number) => {
              // Staggered: first image left-aligned, second right-aligned + offset, etc.
              const isLeft = i % 3 !== 1;
              const isWide = i % 3 === 2;

              return (
                <FadeIn
                  key={i}
                  delay={i * 60}
                  className={`${
                    isWide
                      ? "col-span-1"
                      : i % 3 === 1
                      ? "col-start-2"
                      : "col-start-1"
                  }`}
                >
                  <div
                    className={`relative overflow-hidden bg-ink/5 ${
                      isLeft ? "aspect-[4/5]" : "aspect-[3/4]"
                    }`}
                  >
                    {gi.image && (
                      <Image
                        src={urlFor(gi.image).width(800).quality(80).url()}
                        alt={gi.caption || `${project.title} ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 40vw"
                      />
                    )}
                  </div>
                  {gi.caption && (
                    <p className="mt-2 text-xs text-ink/40">{gi.caption}</p>
                  )}
                </FadeIn>
              );
            })}
          </div>
        </div>
      )}

      {/* Next project / back to work */}
      <FadeIn>
        <div className="mt-24 md:mt-32 px-6 md:px-12 max-w-content mx-auto text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-3 font-display text-sm tracking-[0.15em] uppercase text-rust hover:text-rust-dark transition-colors group"
          >
            &larr; Back to all murals
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
