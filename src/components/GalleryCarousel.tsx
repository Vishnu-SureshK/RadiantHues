'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

type ArtworkImage = {
  src: string;
  title: string;
  artist: string;
};

const GALLERY_IMAGES: ArtworkImage[] = [
  {
    src: '/images/artwork-rainy-evening.webp',
    title: 'Rainy Evening Walk',
    artist: 'Gayathri Suresh'
  },
  {
    src: '/images/artwork-autumn-landscape.webp',
    title: 'Golden Marsh at Dusk',
    artist: 'Gayathri Suresh'
  },
  {
    src: '/images/artwork-kerala-lamp.webp',
    title: 'Kerala Nilavilakku',
    artist: 'Gayathri Suresh'
  },
  {
    src: '/images/artwork-hot-air-balloons.jpg',
    title: 'RadheKrishna',
    artist: 'Gayathri Suresh'
  }
];

export function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  // Start with the unshuffled order so server and client markup match, then shuffle after mount
  const [shuffledImages, setShuffledImages] = useState<ArtworkImage[]>(GALLERY_IMAGES);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // One-time client-only shuffle to avoid SSR/client hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShuffledImages([...GALLERY_IMAGES].sort(() => Math.random() - 0.5));
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (isHovered || shuffledImages.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffledImages.length);
    }, 4000); // Change image every 4 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, shuffledImages.length]);

  if (shuffledImages.length === 0) return null;

  return (
    <div
      className="gallery-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-wrapper">
        {shuffledImages.map((image, index) => {
          const offset = index - currentIndex;
          const isActive = index === currentIndex;
          const isNext = offset === 1 || (currentIndex === shuffledImages.length - 1 && index === 0);
          const isPrev = offset === -1 || (currentIndex === 0 && index === shuffledImages.length - 1);
          const isVisible = isActive || isNext || isPrev;

          if (!isVisible) return null;

          return (
            <div
              key={`${image.src}-${index}`}
              className={`carousel-slide ${isActive ? 'active' : ''} ${isNext ? 'next' : ''} ${isPrev ? 'prev' : ''}`}
              style={{
                transform: `translateX(${offset * 100}%)`,
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 2 : 1
              }}
            >
              <div className="image-container">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "contain", background: "#f5f2ed" }}
                  priority={index < 3}
                />
                <div className="image-overlay">
                  <div className="image-caption">
                    <p className="image-title">{image.title}</p>
                    <p className="image-artist">{image.artist}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="carousel-dots">
        {shuffledImages.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Ambient glow effect */}
      <div className="ambient-glow" />

      <style jsx>{`
        .gallery-carousel {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 1.1rem;
          background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
        }

        .carousel-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .carousel-slide {
          position: absolute;
          inset: 0;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease;
          will-change: transform, opacity;
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .carousel-image {
          object-fit: contain;
          background: #f5f2ed;
        }

        @keyframes kenBurns {
          0% {
            transform: scale(1) translateX(0) translateY(0);
          }
          50% {
            transform: scale(1.1) translateX(-2%) translateY(-2%);
          }
          100% {
            transform: scale(1.05) translateX(2%) translateY(2%);
          }
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            transparent 100%
          );
          padding: 2rem 1.5rem 1.5rem;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .carousel-slide.active:hover .image-overlay {
          opacity: 1;
        }

        .image-caption {
          color: white;
          text-align: left;
        }

        .image-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 0.3rem;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .image-artist {
          font-size: 0.85rem;
          opacity: 0.9;
          margin: 0;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        }

        .carousel-dots {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 10;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
          backdrop-filter: blur(4px);
        }

        .dot:hover {
          background: rgba(255, 255, 255, 0.7);
          transform: scale(1.2);
        }

        .dot.active {
          background: linear-gradient(135deg, #d4af37, #f0d98f);
          width: 24px;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(212, 175, 55, 0.4);
        }

        .ambient-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80%;
          height: 80%;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            rgba(140, 74, 209, 0.08) 0%,
            rgba(15, 140, 168, 0.06) 50%,
            transparent 100%
          );
          filter: blur(40px);
          pointer-events: none;
          z-index: 0;
          animation: pulse 8s infinite ease-in-out;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @media (max-width: 768px) {
          .carousel-slide {
            width: 95%;
            height: 95%;
          }

          .image-title {
            font-size: 0.95rem;
          }

          .image-artist {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
