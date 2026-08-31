import type { ReactNode } from "react";

interface Props {
  script?: string;
  title: ReactNode;
}

export default function SectionHeading({ script, title }: Props) {
  return (
    <div className="mb-12 text-center">
      {script && <p className="font-script text-3xl text-primary">{script}</p>}
      <h2 className="mt-1 font-serif text-3xl font-bold sm:text-4xl">{title}</h2>
    </div>
  );
}