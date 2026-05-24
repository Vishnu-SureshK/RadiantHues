import type { Metadata } from "next";
import { ArtworkGrid } from "@/components/ArtworkGrid";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
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
          <MediaPlaceholder label="Gallery banner — add your hero collage or feature piece" variant="banner" />
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
