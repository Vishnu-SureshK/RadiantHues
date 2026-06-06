'use client';

import { useEffect, useRef } from 'react';

const KERALA_COLORS = [
  { primary: '#0f8ca8', secondary: '#5bc8dc', tertiary: '#084d5e', name: 'Monsoon Teal' },
  { primary: '#ff6b35', secondary: '#ffa07a', tertiary: '#cc3d14', name: 'Spice Orange' },
  { primary: '#8c4ad1', secondary: '#b98ae6', tertiary: '#5a2a85', name: 'Lotus Purple' },
  { primary: '#d4af37', secondary: '#f0d98f', tertiary: '#9d7d1f', name: 'Temple Gold' },
  { primary: '#c41e3a', secondary: '#e85670', tertiary: '#8b0e24', name: 'Festival Red' }
];

type Splatter = {
  x: number;
  y: number;
  size: number;
  colorScheme: typeof KERALA_COLORS[0];
  blobs: Array<{
    x: number;
    y: number;
    radius: number;
    opacity: number;
  }>;
  droplets: Array<{
    x: number;
    y: number;
    radius: number;
  }>;
};

type Drip = {
  x: number;
  startY: number;
  currentY: number;
  speed: number;
  width: number;
  maxWidth: number;
  color: string;
  opacity: number;
  wiggle: number;
};

export function PaintSplatter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const splattersRef = useRef<Splatter[]>([]);
  const dripsRef = useRef<Drip[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate watercolor splatters
    const generateSplatters = () => {
      const splatters: Splatter[] = [];
      const numSplatters = 4 + Math.floor(Math.random() * 3); // 4-7 major splatters

      for (let i = 0; i < numSplatters; i++) {
        const colorScheme = KERALA_COLORS[Math.floor(Math.random() * KERALA_COLORS.length)];
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height * 0.7); // Upper 70%
        const size = 100 + Math.random() * 180;

        // Generate organic blob cluster
        const numBlobs = 6 + Math.floor(Math.random() * 8);
        const blobs = [];
        for (let j = 0; j < numBlobs; j++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * size;
          blobs.push({
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            radius: Math.max(15, 25 + Math.random() * size * 0.4),
            opacity: 0.08 + Math.random() * 0.18
          });
        }

        // Generate surrounding droplets
        const numDroplets = 10 + Math.floor(Math.random() * 15);
        const droplets = [];
        for (let j = 0; j < numDroplets; j++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = size * (1 + Math.random() * 0.7);
          droplets.push({
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            radius: Math.max(2, 3 + Math.random() * 6)
          });
        }

        splatters.push({ x, y, size, colorScheme, blobs, droplets });
      }

      splattersRef.current = splatters;
    };

    // Generate drips
    const generateDrips = () => {
      const drips: Drip[] = [];
      const numDrips = 5 + Math.floor(Math.random() * 4);

      for (let i = 0; i < numDrips; i++) {
        const colorScheme = KERALA_COLORS[Math.floor(Math.random() * KERALA_COLORS.length)];
        drips.push({
          x: Math.random() * canvas.width,
          startY: Math.random() * (canvas.height * 0.25),
          currentY: Math.random() * (canvas.height * 0.25),
          speed: 0.15 + Math.random() * 0.35,
          width: 2 + Math.random() * 3,
          maxWidth: 6 + Math.random() * 10,
          color: colorScheme.primary,
          opacity: 0.12 + Math.random() * 0.15,
          wiggle: Math.random() * 2
        });
      }

      dripsRef.current = drips;
    };

    generateSplatters();
    generateDrips();

    // Render splatters
    const renderSplatters = () => {
      splattersRef.current.forEach(splatter => {
        const { x, y, colorScheme, blobs, droplets } = splatter;

        // Draw main blob cluster with watercolor effect
        blobs.forEach(blob => {
          const gradient = ctx.createRadialGradient(
            x + blob.x, y + blob.y, 0,
            x + blob.x, y + blob.y, blob.radius
          );

          gradient.addColorStop(0, `${colorScheme.primary}${Math.floor(blob.opacity * 255).toString(16).padStart(2, '0')}`);
          gradient.addColorStop(0.5, `${colorScheme.secondary}${Math.floor(blob.opacity * 0.6 * 255).toString(16).padStart(2, '0')}`);
          gradient.addColorStop(1, `${colorScheme.primary}00`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x + blob.x, y + blob.y, blob.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw droplets
        droplets.forEach(droplet => {
          ctx.fillStyle = `${colorScheme.primary}40`;
          ctx.beginPath();
          ctx.arc(x + droplet.x, y + droplet.y, droplet.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    };

    // Animate drips
    const animateDrips = () => {
      dripsRef.current.forEach(drip => {
        drip.currentY += drip.speed;

        // Reset when off screen
        if (drip.currentY > canvas.height + 100) {
          drip.currentY = drip.startY;
        }

        // Calculate drip width (wider at top, narrower as it falls)
        const progress = (drip.currentY - drip.startY) / canvas.height;
        const currentWidth = Math.max(1, drip.width + (drip.maxWidth - drip.width) * Math.sin(progress * Math.PI));

        // Draw drip with variable width and wiggle
        const wiggleOffset = Math.sin(drip.currentY * 0.02) * drip.wiggle;

        const gradient = ctx.createLinearGradient(
          drip.x + wiggleOffset, drip.startY,
          drip.x + wiggleOffset, drip.currentY
        );
        gradient.addColorStop(0, `${drip.color}${Math.floor(drip.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.7, `${drip.color}${Math.floor(drip.opacity * 0.5 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${drip.color}00`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = currentWidth;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(drip.x + wiggleOffset, drip.startY);
        ctx.lineTo(drip.x + wiggleOffset, drip.currentY);
        ctx.stroke();

        // Draw drip bulb at bottom
        const bulbGradient = ctx.createRadialGradient(
          drip.x + wiggleOffset, drip.currentY, 0,
          drip.x + wiggleOffset, drip.currentY, currentWidth * 1.5
        );
        bulbGradient.addColorStop(0, `${drip.color}${Math.floor(drip.opacity * 255).toString(16).padStart(2, '0')}`);
        bulbGradient.addColorStop(1, `${drip.color}00`);

        ctx.fillStyle = bulbGradient;
        ctx.beginPath();
        ctx.arc(drip.x + wiggleOffset, drip.currentY, currentWidth * 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      renderSplatters();
      animateDrips();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
