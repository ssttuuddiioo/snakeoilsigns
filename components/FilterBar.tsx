"use client";

const CATEGORIES = ["All", "Mural", "Sign Painting", "Gold Leaf", "Other"];

interface FilterBarProps {
  active: string;
  onChange: (category: string) => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-4">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`font-display text-xs tracking-display uppercase py-1.5 px-1 transition-all duration-200 border-b-2 ${
            active === cat
              ? "border-ink text-ink"
              : "border-transparent text-muted hover:text-ink"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
