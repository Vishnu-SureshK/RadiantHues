export const siteConfig = {
  name: "Radiant Hues",
  description:
    "Art lessons and gallery in Naperville with Gayathri Suresh—welcoming classes for every level, Kerala-inspired color, and a studio that lifts up students.",
  url: "https://radianthues.com"
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const heroContent = {
  eyebrow: "Art Lessons and Gallery · Naperville",
  title: "Walk in curious. Walk out proud of what you made.",
  body: "Patient teaching. Graphite pencil drawings, colored pencil drawings, watercolor painting, acrylic painting, oil painting, multimedia art, lippan art, textured art, and more. A teacher who believes art is for everyone. No jargon, no pressure—just real skills and classmates who cheer when your piece goes on the wall.",
  ctaPrimary: { href: "/gallery", label: "See the gallery" },
  ctaSecondary: { href: "/contact", label: "Say hello / book a class" }
};

export const featuredWorks = [
  {
    title: "Rainy Evening Walk",
    medium: "(Description)",
    year: "",
    image: "/images/artwork-rainy-evening.webp"
  },
  {
    title: "Golden Marsh at Dusk",
    medium: "(Description)",
    year: "",
    image: "/images/artwork-autumn-landscape.webp"
  },
  {
    title: "Evening Bliss",
    medium: "(Description)",
    year: "",
    image: "/images/artwork-kerala-lamp.webp"
  },
  {
    title: "RadheKrishna",
    medium: "(Description)",
    year: "",
    image: "/images/artwork-hot-air-balloons.jpg"
  }
];

export const galleryCollections = [
  {
    name: "Personal Portfolio",
    description: "Kerala-inspired works celebrating landscapes, festivals, and devotional art.",
    works: [
      ...featuredWorks,
      { title: "Hot Air Balloons", medium: "(Description)", year: "", image: "/images/artwork-5.webp" },
      { title: "Artwork VI", medium: "(Description)", year: "", image: "/images/artwork-6.webp" },
      { title: "Artwork VII", medium: "(Description)", year: "", image: "/images/artwork-7.webp" },
      { title: "Phoenix Rising", medium: "(Description)", year: "", image: "/images/artwork-12.jpg" },
      { title: "Artwork XIII", medium: "(Description)", year: "", image: "/images/artwork-13.jpg" },
      { title: "Artwork XIV", medium: "(Description)", year: "", image: "/images/artwork-14.jpg" }
    ]
  },
  {
    name: "Student Showcase",
    description: "Curated works showcasing color confidence and creative storytelling.",
    works: [
      {
        title: "Student piece I",
        medium: "Add medium and details",
        year: "—"
      },
      {
        title: "Student piece II",
        medium: "Add medium and details",
        year: "—"
      },
      {
        title: "Student piece III",
        medium: "Add medium and details",
        year: "—"
      }
    ]
  }
];
