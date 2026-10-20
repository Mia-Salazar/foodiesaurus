interface SkipToContentProps {
  targetId?: string;
  label?: string;
}

export default function SkipToContent({
  targetId = "main",
  label = "Saltar al contenido",
}: SkipToContentProps) {
  return (
    <a
      href={`#${targetId}`}
      className="
        absolute
        left-4
        top-0
        z-50
        min-h-11
        -translate-y-full
        rounded
        bg-foodiesaurus
        px-4
        py-2
        font-bold
        text-white
        focus:translate-y-4
      "
    >
      {label}
    </a>
  );
}
