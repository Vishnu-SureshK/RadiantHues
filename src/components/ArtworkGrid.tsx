"use client";

import { useState } from "react";
import Image from "next/image";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { Lightbox } from "@/components/Lightbox";

type Artwork = {
  title: string;
  image?: string;
  medium: string;
  year: string;
};

type ArtworkGridProps = {
  items: Artwork[];
};

export function ArtworkGrid({ items }: ArtworkGridProps) {
  const [selected, setSelected] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <div className="artwork-grid">
        {items.map((item, index) => (
          <article
            className="art-card"
            key={`${item.title}-${index}`}
            onClick={() => item.image && setSelected({ src: item.image, alt: item.title })}
            style={item.image ? { cursor: "zoom-in" } : undefined}
          >
            <div className="art-image-wrap">
              {item.image ? (
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 960px) 100vw, 33vw" style={{ objectFit: "contain" }} />
              ) : (
                <MediaPlaceholder label={`${item.title} — add your image`} variant="card" />
              )}
            </div>
            <div className="art-copy">
              <h3>{item.title}</h3>
              <p>{item.medium}{item.year ? ` · ${item.year}` : ""}</p>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <Lightbox src={selected.src} alt={selected.alt} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
