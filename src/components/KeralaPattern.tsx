'use client';

export function KeralaPattern() {
  return (
    <div className="section-divider">
      <div className="divider-line">
        <div className="divider-accent" />
      </div>
      <style jsx>{`
        .section-divider {
          width: 100%;
          padding: 3rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .divider-line {
          width: 100%;
          max-width: 1200px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(232, 229, 220, 0.3) 20%,
            rgba(232, 229, 220, 1) 50%,
            rgba(232, 229, 220, 0.3) 80%,
            transparent 100%
          );
          position: relative;
        }

        .divider-accent {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #8c4ad1, #0f8ca8, #ff6b35);
          border-radius: 999px;
          box-shadow: 0 2px 12px rgba(140, 74, 209, 0.25);
        }

        .divider-accent::before,
        .divider-accent::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 4px;
          background: #d4af37;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.4);
        }

        .divider-accent::before {
          left: -12px;
        }

        .divider-accent::after {
          right: -12px;
        }
      `}</style>
    </div>
  );
}
