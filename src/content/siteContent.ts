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
    body: "Young artists learn to really see—drawing, mixing color, and painting—in small, encouraging groups. Building confidence matters as much as technique, and everyone leaves with work they're proud of.",
    details: [
      { label: "Ages", value: "5 and up" },
      { label: "Format", value: "Small in-person groups" },
      { label: "Focus", value: "Drawing, color & painting basics" }
    ]
  },
  {
    title: "Adults",
    body: "Whether you're picking up a brush for the first time or returning after years away, you'll learn real techniques at your own pace—and can bring your own idea, photo, or memory to turn into a finished piece.",
    details: [
      { label: "Levels", value: "Beginner to experienced" },
      { label: "Mediums", value: "Watercolor, acrylic, oil & more" },
      { label: "Mornings", value: "10:30 AM – 12:15 PM" },
      { label: "Evenings", value: "Tue, Wed & Thu · 7:00 – 9:00 PM" }
    ]
  },
  {
    title: "Zoom Classes",
    body: "Can't make it to the studio? Join live over Zoom and get the same step-by-step guidance and personal feedback—from wherever you are.",
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
