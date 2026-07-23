import type { Metadata } from "next";
import { ArtworkGrid } from "@/components/ArtworkGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { categoryOrder, categoryMeta, worksByCategory } from "@/content/artworks";

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

        {categoryOrder.map((cat) => (
          <div className="collection" key={cat}>
            {cat === "adult" && (
              <p className="framing-note">
                Custom framing is available for all student artworks—just ask.
              </p>
            )}
            <SectionHeading title={categoryMeta[cat].label} intro={categoryMeta[cat].description} />
            <ArtworkGrid items={worksByCategory(cat)} />
          </div>
        ))}
      </div>
    </section>
  );
}
