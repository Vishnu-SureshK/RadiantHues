type MediaPlaceholderProps = {
  label: string;
  variant?: "hero" | "banner" | "portrait" | "card";
  className?: string;
};

export function MediaPlaceholder({ label, variant = "card", className }: MediaPlaceholderProps) {
  return (
    <div
      className={`media-placeholder media-placeholder--${variant} ${className ?? ""}`.trim()}
      role="img"
      aria-label={label}
    >
      <span className="media-placeholder__label">{label}</span>
    </div>
  );
}
