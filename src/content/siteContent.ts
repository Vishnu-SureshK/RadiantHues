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
    name: "Teacher Showcase",
    description: "Kerala-inspired works celebrating landscapes, festivals, and devotional art.",
    works: [
      ...featuredWorks,
      { title: "Hot Air Balloons", medium: "(Description)", year: "", image: "/images/artwork-5.webp" },
      { title: "RadhaKrishna", medium: "(Description)", year: "", image: "/images/artwork-6.webp" },
      { title: "Sunset over the Mountain", medium: "(Description)", year: "", image: "/images/artwork-7.webp" },
      { title: "Phoenix Rising", medium: "Oil on canvas board", year: "", image: "/images/artwork-12.jpg" },
      { title: "Woodpecker", medium: "(Description)", year: "", image: "/images/artwork-13.jpg" },
      { title: "Celebrate", medium: "(Description)", year: "", image: "/images/artwork-14.jpg" },
      { title: "Last Flowers of the Season", medium: "(Description)", year: "", image: "/images/artwork-15.jpg" },
      { title: "Voyaging at Sea", medium: "(Description)", year: "", image: "/images/artwork-16.jpg" },
      { title: "Snowy Night", medium: "(Description)", year: "", image: "/images/artwork-17.jpg" },
      { title: "Artwork 22", medium: "(Description)", year: "", image: "/images/artwork-22.jpg" },
      { title: "Artwork 23", medium: "(Description)", year: "", image: "/images/artwork-23.jpg" },
      { title: "Artwork 24", medium: "(Description)", year: "", image: "/images/artwork-24.jpg" },
      { title: "Artwork 25", medium: "(Description)", year: "", image: "/images/artwork-25.jpg" },
      { title: "Artwork 26", medium: "(Description)", year: "", image: "/images/artwork-26.jpg" },
      { title: "Artwork 27", medium: "(Description)", year: "", image: "/images/artwork-27.jpg" },
      { title: "Artwork 28", medium: "(Description)", year: "", image: "/images/artwork-28.jpg" }
    ]
  },
  {
    name: "Kid Student Showcase",
    description: "Young artists building skills and confidence—one colorful piece at a time.",
    works: [
      { title: "Artwork 19", medium: "(Description)", year: "", image: "/images/artwork-19.jpg" },
      {
        title: "Kid piece 1",
        medium: "Add medium and details",
        year: "—"
      },
      {
        title: "Kid piece 2",
        medium: "Add medium and details",
        year: "—"
      }
    ]
  },
  {
    name: "Adult Student Showcase",
    description: "Beginners and returning artists bringing their own ideas to life.",
    works: [
      { title: "Artwork 18", medium: "(Description)", year: "", image: "/images/artwork-18.jpg" },
      { title: "Artwork 20", medium: "(Description)", year: "", image: "/images/artwork-20.jpg" },
      { title: "Artwork 21", medium: "(Description)", year: "", image: "/images/artwork-21.jpg" }
    ]
  }
];
