'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/Lightbox';
import { worksByCategory, displayTitle, credit } from '@/content/artworks';

// The hero showcases the polished teacher works. Single source of truth — add
// or reorder art in artworks.json and it flows through here automatically.
const SLIDES = worksByCategory('teacher');

export function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isHoveredRef = useRef(false);

  const count = SLIDES.length;

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % count);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + count) % count);

  // Keep ref in sync so the key handler never reads stale state
  useEffect(() => { isHoveredRef.current = isHovered; }, [isHovered]);

  // Arrow key navigation while hovering
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isHoveredRef.current) return;
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + count) % count);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % count);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [count]);

  // Auto-advance carousel
  useEffect(() => {
    if (isHovered || count === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
    }, 4500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, count]);

  if (count === 0) return null;

  const active = SLIDES[currentIndex];
  const activeCredit = credit(active);

  return (
    <div
      className="gallery-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {SLIDES.map((art, index) => {
        const offset = index - currentIndex;
        const isActive = index === currentIndex;
        const isNext = offset === 1 || (currentIndex === count - 1 && index === 0);
        const isPrev = offset === -1 || (currentIndex === 0 && index === count - 1);

        if (!(isActive || isNext || isPrev)) return null;

        return (
          <div
            key={art.image}
            className={`carousel-slide ${isActive ? 'active' : ''}`}
            style={{
              transform: `translateX(${offset * 100}%)`,
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 2 : 1,
              cursor: isActive ? 'zoom-in' : 'default'
            }}
            onClick={() => isActive && setLightbox({ src: art.image, alt: displayTitle(art) })}
          >
            <Image
              src={art.image}
              alt={displayTitle(art)}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              priority={index < 3}
            />
          </div>
        );
      })}

      <button
        className="carousel-arrow left"
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        aria-label="Previous artwork"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="carousel-arrow right"
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        aria-label="Next artwork"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="carousel-caption">
        <div className="caption-text">
          <p className="caption-title">{displayTitle(active)}</p>
          {activeCredit && <p className="caption-medium">{activeCredit}</p>}
        </div>
        <div className="carousel-counter" aria-live="polite">
          {currentIndex + 1} / {count}
        </div>
      </div>

      <div className="carousel-progress" aria-hidden="true">
        <span
          className="carousel-progress-bar"
          style={{ width: `${((currentIndex + 1) / count) * 100}%` }}
        />
      </div>

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}

      <style jsx>{`
        .gallery-carousel {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #15403d;
        }

        .carousel-slide {
          position: absolute;
          inset: 0;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s ease;
          will-change: transform, opacity;
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 2.5rem;
          height: 2.5rem;
          border: none;
          border-radius: 50%;
          background: rgba(20, 16, 12, 0.42);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 5;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .carousel-arrow:hover {
          background: rgba(20, 16, 12, 0.74);
        }

        .carousel-arrow:active {
          transform: translateY(-50%) scale(0.92);
        }

        .carousel-arrow.left {
          left: 0.7rem;
        }

        .carousel-arrow.right {
          right: 0.7rem;
        }

        .carousel-arrow svg {
          width: 1.05rem;
          height: 1.05rem;
        }

        .carousel-caption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 4;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.6rem 1.2rem 1.1rem;
          background: linear-gradient(to top, rgba(15, 12, 9, 0.68) 0%, rgba(15, 12, 9, 0) 100%);
          pointer-events: none;
        }

        .caption-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          line-height: 1.05;
        }

        .caption-medium {
          font-size: 0.74rem;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.85);
          margin: 0.25rem 0 0;
        }

        .carousel-counter {
          flex-shrink: 0;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.9);
          font-variant-numeric: tabular-nums;
          padding-bottom: 0.1rem;
        }

        .carousel-progress {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 3px;
          background: rgba(255, 255, 255, 0.22);
          z-index: 4;
        }

        .carousel-progress-bar {
          display: block;
          height: 100%;
          background: var(--pop);
          border-radius: 0 2px 2px 0;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
