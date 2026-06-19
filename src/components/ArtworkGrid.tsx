import Image from "next/image";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";

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
  return (
    <div className="artwork-grid">
      {items.map((item, index) => (
        <article className="art-card" key={`${item.title}-${index}`}>
          <div className="art-image-wrap">
            {item.image ? (
              <Image src={item.image} alt={item.title} fill sizes="(max-width: 960px) 100vw, 33vw" style={{ objectFit: "contain" }} />
            ) : (
              <MediaPlaceholder label={`${item.title} — add your image`} variant="card" />
            )}
          </div>
          <div className="art-copy">
            <h3>{item.title}</h3>
            <p>
              {item.medium} · {item.year}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
