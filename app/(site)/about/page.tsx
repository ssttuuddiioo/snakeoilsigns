import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import VideoEmbed from "@/components/VideoEmbed";
import CleanVideo from "@/components/CleanVideo";
import FadeIn from "@/components/FadeIn";

const DEFAULT_VIDEO_ID = "eCO_i8ORwHo";

const DEFAULT_EXPERIENCE = [
  {
    role: "Expert Muralist & Suspended Scaffolding Supervisor",
    company: "Colossal Media (NYC/LA)",
    startDate: "03/2015",
    endDate: "03/2025",
    description: "",
  },
];

const DEFAULT_EDUCATION = [
  {
    degree: "MSc Medical Anthropology and Sociology",
    school: "Universiteit van Amsterdam",
    year: "2013",
  },
  {
    degree: "BA Anthropology",
    school: "Georgia State University",
    year: "2012",
  },
];

const DEFAULT_TRAINING = "Gold Leaf Workshop with Dave Smith \u2014 Torquay, UK (10/2021)";

async function getData() {
  try {
    return await client.fetch(aboutPageQuery);
  } catch {
    return null;
  }
}

export const metadata = {
  title: "About \u2014 Snake Oil Signs",
  description:
    "10+ years of experience in hand-painted murals and signage. Formerly at Colossal Media in NYC and LA.",
};

export default async function AboutPage() {
  const about = await getData();
  const experience = about?.experienceEntries?.length
    ? about.experienceEntries
    : DEFAULT_EXPERIENCE;
  const education = about?.educationEntries?.length
    ? about.educationEntries
    : DEFAULT_EDUCATION;

  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-36">
      {/* Video — full width above everything */}
      <FadeIn>
        <div className="px-6 md:px-10 max-w-content mx-auto mb-16 md:mb-24">
          <CleanVideo youtubeId={DEFAULT_VIDEO_ID} />
        </div>
      </FadeIn>

      {/* Bio section: two columns */}
      <div className="px-6 md:px-10 max-w-content mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Photo */}
        <FadeIn>
          <div className="relative aspect-[3/4] overflow-hidden bg-border">
            {about?.heroImage ? (
              <Image
                src={urlFor(about.heroImage).width(800).quality(80).url()}
                alt={about.heading || "About Snake Oil Signs"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-muted text-sm">Photo coming soon</span>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Bio text */}
        <FadeIn delay={150}>
          <div>
            <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-ink leading-[1.1] mb-8">
              {about?.heading || "About"}
            </h1>
            {about?.bio ? (
              <div className="text-ink/80 text-base leading-[1.7] prose prose-neutral">
                <PortableText value={about.bio} />
              </div>
            ) : (
              <p className="text-ink/80 text-base leading-[1.7]">
                Snake Oil Signs has over a decade of experience creating expert
                hand painted murals and signage. With work spanning across the
                United States, we bring more passion and more paint to every
                project.
              </p>
            )}
          </div>
        </FadeIn>
      </div>

      {/* Experience */}
      <section className="mt-24 md:mt-32">
        <FadeIn>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-xs tracking-display uppercase text-muted whitespace-nowrap">
              Experience
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeIn>

        <div className="space-y-8">
          {experience.map((entry: any, i: number) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-2 md:gap-8">
                <p className="text-sm text-muted">
                  {entry.startDate}
                  {entry.endDate ? ` \u2013 ${entry.endDate}` : " \u2013 Present"}
                </p>
                <div>
                  <h3 className="text-base text-ink font-medium">{entry.role}</h3>
                  <p className="text-sm text-ink/60 mt-0.5">{entry.company}</p>
                  {entry.description && (
                    <p className="text-sm text-ink/60 mt-2 leading-relaxed">
                      {entry.description}
                    </p>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-20 md:mt-24">
        <FadeIn>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-xs tracking-display uppercase text-muted whitespace-nowrap">
              Education
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeIn>

        <div className="space-y-6">
          {education.map((entry: any, i: number) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-2 md:gap-8">
                <p className="text-sm text-muted">{entry.year}</p>
                <div>
                  <h3 className="text-base text-ink font-medium">{entry.degree}</h3>
                  <p className="text-sm text-ink/60 mt-0.5">{entry.school}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Training */}
      <section className="mt-20 md:mt-24">
        <FadeIn>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-xs tracking-display uppercase text-muted whitespace-nowrap">
              Training
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-base text-ink">{DEFAULT_TRAINING}</p>
        </FadeIn>
      </section>
      </div>
    </div>
  );
}
