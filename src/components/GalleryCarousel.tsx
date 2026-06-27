'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/Lightbox';

type ArtworkImage = {
  src: string;
  title: string;
  artist: string;
};

const GALLERY_IMAGES: ArtworkImage[] = [
  {
    src: '/images/artwork-rainy-evening.webp',
    title: 'Rainy Evening Walk',
    artist: '(Description)'
  },
  {
    src: '/images/artwork-autumn-landscape.webp',
    title: 'Golden Marsh at Dusk',
    artist: '(Description)'
  },
  {
    src: '/images/artwork-kerala-lamp.webp',
    title: 'Evening Bliss',
    artist: '(Description)'
  },
  {
    src: '/images/artwork-hot-air-balloons.jpg',
    title: 'RadheKrishna',
    artist: '(Description)'
  },
  {
    src: '/images/artwork-5.webp',
    title: 'Hot Air Balloons',
    artist: '(Description)'
  },
  {
    src: '/images/artwork-6.webp',
    title: 'Artwork VI',
    artist: '(Description)'
  },
  {
    src: '/images/artwork-7.webp',
    title: 'Artwork VII',
    artist: '(Description)'
  },
  {
    src: '/images/artwork-12.jpg',
    title: 'Phoenix Rising',
    artist: 'Oil on canvas board'
  },
  {
    src: '/images/artwork-13.jpg',
    title: 'Artwork XIII',
    artist: '(Description)'
  },
  {
    src: '/images/artwork-14.jpg',
    title: 'Artwork XIV',
    artist: '(Description)'
  }
];

export function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  // Start with the unshuffled order so server and client markup match, then shuffle after mount
  const [shuffledImages, setShuffledImages] = useState<ArtworkImage[]>(GALLERY_IMAGES);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isHoveredRef = useRef(false);

  const count = shuffledImages.length;

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % count);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + count) % count);

  useEffect(() => {
    // One-time client-only shuffle to avoid SSR/client hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShuffledImages([...GALLERY_IMAGES].sort(() => Math.random() - 0.5));
  }, []);

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

  const active = shuffledImages[currentIndex];

  return (
    <div
      className="gallery-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {shuffledImages.map((image, index) => {
        const offset = index - currentIndex;
        const isActive = index === currentIndex;
        const isNext = offset === 1 || (currentIndex === count - 1 && index === 0);
        const isPrev = offset === -1 || (currentIndex === 0 && index === count - 1);

        if (!(isActive || isNext || isPrev)) return null;

        return (
          <div
            key={`${image.src}-${index}`}
            className={`carousel-slide ${isActive ? 'active' : ''}`}
            style={{
              transform: `translateX(${offset * 100}%)`,
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 2 : 1,
              cursor: isActive ? 'zoom-in' : 'default'
            }}
            onClick={() => isActive && setLightbox({ src: image.src, alt: image.title })}
          >
            <Image
              src={image.src}
              alt={image.title}
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
          <p className="caption-title">{active.title}</p>
          {active.artist && active.artist !== '(Description)' && (
            <p className="caption-medium">{active.artist}</p>
          )}
        </div>
        <div className="carousel-dots">
          {shuffledImages.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
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
          padding: 1.4rem 1.1rem 0.95rem;
          background: linear-gradient(to top, rgba(15, 12, 9, 0.62) 0%, rgba(15, 12, 9, 0) 100%);
          pointer-events: none;
        }

        .caption-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.45rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          line-height: 1.05;
        }

        .caption-medium {
          font-size: 0.72rem;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.82);
          margin: 0.15rem 0 0;
        }

        .carousel-dots {
          display: flex;
          gap: 0.4rem;
          pointer-events: auto;
          flex-shrink: 0;
        }

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.45);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .dot:hover {
          background: rgba(255, 255, 255, 0.8);
        }

        .dot.active {
          background: #d8b76a;
          width: 20px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
