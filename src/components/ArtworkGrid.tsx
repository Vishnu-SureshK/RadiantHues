import Link from "next/link";
import Image from "next/image";
import { displayTitle, slugFor, type Artwork } from "@/content/artworks";

type ArtworkGridProps = {
  items: Artwork[];
};

export function ArtworkGrid({ items }: ArtworkGridProps) {
  return (
    <div className="artwork-grid">
      {items.map((item) => (
        <Link className="art-card" key={item.image} href={`/gallery/${slugFor(item)}`}>
          <div className="art-image-wrap">
            <Image
              src={item.image}
              alt={displayTitle(item)}
              fill
              sizes="(max-width: 960px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          {/* Preview shows only the artwork name + author; full details live on
              the artwork's own page. */}
          <div className="art-copy">
            <h3>{displayTitle(item)}</h3>
            <p>{item.artist.trim() || "Details coming soon"}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
