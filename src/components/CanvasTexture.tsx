'use client';

export function CanvasTexture() {
  return (
    <>
      <div className="canvas-texture" />
      <style jsx>{`
        .canvas-texture {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          background-image:
            repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.03) 0px,
              transparent 1px,
              transparent 2px,
              rgba(0, 0, 0, 0.03) 3px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.03) 0px,
              transparent 1px,
              transparent 2px,
              rgba(0, 0, 0, 0.03) 3px
            );
          opacity: 0.3;
          mix-blend-mode: multiply;
        }
      `}</style>
    </>
  );
}
