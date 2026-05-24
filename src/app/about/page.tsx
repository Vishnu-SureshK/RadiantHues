import type { Metadata } from "next";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the vision and story behind Radiant Hues."
};

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container prose about-grid">
        <div className="about-image">
          <MediaPlaceholder label="Artist portrait — add your photo" variant="portrait" />
        </div>
        <div>
        <h1 className="page-title">About Radiant Hues</h1>
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
