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
          Gayathri Suresh is a passionate art teacher from Naperville, Illinois. She always explores new styles and techniques and loves sharing her knowledge with her students. Gayathri believes that art is for everyone, and she strives to create a welcoming and inclusive environment for all her students.
        </p>
        <p>
          Gayathri&apos;s teaching philosophy is based on the idea that art is a process of exploration and discovery. She encourages her students to experiment and to find their own unique voice. Gayathri also believes that art is a powerful tool for communication and self-expression. She helps her students develop their artistic skills to use art to share their stories and perspectives with the world.
        </p>
        <p>
          Gayathri is a highly skilled and experienced art teacher. She has taught students of all ages and skill levels, from beginners to experienced artists. Gayathri is passionate about using art to help people of all ages to heal, grow, and express themselves.
        </p>
        </div>
      </div>
    </section>
  );
}
