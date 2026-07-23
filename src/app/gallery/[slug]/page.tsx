import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  artworks,
  bySlug,
  slugFor,
  displayTitle,
  aspectOf,
  categoryMeta,
} from "@/content/artworks";

type Params = { slug: string };

// Pre-render a static page for every artwork.
export function generateStaticParams() {
  return artworks.map((a) => ({ slug: slugFor(a) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const art = bySlug(slug);
  if (!art) return { title: "Artwork" };
  return {
    title: displayTitle(art),
    description: [displayTitle(art), art.artist, art.medium].filter(Boolean).join(" · "),
  };
}

export default async function ArtworkDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const art = bySlug(slug);
  if (!art) notFound();

  const name = displayTitle(art);

  return (
    <section className="section">
      <div className="container artwork-detail">
        <Link href="/gallery" className="back-link">
          ← Back to gallery
        </Link>

        {/* Image sits above the details and scrolls with the page. */}
        <div
          className="artwork-detail-image"
          style={{ "--ar": String(aspectOf(art.image)) } as CSSProperties}
        >
          <Image
            src={art.image}
            alt={name}
            fill
            sizes="(max-width: 820px) 92vw, 760px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div className="artwork-detail-info">
          <p className="artwork-detail-collection">{categoryMeta[art.category].label}</p>
          <h1>{name}</h1>
          <dl className="artwork-meta">
            {art.artist.trim() && (
              <div>
                <dt>Artist</dt>
                <dd>{art.artist}</dd>
              </div>
            )}
            {art.medium.trim() && (
              <div>
                <dt>Medium</dt>
                <dd>{art.medium}</dd>
              </div>
            )}
            {art.size.trim() && (
              <div>
                <dt>Size</dt>
                <dd>{art.size}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </section>
  );
}
