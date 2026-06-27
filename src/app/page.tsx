import Link from "next/link";
import { ArtworkGrid } from "@/components/ArtworkGrid";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { SectionHeading } from "@/components/SectionHeading";
import { KeralaPattern } from "@/components/KeralaPattern";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import { featuredWorks, heroContent } from "@/content/siteContent";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <p className="eyebrow">{heroContent.eyebrow}</p>
              <h1>{heroContent.title}</h1>
              <p className="lead">{heroContent.body}</p>
              <div className="hero-actions">
                <Link className="button button-primary" href={heroContent.ctaPrimary.href}>
                  {heroContent.ctaPrimary.label}
                </Link>
                <Link className="button button-secondary" href={heroContent.ctaSecondary.href}>
                  {heroContent.ctaSecondary.label}
                </Link>
              </div>
            </div>
            <div className="hero-image-wrap">
              <GalleryCarousel />
            </div>
          </div>
        </div>
      </section>

      <KeralaPattern />

      <section className="section">
        <div className="container">
          <SectionHeading
            title="Featured Works"
            intro="Professional artworks and student brilliance inspired by Kerala's vibrant palette."
          />
          <ArtworkGrid items={featuredWorks} />
        </div>
      </section>

      <KeralaPattern />

      <section className="section feature-band">
        <div className="container feature-grid">
          <div className="feature-visual">
            <MediaPlaceholder label="Studio or student showcase — add your photo" variant="card" />
          </div>
          <div>
            <SectionHeading
              title="Where Tradition Meets Contemporary Learning"
              intro="From temple tones and monsoon skies to floral vibrancy and festive symbolism—each lesson celebrates technique and cultural storytelling."
            />
          </div>
        </div>
      </section>
    </>
  );
}
