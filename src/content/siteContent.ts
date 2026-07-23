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
  title: "Walk in curious. Leave proud.",
  body: "Patient, jargon-free lessons in watercolor, acrylic, oil, and more—where every student leaves with real skills and a finished piece worth framing.",
  ctaPrimary: { href: "/gallery", label: "See the gallery" },
  ctaSecondary: { href: "/contact", label: "Book a class" }
};

// Placeholder content — replace values with real numbers and details.
export const stats = [
  { value: "10+", label: "Years teaching" },
  { value: "100+", label: "Students taught" },
  { value: "9+", label: "Mediums explored" },
  { value: "Naperville", label: "In-person studio" }
];

export const classes = [
  {
    title: "Kids",
    details: [
      { label: "Ages", value: "5 and up" },
      { label: "Format", value: "Small in-person groups" },
      { label: "Focus", value: "Drawing, color & painting basics" }
    ]
  },
  {
    title: "Adults",
    details: [
      { label: "Levels", value: "Beginner to experienced" },
      { label: "Mediums", value: "Watercolor, acrylic, oil & more" },
      { label: "Mornings", value: "10:30 AM – 12:15 PM" },
      { label: "Evenings", value: "Tue, Wed & Thu · 7:00 – 9:00 PM" }
    ]
  },
  {
    title: "Zoom Classes",
    details: [
      { label: "Format", value: "Live online via Zoom" },
      { label: "Guidance", value: "Same as in-studio" },
      { label: "Schedule", value: "Flexible — by arrangement" }
    ]
  }
];

// Gallery artwork data now lives in a single source of truth: artworks.json
// (typed access + helpers in @/content/artworks). Run `npm run art` after
// adding images to public/images to scaffold new entries automatically.
