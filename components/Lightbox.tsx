"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { urlFor } from "@/sanity/lib/image";
import type { GalleryProject } from "./GalleryGrid";

interface LightboxProps {
  project: GalleryProject;
  onClose: () => void;
}

export default function Lightbox({ project, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const touchStartX = useRef(0);

  // Build images array: gallery images, or just the featured image
  const images =
    project.galleryImages && project.galleryImages.length > 0
      ? project.galleryImages.map((gi) => ({
          src: gi.image,
          caption: gi.caption,
        }))
      : project.featuredImage
      ? [{ src: project.featuredImage, caption: undefined }]
      : [];

  const total = images.length;

  const goNext = useCallback(() => {
    if (total > 1) setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    if (total > 1) setCurrentIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  // Fade in on mount
  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose, goNext, goPrev]);

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

  if (images.length === 0) return null;

  const current = images[currentIndex];

  return (
    <div
      className={`fixed inset-0 z-[60] bg-white transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
        aria-label="Close lightbox"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Counter */}
      {total > 1 && (
        <div className="absolute top-6 left-6 z-10 text-xs text-muted font-display tracking-display">
          {currentIndex + 1} / {total}
        </div>
      )}

      {/* Main image area */}
      <div className="h-full flex flex-col items-center justify-center px-6 py-20 md:px-16">
        <div className="relative w-full max-w-5xl" style={{ maxHeight: "75vh" }}>
          <div className="relative w-full h-0" style={{ paddingBottom: "66.67%" }}>
            {current.src && (
              <Image
                key={currentIndex}
                src={urlFor(current.src).width(1600).quality(85).url()}
                alt={current.caption || project.title}
                fill
                className="object-contain transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            )}
          </div>
        </div>

        {/* Caption area */}
        <div className="mt-6 text-center max-w-xl">
          <div className="flex items-center justify-center gap-2">
            <h3 className="font-display text-sm tracking-display uppercase text-ink">
              {project.title}
            </h3>
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-ink transition-colors"
                aria-label="Open external link"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            )}
          </div>
          {project.client && (
            <p className="text-muted text-xs mt-1">{project.client}</p>
          )}
          {current.caption && (
            <p className="text-ink/60 text-sm mt-2">{current.caption}</p>
          )}
        </div>
      </div>

      {/* Nav arrows */}
      {total > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-ink/40 hover:text-ink transition-colors"
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-ink/40 hover:text-ink transition-colors"
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
