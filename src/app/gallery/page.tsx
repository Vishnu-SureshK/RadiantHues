import type { Metadata } from "next";
import Image from "next/image";
import { ArtworkGrid } from "@/components/ArtworkGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { galleryCollections } from "@/content/siteContent";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore curated Radiant Hues collections."
};

export default function GalleryPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="page-title">Gallery</h1>
        <p className="page-intro">
          A curated blend of professional works and student brilliance inspired by Kerala color palettes.
        </p>
        <div className="gallery-banner">
          <Image
            src="/images/artwork-autumn-landscape.webp"
            alt="Golden Marsh at Dusk"
            fill
            sizes="(max-width: 960px) 100vw, 1200px"
            style={{ objectFit: "cover", objectPosition: "center 82%" }}
            priority
          />
        </div>

        {galleryCollections.map((collection) => (
          <div className="collection" key={collection.name}>
            <SectionHeading title={collection.name} intro={collection.description} />
            <ArtworkGrid items={collection.works} />
          </div>
        ))}
      </div>
    </section>
  );
}
