"use client";

import { useState } from "react";
import FilterBar from "./FilterBar";
import GalleryGrid, { type GalleryProject } from "./GalleryGrid";

interface WorkGalleryProps {
  projects: GalleryProject[];
  columns?: 2 | 3;
  showFilter?: boolean;
}

export default function WorkGallery({
  projects,
  columns = 3,
  showFilter = true,
}: WorkGalleryProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {showFilter && (
        <div className="mb-10 md:mb-12">
          <FilterBar active={activeFilter} onChange={setActiveFilter} />
        </div>
      )}
      <GalleryGrid projects={filtered} columns={columns} />
    </>
  );
}
