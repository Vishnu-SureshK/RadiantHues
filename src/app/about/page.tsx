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
        <h1 className="page-title accent-gold">About Me</h1>
        <p>
          I was born in India and now call the United States my home. Art has been a lifelong passion, and for more than ten years I have had the privilege of sharing that passion as an artist and art educator.
        </p>
        <p>
          Nature has always been my greatest source of inspiration. I am continually drawn to its colors, textures, light, and beauty, and these elements often find their way into my artwork. Over the years, I have explored and mastered a wide variety of artistic mediums, including graphite, colored pencil, watercolor, acrylic, oil painting, clay, textured art, and mixed media. I enjoy experimenting with different techniques and believe that every medium offers a unique way to express creativity.
        </p>
        <p>
          Teaching is one of the most rewarding parts of my artistic journey. I love sharing my knowledge and experience with my students and helping them discover their own creative potential. My goal is to create a positive, encouraging environment where every student feels inspired to learn, experiment, and grow with confidence.
        </p>
        <p>
          For children, I follow a structured, skill-building curriculum that develops strong artistic fundamentals. I guide my students through drawing, composition, color theory, shading, and painting techniques while encouraging regular practice and creative exploration. As their skills develop, they gain the confidence to create original works of art that reflect their own imagination and artistic voice.
        </p>
        <p>
          For adults, I believe that everyone has a creative story to tell. Whether you’re a complete beginner or someone returning to art after many years, I invite you to bring your ideas, inspirations, or even a cherished memory. Together, we’ll transform your vision into a beautiful piece of art that you can proudly display in your home. I will guide you through every step of the process, making it enjoyable, approachable, and rewarding.
        </p>
        <p>
          For me, art is about much more than learning techniques—it’s about expressing yourself, building confidence, and experiencing the joy of creating something meaningful with your own hands. I look forward to helping each of my students discover the artist within themselves.
        </p>
        </div>
      </div>
    </section>
  );
}
