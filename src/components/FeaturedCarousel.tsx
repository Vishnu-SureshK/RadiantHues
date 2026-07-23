"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/Lightbox";
import {
  categoryOrder,
  categoryMeta,
  worksByCategory,
  aspectOf,
  displayTitle,
  credit,
  type Artwork,
  type Category,
} from "@/content/artworks";

// Repeat a list until it has at least `min` items, so short showcases still
// scroll continuously instead of leaving a gap.
function fill<T>(items: T[], min: number): T[] {
  if (items.length === 0) return items;
  const out: T[] = [];
  while (out.length < min) out.push(...items);
  return out;
}

type Selection = { src: string; alt: string };

function ShowcaseRow({
  category,
  reverse,
  onSelect,
}: {
  category: Category;
  reverse: boolean;
  onSelect: (s: Selection) => void;
}) {
  const works = worksByCategory(category);
  if (works.length === 0) return null;

  // `base` fills the row; the track renders it twice so translateX(-50%) loops
  // seamlessly. Duration scales with item count to keep a constant glide speed.
  const base = fill(works, 8);
  const loop = [...base, ...base];
  const duration = base.length * 5.5;

  const renderItem = (art: Artwork, i: number) => {
    const isClone = i >= base.length;
    return (
      <button
        type="button"
        className="marquee-item"
        key={`${art.image}-${i}`}
        style={{ aspectRatio: String(aspectOf(art.image)) }}
        aria-hidden={isClone ? true : undefined}
        tabIndex={isClone ? -1 : 0}
        onClick={() => onSelect({ src: art.image, alt: displayTitle(art) })}
      >
        <Image
          src={art.image}
          alt={displayTitle(art)}
          fill
          loading={i < 4 ? "eager" : "lazy"}
          sizes="(max-width: 768px) 60vw, 22rem"
          style={{ objectFit: "cover" }}
        />
        <span className="marquee-caption">
          <span className="mi-title">{displayTitle(art)}</span>
          {credit(art) && <span className="mi-credit">{credit(art)}</span>}
        </span>
      </button>
    );
  };

  return (
    <div className="showcase-row">
      <div className="container showcase-head">
        <h3>{categoryMeta[category].label}</h3>
        {categoryMeta[category].description && <p>{categoryMeta[category].description}</p>}
      </div>
      <div className="marquee">
        <div
          className={`marquee-track ${reverse ? "reverse" : ""}`}
          style={{ animationDuration: `${duration}s` }}
        >
          {loop.map(renderItem)}
        </div>
      </div>
    </div>
  );
}

export function FeaturedCarousel() {
  const [selected, setSelected] = useState<Selection | null>(null);

  return (
    <div className="featured-rows">
      {categoryOrder.map((cat, idx) => (
        <ShowcaseRow
          key={cat}
          category={cat}
          reverse={idx % 2 === 1}
          onSelect={setSelected}
        />
      ))}

      {selected && (
        <Lightbox src={selected.src} alt={selected.alt} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
