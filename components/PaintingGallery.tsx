"use client";

import Image from "next/image";
import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import PaintingLightbox, { type PaintingItem } from "./PaintingLightbox";

interface PaintingGalleryProps {
  paintings: PaintingItem[];
}

export default function PaintingGallery({ paintings }: PaintingGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (paintings.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-14">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-[3/4] bg-neutral-50 border border-neutral-100" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-14">
        {paintings.map((painting, i) => (
          <button
            key={painting._id}
            onClick={() => setLightboxIndex(i)}
            className="group text-left focus:outline-none"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] bg-neutral-50 overflow-hidden">
              {painting.featuredImage ? (
                <Image
                  src={urlFor(painting.featuredImage).width(700).quality(80).url()}
                  alt={painting.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 45vw, 30vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted text-xs">No image</span>
                </div>
              )}
              {/* Subtle shadow on hover */}
              <div className="absolute inset-0 shadow-none group-hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.15)] transition-shadow duration-500 pointer-events-none" />
            </div>

            {/* Label below image */}
            <div className="mt-4">
              <h3 className="font-display text-xs tracking-[0.12em] uppercase text-ink group-hover:text-ink/70 transition-colors">
                {painting.title}
              </h3>
              {painting.client && (
                <p className="text-muted text-xs mt-1">{painting.client}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <PaintingLightbox
          paintings={paintings}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
