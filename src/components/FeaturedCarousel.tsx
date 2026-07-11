import Image from "next/image";
import { galleryCollections } from "@/content/siteContent";
import { imageAspects } from "@/content/imageAspects";

type Artwork = {
  title: string;
  image?: string;
  medium: string;
  year: string;
};

// Every gallery artwork that has an image, with its aspect ratio so each slide
// can reserve the right width (same height, different widths — no layout jank).
const IMAGES = (galleryCollections.flatMap((c) => c.works) as Artwork[])
  .filter((w) => Boolean(w.image))
  .map((w) => ({
    src: w.image as string,
    title: w.title,
    ar: imageAspects[w.image as string] ?? 1.4,
  }));

export function FeaturedCarousel() {
  // Duplicate the set so translateX(-50%) loops seamlessly.
  const loop = [...IMAGES, ...IMAGES];

  return (
    <div className="marquee" aria-label="Featured artworks">
      <div className="marquee-track">
        {loop.map((art, i) => (
          <div
            className="marquee-item"
            key={`${art.src}-${i}`}
            style={{ aspectRatio: String(art.ar) }}
            aria-hidden={i >= IMAGES.length ? true : undefined}
          >
            <Image
              src={art.src}
              alt={art.title}
              fill
              sizes="(max-width: 768px) 60vw, 28rem"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
