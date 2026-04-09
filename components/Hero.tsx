import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface HeroProps {
  image?: any;
  tagline?: string;
  subtitle?: string;
}

export default function Hero({ image, tagline, subtitle }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      {image ? (
        <Image
          src={urlFor(image).width(1920).quality(85).url()}
          alt="Snake Oil Signs"
          fill
          priority
          className="object-cover animate-slow-zoom"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-ink" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-10 max-w-content mx-auto left-0 right-0">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase leading-[1.1] tracking-wide max-w-4xl">
          {tagline || "Los Angeles based, nationally mobile."}
        </h1>
        {subtitle && (
          <p className="mt-4 text-white/70 text-base md:text-lg max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-white/40" />
      </div>
    </section>
  );
}
