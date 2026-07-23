# Vibecode Audit — Radiant Hues

A catalog of the "AI vibecoded" elements on the site: the generic, templated, or
decorative-for-its-own-sake pieces that make a site read as machine-generated
rather than crafted. Each item lists **where** it is, **why** it reads as
vibecoded, and a **recommended action**. Ordered roughly by impact.

Legend for action: **Remove** · **Replace** (with something intentional) ·
**Restrain** (keep, but dial down) · **Keep**.

---

## 1. Decorative elements with no purpose

These are the clearest tells — visual filler that exists to look "designed."

| # | Element | Where | Why it's vibecoded | Action |
|---|---------|-------|--------------------|--------|
| 1.1 | **Animated paint-splatter canvas** | `src/components/PaintSplatter.tsx` | A full `requestAnimationFrame` loop rendering random watercolor blobs + falling "drips" in five hardcoded "Kerala colors." It is **dead code — imported nowhere**. Pure generated gimmick. | **Remove** the file entirely. |
| 1.2 | **Full-screen canvas texture overlay** | `src/components/CanvasTexture.tsx`, rendered in `layout.tsx` | A fixed 100vw/100vh repeating-linear-gradient "texture" at `mix-blend-mode: multiply`. Adds faint noise over everything for no real benefit; a classic "make it feel textured" AI move. | **Remove**, or **Replace** with a real subtle paper texture only behind the hero if desired. |
| 1.3 | **Ornamental section dividers** | `src/components/KeralaPattern.tsx` (used twice in `page.tsx`) | A center-dotted line "ornament" dropped between sections. Decorative separators like this are a template signature; spacing should separate sections, not glyphs. | **Restrain** — replace with plain whitespace or a single hairline rule, or remove. |

---

## 2. Motion / animation over-use

Everything moving is a hallmark of generated UI. Real design uses motion sparingly.

| # | Element | Where | Why it's vibecoded | Action |
|---|---------|-------|--------------------|--------|
| 2.1 | **Staggered entrance animations** | `globals.css` — `.hero h1` (`slideIn 0.1s`), `.hero .lead` (`0.2s`), `.hero-actions` (`0.3s`), plus `fadeIn` on every `.hero`/`.section` | The "elements fly in one after another on load" pattern is the single most recognizable AI-site tell. | **Remove** the fade/slide-in on sections; keep at most a single quiet hero fade. |
| 2.2 | **Universal hover-lift** | `globals.css` — `.art-card`, `.class-card`, `.feature-visual`, `.about-image`, `.gallery-banner`, `.marquee-item` all do `translateY(-3/-4px)` + bigger shadow | Every card floating identically on hover is templated. Hover should be subtler and not uniform across unrelated components. | **Restrain** — pick one restrained hover treatment for actual clickable cards only; drop it on decorative images. |
| 2.3 | **`transition: all`** | `globals.css` — `.button` and others | `transition: all` is the lazy default; it animates unintended properties and signals generated CSS. | **Replace** with explicit properties (`transition: background-color .2s, transform .2s`). |
| 2.4 | **Triple infinite marquee** | `FeaturedCarousel.tsx` + `.marquee-*` | Auto-scrolling rows read as "look, motion!" Three at once is a lot. (You asked for this, so keep — but note it trades toward gimmick.) | **Restrain** — consider one marquee, or slower/pausable (already pauses on hover). |
| 2.5 | **Auto-advancing hero carousel** | `GalleryCarousel.tsx` | Auto-play carousels are a template default; users rarely want the slide changing under them. | **Restrain** — longer interval, or advance only on interaction. |

---

## 3. Typographic & color tropes

