"use client";

import { useEffect, useState } from "react";
import { ArtworkGrid } from "@/components/ArtworkGrid";
import { galleryCollections } from "@/content/siteContent";

type Artwork = {
  title: string;
  image?: string;
  medium: string;
  year: string;
};

// Every gallery artwork that has an image is eligible for the featured row.
const POOL: Artwork[] = (
  galleryCollections.flatMap((collection) => collection.works) as Artwork[]
).filter((work) => Boolean(work.image));

function pickRandom(pool: Artwork[], count: number) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count);
}

export function FeaturedWorks({ count = 4 }: { count?: number }) {
  // Deterministic first render so server and client markup match, then shuffle
  // to a random set after mount — re-randomizes on every page load/reload.
  const [items, setItems] = useState<Artwork[]>(() => POOL.slice(0, count));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(pickRandom(POOL, count));
  }, [count]);

  return <ArtworkGrid items={items} />;
}
