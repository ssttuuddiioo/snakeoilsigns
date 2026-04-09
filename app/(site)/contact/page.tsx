import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { contactPageQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/FadeIn";

const DEFAULT_DESCRIPTION =
  "With 10 years of experience in the sign painting industry, painting everything from eleven story tall photorealistic murals, to ornate gold leaf on glass, we\u2019d love to add our hand painted murals or signage to your wall. Whether it\u2019s a logo, text, or photorealism, we\u2019re happy to offer you a cost breakdown of what it would take to get your image painted in whatever location on whatever surface. The more information you provide here, the more accurate the quote will be.";

async function getData() {
  try {
    const [contact, settings] = await Promise.all([
      client.fetch(contactPageQuery),
      client.fetch(siteSettingsQuery),
    ]);
    return { contact, settings };
  } catch {
    return { contact: null, settings: null };
  }
}

export const metadata = {
  title: "Contact \u2014 Snake Oil Signs",
  description:
    "Get a quote for your mural, sign, or painting. Hand-painted by Snake Oil Signs.",
};

export default async function ContactPage() {
  const { contact, settings } = await getData();

  const contactEmail = settings?.contactEmail || "snakeoilsigns@gmail.com";
  const contactPhone = settings?.contactPhone || "678-925-1188";
  const instagramUrl =
    settings?.instagramUrl || "https://www.instagram.com/snakeoilsigns";

  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-36 px-6 md:px-10 max-w-content mx-auto">
      {/* Header */}
      <FadeIn>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide text-ink leading-[1.1]">
          Get a Quote
        </h1>
        <p className="mt-2 text-ink/60 text-lg md:text-xl leading-relaxed">
          Tall or small, we&apos;ll paint it all.
        </p>
        <p className="mt-4 text-sm text-ink/60 leading-[1.7] max-w-2xl">
          {contact?.description || DEFAULT_DESCRIPTION}
        </p>
      </FadeIn>

      {/* Two columns */}
      <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16">
        {/* Left: Form */}
        <FadeIn delay={100}>
          <ContactForm successMessage={contact?.successMessage} />
        </FadeIn>

        {/* Right: Image + Contact info */}
        <FadeIn delay={200}>
          <div className="space-y-8">
            {contact?.featuredImage && (
              <div className="relative aspect-[4/3] overflow-hidden bg-border">
                <Image
                  src={urlFor(contact.featuredImage).width(800).quality(80).url()}
                  alt="Snake Oil Signs"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}

            <div className="space-y-4">
              <h3 className="font-display text-xs tracking-display uppercase text-muted">
                Direct Contact
              </h3>
              <ul className="space-y-2.5 text-sm text-ink/70">
                <li>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="hover:text-ink transition-colors"
                  >
                    {contactEmail}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${contactPhone}`}
                    className="hover:text-ink transition-colors"
                  >
                    {contactPhone}
                  </a>
                </li>
                <li>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink transition-colors"
                  >
                    @snakeoilsigns
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
