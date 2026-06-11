import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the vision and story behind Radiant Hues."
};

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container prose about-grid">
        <div className="about-image">
          <Image
            src="/images/gayathri-portrait.webp"
            alt="Gayathri Suresh, founder and art teacher at Radiant Hues"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div>
        <h1 className="page-title">About Radiant Hues and Gayathri Suresh</h1>
        <p>
          Led by Gayathri Suresh, Radiant Hues draws from Kerala&apos;s visual richness—nature, ritual, devotion, and vibrant color.
        </p>
        <p>
          Students build confidence in drawing, composition, and color while discovering their own artistic voice in a welcoming environment.
        </p>
        <p>
          For beginners and experienced artists alike. Art that heals, celebrates, and connects.
        </p>
        </div>
      </div>
    </section>
  );
}
