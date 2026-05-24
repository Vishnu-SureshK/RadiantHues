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
          Radiant Hues is led by Gayathri Suresh, a passionate art teacher and artist based in Naperville. Her work draws
          from Kerala&apos;s visual richness: nature, ritual, devotion, and everyday color.
        </p>
        <p>
          The studio&apos;s teaching approach is rooted in exploration. Students are guided to build confidence in drawing,
          composition, and color while discovering their own artistic voice in a welcoming and inclusive environment.
        </p>
        <p>
          Radiant Hues serves beginners and experienced learners alike, with a focus on expressive storytelling through art
          that can heal, celebrate, and connect communities across generations.
        </p>
        </div>
      </div>
    </section>
  );
}
