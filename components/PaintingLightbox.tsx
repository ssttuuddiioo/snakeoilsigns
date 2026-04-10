"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { urlFor } from "@/sanity/lib/image";

export interface PaintingItem {
  _id: string;
  title: string;
  client?: string;
  shortDescription?: string;
  featuredImage?: any;
}

interface PaintingLightboxProps {
  paintings: PaintingItem[];
  initialIndex: number;
  onClose: () => void;
}

export default function PaintingLightbox({
  paintings,
  initialIndex,
  onClose,
}: PaintingLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const total = paintings.length;
  const painting = paintings[index];

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  const goTo = useCallback(
    (newIndex: number, dir: "left" | "right") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);
      // After exit animation, swap and enter
      setTimeout(() => {
        setIndex(newIndex);
        setDirection(dir === "left" ? "right" : "left");
        setTimeout(() => {
          setDirection(null);
          setIsAnimating(false);
        }, 20);
      }, 280);
    },
    [isAnimating]
  );

  const goNext = useCallback(() => {
    if (total <= 1) return;
    goTo((index + 1) % total, "left");
  }, [index, total, goTo]);

  const goPrev = useCallback(() => {
    if (total <= 1) return;
    goTo((index - 1 + total) % total, "right");
  }, [index, total, goTo]);

  // Fade in on mount
  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose, goNext, goPrev]);

  // Touch
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  // Slide transform
  const slideTransform = direction === "left"
    ? "translate-x-[-40px] opacity-0"
    : direction === "right"
    ? "translate-x-[40px] opacity-0"
    : "translate-x-0 opacity-100";

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Backdrop — fully opaque white */}
      <div
        className="absolute inset-0 bg-white"
        onClick={handleClose}
      />

      {/* Close */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-ink/70 hover:text-ink transition-colors"
        aria-label="Close"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-7 left-6 z-10 text-xs text-muted tracking-widest">
        {index + 1} / {total}
      </div>

      {/* Prev arrow */}
      {total > 1 && (
        <button
          onClick={goPrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center text-ink/50 hover:text-ink transition-colors"
          aria-label="Previous"
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Next arrow */}
      {total > 1 && (
        <button
          onClick={goNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center text-ink/50 hover:text-ink transition-colors"
          aria-label="Next"
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Centered content — absolute center of viewport */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-6xl w-full px-16 md:px-24 transition-all duration-280 ease-out ${slideTransform}`}
        >
          {/* Image */}
          <div className="flex-shrink-0 w-full md:w-[58%] flex items-center justify-center" style={{ maxHeight: "75vh" }}>
            {painting.featuredImage ? (
              <Image
                src={urlFor(painting.featuredImage).width(1200).quality(90).url()}
                alt={painting.title}
                width={1200}
                height={1600}
                className="max-h-[70vh] w-auto object-contain"
                sizes="(max-width: 768px) 90vw, 55vw"
                priority
              />
            ) : (
              <div className="w-full aspect-[3/4] bg-neutral-100 flex items-center justify-center">
                <span className="text-muted text-sm">No image</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 md:max-w-xs">
            <h2 className="font-display text-lg md:text-xl uppercase tracking-wide text-ink leading-tight">
              {painting.title}
            </h2>
            {painting.client && (
              <p className="text-muted text-sm mt-2">{painting.client}</p>
            )}
            {painting.shortDescription && (
              <p className="text-ink/60 text-sm leading-relaxed mt-4">
                {painting.shortDescription}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
