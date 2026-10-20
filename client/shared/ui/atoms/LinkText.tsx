interface LinkTextProps {
  href: string,
  children: React.ReactNode
}

export default function LinkText({
  href,
  children,
}: LinkTextProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        text-foodiesaurus
        underline
        hover:opacity-80
      "
    >
      {children}
      <span className="sr-only"> (se abre en otra pestaña)</span>
    </a>
  );
}