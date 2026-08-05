import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArtworkGrid } from "@/components/ArtworkGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { categoryOrder, categoryMeta, worksByCategory } from "@/content/artworks";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore curated Radiant Hues collections."
};

export default function GalleryPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="page-title">Gallery</h1>
          <p className="page-intro">
            A curated blend of professional works and student brilliance inspired by Kerala color palettes.
          </p>

          {categoryOrder.map((cat) => (
            <div className="collection" key={cat}>
              <SectionHeading title={categoryMeta[cat].label} intro={categoryMeta[cat].description} />
              <ArtworkGrid items={worksByCategory(cat)} />
            </div>
          ))}
        </div>
      </section>

      <section className="section feature-band">
        <div className="container feature-grid">
          <div className="feature-visual">
            <Image
              src="/images/artwork-20.jpg"
              alt="Ganesha and elephants — traditional Indian mural triptych"
              fill
              sizes="(max-width: 960px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <SectionHeading
              title="Custom Framing for your Art"
              intro="Every finished piece deserves the right frame. We offer custom framing for student and commissioned artworks—choose a style that suits your space, and we'll take care of the rest."
            />
            <Link className="button button-secondary" href="/contact">
              Ask about framing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
