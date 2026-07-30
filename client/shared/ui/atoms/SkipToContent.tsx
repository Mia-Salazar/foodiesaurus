import React from "react";

interface SkipToContentProps {
  targetId?: string;
  label?: string;
  className?: string;
}

const SkipToContent: React.FC<SkipToContentProps> = ({
  targetId = "main",
  label = "Saltar al contenido",
  className = "",
}) => {
  return (
    <a
      href={`#${targetId}`}
      className={`
        absolute
        left-1/2
        top-[-50%]
        -translate-y-full
        transition-transform
        duration-300
        bg-[var(--secondaryColor)]
        text-[var(--white)]
        h-[1.875rem]
        px-4
        pt-[0.688rem]
        pb-0
        z-50

        focus:left-0
        focus:top-0
        focus:translate-y-0

        ${className}
      `}
    >
      {label}
    </a>
  );
};

export default SkipToContent;