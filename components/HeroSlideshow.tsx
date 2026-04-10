"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { urlFor } from "@/sanity/lib/image";

interface SlideProject {
  _id: string;
  title: string;
  client?: string;
  featuredImage?: any;
}

interface HeroSlideshowProps {
  projects: SlideProject[];
  tagline?: string;
  heroImage?: any;
}

export default function HeroSlideshow({ projects, tagline, heroImage }: HeroSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const total = projects.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setPrev(current);
      setCurrent(index);
      // Clear previous after cross-dissolve completes
      timeoutRef.current = setTimeout(() => {
        setPrev(null);
        setIsTransitioning(false);
      }, 1200);
    },
    [isTransitioning, current]
  );

  // Auto-cycle
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      goTo((current + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, total, goTo]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getImageSrc = (index: number) => {
    const p = projects[index];
    if (p?.featuredImage) return urlFor(p.featuredImage).width(1920).quality(85).url();
    if (heroImage) return urlFor(heroImage).width(1920).quality(85).url();
    return null;
  };

  const getImageAlt = (index: number) => {
    return projects[index]?.title || tagline || "Hero";
  };

  const slide = projects[current];

  return (
    <section className="relative h-screen w-full bg-ink overflow-hidden">
      {/* Previous image — fading out underneath */}
      {prev !== null && getImageSrc(prev) && (
        <div className="absolute inset-0 opacity-100">
          <Image
            src={getImageSrc(prev)!}
            alt={getImageAlt(prev)}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      {/* Current image — fading in on top */}
      {getImageSrc(current) && (
        <div
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transitionDuration: isTransitioning ? "0ms" : "1200ms",
          }}
        >
          <Image
            key={current}
            src={getImageSrc(current)!}
            alt={getImageAlt(current)}
            fill
            priority
            className="object-cover animate-slow-zoom"
            sizes="100vw"
          />
        </div>
      )}

      {/* Fallback: heroImage when no projects */}
      {total === 0 && heroImage && (
        <div className="absolute inset-0">
          <Image
            src={urlFor(heroImage).width(1920).quality(85).url()}
            alt={tagline || "Hero"}
            fill
            priority
            className="object-cover animate-slow-zoom"
            sizes="100vw"
          />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-ink/40" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-20 max-w-content mx-auto left-0 right-0">
        {/* Tagline */}
        <div className="mb-8">
          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase leading-[0.95] tracking-tight font-bold"
            style={{ animationDelay: "200ms" }}
          >
            {tagline || "Snake Oil Signs"}
          </h1>
        </div>

        {/* Current project info + nav */}
        <div className="flex items-end justify-between gap-6">
          <div
            className={`transition-all duration-500 ${
              isTransitioning
                ? "opacity-0 translate-y-2"
                : "opacity-100 translate-y-0"
            }`}
          >
            <p className="font-display text-xs tracking-[0.2em] uppercase text-white/50 mb-1">
              {slide?.client || "Featured"}
            </p>
            <p className="font-display text-lg md:text-xl uppercase tracking-wide text-white">
              {slide?.title}
            </p>
          </div>

          {/* Slide indicators */}
          {total > 1 && (
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-0.5 transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-rust"
                      : "w-4 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="w-px h-10 bg-white/20 animate-pulse" />
      </div>
    </section>
  );
}
