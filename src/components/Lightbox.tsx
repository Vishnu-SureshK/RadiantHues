"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type LightboxProps = {
  src: string;
  alt: string;
  onClose: () => void;
};

export function Lightbox({ src, alt, onClose }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "zoom-out",
        animation: "lbFadeIn 0.2s ease",
      }}
    >
      <style>{`@keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>

      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        style={{
          position: "absolute",
          top: "1rem",
          right: "1.5rem",
          background: "linear-gradient(135deg, #a855f7, #3b82f6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          border: "none",
          fontSize: "3rem",
          fontWeight: 700,
          lineHeight: 1,
          cursor: "pointer",
          zIndex: 1000000,
          padding: "0.25rem 0.5rem",
          fontFamily: "Arial, sans-serif",
          filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.8))",
        }}
      >
        ✕
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          cursor: "default",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "contain" }}
          sizes="100vw"
          priority
        />
      </div>
    </div>,
    document.body
  );
}
