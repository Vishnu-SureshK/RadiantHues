import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: ReactNode;
  intro?: string;
};

export function SectionHeading({ title, intro }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}
