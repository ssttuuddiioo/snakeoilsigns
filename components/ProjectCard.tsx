import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface ProjectCardProps {
  title: string;
  client?: string;
  shortDescription?: string;
  featuredImage?: any;
  externalUrl?: string;
  index: number;
  dark?: boolean;
}

export default function ProjectCard({
  title,
  client: clientName,
  shortDescription,
  featuredImage,
  externalUrl,
  index,
  dark = false,
}: ProjectCardProps) {
  const isEven = index % 2 === 1;

  const textColor = dark ? "text-white" : "text-ink";
  const mutedColor = dark ? "text-white/40" : "text-muted";
  const descColor = dark ? "text-white/60" : "text-ink/70";
  const arrowColor = dark
    ? "text-rust hover:text-rust-light"
    : "text-ink/70 hover:text-ink";

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center ${
        isEven ? "md:direction-rtl" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`md:col-span-8 overflow-hidden group ${
          isEven ? "md:col-start-5 md:direction-ltr" : "md:direction-ltr"
        }`}
      >
        <div className="relative aspect-[4/3] bg-ink/20">
          {featuredImage ? (
            <Image
              src={urlFor(featuredImage).width(1200).quality(80).url()}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          ) : (
            <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
              <span className={`${mutedColor} text-sm`}>No image</span>
            </div>
          )}
        </div>
      </div>

      {/* Text */}
      <div
        className={`md:col-span-4 ${
          isEven ? "md:col-start-1 md:row-start-1 md:direction-ltr" : "md:direction-ltr"
        }`}
      >
        {clientName && (
          <p className={`font-display text-[10px] tracking-[0.2em] uppercase ${mutedColor} mb-3`}>
            {clientName}
          </p>
        )}
        <h3 className={`font-display text-2xl md:text-3xl uppercase tracking-tight font-bold ${textColor} leading-[1.05]`}>
          {title}
        </h3>
        {shortDescription && (
          <p className={`mt-3 text-sm ${descColor} leading-relaxed`}>
            {shortDescription}
          </p>
        )}
        {externalUrl && (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 mt-5 text-sm font-display tracking-[0.1em] uppercase ${arrowColor} transition-colors group/link`}
          >
            View
            <span className="transition-transform duration-200 group-hover/link:translate-x-1">
              &rarr;
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