| # | Element | Where | Why it's vibecoded | Action |
|---|---------|-------|--------------------|--------|
| 3.1 | **Underline accent bar under every `<h2>`** | `globals.css` `h2::after` (3.5rem primary bar) | The "little colored bar under each heading" is a top-3 template motif. | **Remove** or make it a deliberate, occasional device. |
| 3.2 | **Eyebrow label with em-dash prefix** | `globals.css` `.eyebrow` + `.eyebrow::before` (`—`), uppercase `0.24em` tracking | Tiny uppercase kicker with a dash is straight from generated hero blocks. | **Restrain** — keep the kicker, drop the dash gimmick and extreme tracking. |
| 3.3 | **Highlight-a-word-in-brand-color** | `page.tsx` hero (`word-curious` underline, `word-proud`), `accent-azure`/`accent-gold` in headings | Coloring one word of a headline is a recognizable AI flourish. | **Restrain** to at most one instance, or remove. |
| 3.4 | **Arrow glyphs in link text** | `.class-link` "Book a class →", `.footer-cta::after` `→` | Appended `→` on CTAs is generated-microcopy default. | **Replace** with real buttons/links; drop the literal arrow or use a proper icon. |
| 3.5 | **Palette drift / dead comments** | `globals.css` — comment says "coral underline" but `--pop` is navy `#22406b`; legacy aliases `--secondary/--accent/--gold/--peacock-deep` all remapped | Leftover variables and comments from a previous generated palette. Also: there is **no actual accent/"pop" color** despite the intended cream+teal+coral direction. | **Replace** — commit to a real accent (add a true coral), delete legacy aliases and stale comments. |

---

## 4. Content tells (placeholder & vanity copy)

Generated sites ship with confident-sounding filler. This is what most makes it feel "incomplete."

| # | Element | Where | Why it's vibecoded | Action |
|---|---------|-------|--------------------|--------|
| 4.1 | **Vanity stat strip** | `siteContent.ts` `stats` — "10+ Years", "100+ Students", "9+ Mediums", "Naperville" | Round-number social-proof tiles with no source are a generated-landing-page staple ("9+ mediums" especially). | **Replace** with real, specific numbers — or remove the strip. |
| 4.2 | **Placeholder instructions in prod copy** | `page.tsx` classes intro: "Replace this with your class details, schedule, and pricing." | Literal "replace this" text shipped to production. | **Replace** with real copy (partly done — schedules now added). |
| 4.3 | **Generic aspirational headings** | `page.tsx` feature band "Where Tradition Meets Contemporary Learning"; hero "Walk in curious. Leave proud." | Vague, brochure-generator phrasing. | **Restrain/Replace** with specific, human copy. |
| 4.4 | **"Details coming soon" fallbacks** | `ArtworkGrid` + many blank `artworks.json` entries | Necessary short-term, but lots of Untitled/no-credit cards read as unfinished. | **Replace** by filling titles/credits (use `npm run art` checklist). |

---

## 5. Structural monotony & robustness debt

| # | Element | Where | Why it matters | Action |
|---|---------|-------|----------------|--------|
| 5.1 | **Identical section rhythm** | `page.tsx` | Every section is eyebrow → h2+bar → intro → 3-card grid. Uniform cadence feels generated. | **Replace** — vary layout (asymmetry, full-bleed, editorial) between sections. |
| 5.2 | **Decorative dead-end band** | `page.tsx` feature band | Image + heading + paragraph with no CTA — decoration, not a step in the journey. | **Replace** with a real CTA or merge into another section. |
| 5.3 | **No mobile navigation** | `SiteHeader.tsx` | 5 nav items sit edge-to-edge at 375px, no hamburger, 153px-tall stacked header. Breaks below ~360px. | **Replace** with a proper mobile menu. |
| 5.4 | **Inconsistent radius scale** | `globals.css` | Six different border-radius values (4px / 0.4rem / 0.5rem / 0.6rem / 0.9rem / 1rem). | **Replace** with `--radius-sm/md/lg` tokens. |
| 5.5 | **Dead / unused CSS & classes** | `globals.css` `.panel`, `.media-placeholder*` (MediaPlaceholder no longer used), legacy color aliases | Accumulated generated cruft. | **Remove**. |

---

## Recommended transformation order

1. **Delete the gimmicks** — remove `PaintSplatter.tsx`, `CanvasTexture`, and the divider ornament (§1). Immediate credibility win, zero content needed.
2. **Kill the entrance/hover motion** (§2.1–2.3) — strip `fadeIn`/`slideIn`, replace `transition: all`, keep one restrained hover.
3. **De-template the type system** (§3) — drop the `h2::after` bar and eyebrow dash, commit to a real accent color, delete legacy aliases.
4. **Establish design tokens** — radius + spacing scale (§5.4), then apply consistently.
5. **Replace vanity/placeholder copy** (§4) with real numbers, pricing, and titles.
6. **Break the section monotony** (§5.1–5.2) — give 1–2 sections a genuinely different, editorial layout.
7. **Fix mobile nav** (§5.3) and remove dead CSS (§5.5).

Doing 1–3 alone moves the site most of the way from "AI-generated" to "intentionally designed."
