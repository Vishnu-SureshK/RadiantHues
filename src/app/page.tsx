import Link from "next/link";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import { heroContent, stats, classes } from "@/content/siteContent";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <p className="eyebrow">{heroContent.eyebrow}</p>
              <h1>
                Walk in <span className="word-curious">curious</span>. Leave{" "}
                <span className="word-proud">proud</span>.
              </h1>
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

      <section className="stats-strip">
        <div className="container stats-grid">
          {stats.map((item) => (
            <div className="stat" key={item.label}>
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <SectionHeading
            title="Featured Works"
            intro="Professional artworks and student brilliance inspired by Kerala's vibrant palette."
          />
        </div>
        <FeaturedCarousel />
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            title="Classes for every age"
            intro="Small, encouraging classes for kids and adults—in-person in Naperville or live online. Learn real techniques and leave with a finished piece you're proud of."
          />
          <div className="class-grid">
            {classes.map((item) => (
              <article className="class-card" key={item.title}>
                <h3>{item.title}</h3>
                <p className="class-body">{item.body}</p>
                <dl className="class-details">
                  {item.details.map((detail) => (
                    <div key={detail.label}>
                      <dt>{detail.label}</dt>
                      <dd>{detail.value}</dd>
                    </div>
                  ))}
                </dl>
                <Link className="button button-secondary class-cta" href="/contact">
                  Book a class
                </Link>
              </article>
            ))}
          </div>
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
              title="Where tradition meets contemporary learning"
              intro="From temple tones and monsoon skies to floral vibrancy and festive symbolism—each lesson celebrates technique and cultural storytelling."
            />
          </div>
        </div>
      </section>
    </>
  );
}
