import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { allProjectsQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import WorkGallery from "@/components/WorkGallery";
import FadeIn from "@/components/FadeIn";

const COMMISSION_STEPS = [
  { num: "01", title: "Consultation", desc: "Initial consultation and quote" },
  { num: "02", title: "Brainstorm", desc: "Brainstorming session" },
  { num: "03", title: "Planning", desc: "Collaborative planning for due date" },
  { num: "04", title: "Creation", desc: "Custom 1-of-a-kind painting" },
  { num: "05", title: "Medium", desc: "Traditional oils or fast drying enamels" },
  { num: "06", title: "Delivery", desc: "Shipping or in-town delivery" },
];

async function getData() {
  try {
    const [projects, settings] = await Promise.all([
      client.fetch(allProjectsQuery),
      client.fetch(siteSettingsQuery),
    ]);
    const oilPaintings = (projects || []).filter(
      (p: any) => p.category === "Oil Painting"
    );
    return { oilPaintings, email: settings?.contactEmail };
  } catch {
    return { oilPaintings: [], email: null };
  }
}

export const metadata = {
  title: "Oil Paintings — Snake Oil Signs",
  description:
    "Commission your own personal oil painting. Traditional oils or fast drying enamels, shipped or delivered.",
};

export default async function OilPaintingsPage() {
  const { oilPaintings, email } = await getData();
  const contactEmail = email || "snakeoilsigns@gmail.com";

  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-36">
      {/* Header */}
      <div className="px-6 md:px-10 max-w-content mx-auto">
        <FadeIn>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide text-ink leading-[1.1]">
            Oil Paintings
          </h1>
          <p className="mt-3 text-ink/60 text-base md:text-lg">
            Commission your own personal painting
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 mt-5 px-6 py-3 bg-ink text-cream text-sm font-display tracking-wider uppercase hover:bg-ink/85 transition-colors"
          >
            Inquire Now
          </a>
        </FadeIn>
      </div>

      {/* Gallery */}
      <FadeIn delay={150}>
        <div className="mt-16 md:mt-24 px-6 md:px-10 max-w-content mx-auto">
          <WorkGallery projects={oilPaintings} columns={2} showFilter={false} />
        </div>
      </FadeIn>

      {/* Commission Process */}
      <section className="mt-28 md:mt-36 px-6 md:px-10 max-w-content mx-auto">
        <FadeIn>
          <div className="flex items-center gap-4 mb-14 md:mb-16">
            <h2 className="font-display text-xs tracking-display uppercase text-muted whitespace-nowrap">
              Commission Process
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {COMMISSION_STEPS.map((step, i) => (
            <FadeIn key={step.num} delay={i * 80}>
              <div>
                <span className="font-display text-3xl md:text-4xl text-border font-semibold">
                  {step.num}
                </span>
                <h3 className="font-display text-sm tracking-display uppercase text-ink mt-3 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-ink/60 leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-20 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-display text-sm tracking-display uppercase text-rust hover:text-rust-dark transition-colors group"
            >
              Get a Quote for Your Painting
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
