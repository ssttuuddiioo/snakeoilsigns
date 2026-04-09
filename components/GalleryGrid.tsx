"use client";

import Image from "next/image";
import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import Lightbox from "./Lightbox";

export interface GalleryProject {
  _id: string;
  title: string;
  client?: string;
  category?: string;
  featuredImage?: any;
  galleryImages?: { image: any; caption?: string }[];
  externalUrl?: string;
}

interface GalleryGridProps {
  projects: GalleryProject[];
  columns?: 2 | 3;
}

export default function GalleryGrid({ projects, columns = 3 }: GalleryGridProps) {
  const [lightboxProject, setLightboxProject] = useState<GalleryProject | null>(null);

  const colClass =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      {projects.length > 0 ? (
        <div className={`grid ${colClass} gap-4 md:gap-5`}>
          {projects.map((project) => (
            <button
              key={project._id}
              onClick={() => setLightboxProject(project)}
              className="group relative aspect-[4/3] overflow-hidden bg-border text-left"
            >
              {project.featuredImage ? (
                <Image
                  src={urlFor(project.featuredImage).width(800).quality(75).url()}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes={
                    columns === 2
                      ? "(max-width: 640px) 100vw, 50vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted text-sm">No image</span>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/60 transition-colors duration-300 flex items-center justify-center">
                <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
                  <p className="font-display text-lg md:text-xl uppercase tracking-display text-white">
                    {project.title}
                  </p>
                  {project.client && (
                    <p className="text-white/70 text-sm mt-1">{project.client}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] bg-border flex items-center justify-center"
            >
              <span className="text-muted text-sm">No projects yet</span>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxProject && (
        <Lightbox
          project={lightboxProject}
          onClose={() => setLightboxProject(null)}
        />
      )}
    </>
  );
}
