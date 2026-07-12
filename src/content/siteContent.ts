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
    body: "Playful group classes where young artists build confidence with color, drawing, and painting.",
    detail: "Ages · schedule · skill level — add details"
  },
  {
    title: "Adults",
    body: "Relaxed classes for beginners and hobbyists to learn real techniques at their own pace.",
    detail: "Mediums · group size · schedule — add details"
  },
  {
    title: "Private 1:1",
    body: "One-on-one sessions tailored to your goals, from a single skill to portfolio prep.",
    detail: "Format · duration · rates — add details"
  }
];

// Gallery artwork data now lives in a single source of truth: artworks.json
// (typed access + helpers in @/content/artworks). Run `npm run art` after
// adding images to public/images to scaffold new entries automatically.
