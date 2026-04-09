import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { homePageQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import HeroSlideshow from "@/components/HeroSlideshow";
import ProjectCard from "@/components/ProjectCard";
import ClientMarquee from "@/components/ClientMarquee";
import NewsletterForm from "@/components/NewsletterForm";
import FadeIn from "@/components/FadeIn";

async function getHomeData() {
  try {
    const [home, settings] = await Promise.all([
      client.fetch(homePageQuery),
      client.fetch(siteSettingsQuery),
    ]);
    return { home, settings };
  } catch {
    return { home: null, settings: null };
  }
}

const DEFAULT_INTRO =
  "Snake Oil Signs has over a decade of experience creating expert hand painted murals and signage. With work spanning across the United States, we would be happy to offer our paint services to you and your brand. More Passion, more paint.";

export default async function HomePage() {
  const { home, settings } = await getHomeData();

  const selectedProjects = home?.selectedProjects || [];
  const introText = home?.introDescription;

  return (
    <>
      {/* Hero Slideshow */}
      <HeroSlideshow
        projects={selectedProjects}
        tagline={home?.heroTagline || "Snake Oil Signs"}
      />

      {/* Selected Work */}
      <section className="bg-ink py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <FadeIn>
            <div className="flex items-center gap-6 mb-16 md:mb-24">
              <h2 className="font-display text-xs tracking-[0.2em] uppercase text-white/40">
                Selected Work
              </h2>
              <div className="flex-1 h-px bg-white/10" />
            </div>
          </FadeIn>

          {selectedProjects.length > 0 ? (
            <div className="space-y-20 md:space-y-32">
              {selectedProjects.map((project: any, i: number) => (
                <FadeIn key={project._id} delay={i * 80}>
                  <ProjectCard
                    title={project.title}
                    client={project.client}
                    shortDescription={project.shortDescription}
                    featuredImage={project.featuredImage}
                    externalUrl={project.externalUrl}
                    index={i}
                    dark
                  />
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="space-y-20 md:space-y-32">
              {[1, 2, 3].map((i) => (
                <FadeIn key={i} delay={(i - 1) * 80}>
                  <ProjectCard
                    title={`Project ${i}`}
                    client="Client Name"
                    shortDescription="Add projects in Sanity Studio to see them here."
                    index={i - 1}
                    dark
                  />
                </FadeIn>
              ))}
            </div>
          )}

          <FadeIn>
            <div className="mt-20 md:mt-28 text-center">
              <Link
                href="/work"
                className="inline-flex items-center gap-3 font-display text-sm tracking-[0.15em] uppercase text-rust hover:text-rust-light transition-colors group"
              >
                View all murals
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Client Marquee */}
      <ClientMarquee clients={home?.clientList} />

      {/* Brief About / CTA */}
      <section className="py-24 md:py-36 px-6 md:px-12">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            {introText ? (
              <div className="text-ink/80 text-lg md:text-xl leading-[1.7] prose prose-neutral prose-lg mx-auto">
                <PortableText value={introText} />
              </div>
            ) : (
              <p className="text-ink/80 text-lg md:text-xl leading-[1.7]">
                {DEFAULT_INTRO}
              </p>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 mt-10 px-8 py-4 bg-rust text-white text-sm font-display tracking-[0.15em] uppercase hover:bg-rust-dark transition-colors group"
            >
              Get a Quote
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-ink">
        <FadeIn>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-sm tracking-[0.15em] uppercase text-white mb-2">
              {settings?.newsletterHeading || "Subscribe"}
            </h2>
            <p className="text-white/40 text-sm mb-6">
              {settings?.newsletterDescription ||
                "Get updates on workshops and recent projects"}
            </p>
            <NewsletterForm dark />
          </div>
        </FadeIn>
      </section>
    </>
  );
}
