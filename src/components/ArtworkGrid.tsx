"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/Lightbox";
import { displayTitle, credit, type Artwork } from "@/content/artworks";

type ArtworkGridProps = {
  items: Artwork[];
};

export function ArtworkGrid({ items }: ArtworkGridProps) {
  const [selected, setSelected] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <div className="artwork-grid">
        {items.map((item, index) => {
          const line = credit(item);
          return (
            <article
              className="art-card"
              key={`${item.image}-${index}`}
              onClick={() => setSelected({ src: item.image, alt: displayTitle(item) })}
              style={{ cursor: "zoom-in" }}
            >
              <div className="art-image-wrap">
                <Image
                  src={item.image}
                  alt={displayTitle(item)}
                  fill
                  sizes="(max-width: 960px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="art-copy">
                <h3>{displayTitle(item)}</h3>
                <p>{line || "Details coming soon"}</p>
              </div>
            </article>
          );
        })}
      </div>

      {selected && (
        <Lightbox src={selected.src} alt={selected.alt} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
