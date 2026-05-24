type SectionHeadingProps = {
  title: string;
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
