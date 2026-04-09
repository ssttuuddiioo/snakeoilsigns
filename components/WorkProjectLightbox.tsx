"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";
import type { GalleryProject } from "./GalleryGrid";

interface WorkProjectLightboxProps {
  project: GalleryProject;
  children: React.ReactNode;
}

export default function WorkProjectLightbox({
  project,
  children,
}: WorkProjectLightboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setOpen(true)}>
        {children}
      </div>
      {open && <Lightbox project={project} onClose={() => setOpen(false)} />}
    </>
  );
}
