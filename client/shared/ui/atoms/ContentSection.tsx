interface ContentSectionProps {
    children: React.ReactNode
}

export default function ContentSection({
  children,
}: ContentSectionProps) {
  return (
    <section
      className="
        mx-auto
        max-w-4xl
        px-4
        py-4
        lg:py-10
        leading-relaxed
      "
    >
      {children}
    </section>
  );
}