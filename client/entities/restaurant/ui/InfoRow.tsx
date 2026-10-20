import type { ReactNode } from "react";

export function InfoRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span
        className="
          mt-0.5
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-md
          bg-foodiesaurus/10
          text-foodiesaurus
        "
        aria-hidden
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="m-0 text-xs font-semibold uppercase tracking-wide text-neutral-600">
          {label}
        </p>
        <div className="mt-0.5 text-sm leading-relaxed text-neutral-800 break-words">
          {children}
        </div>
      </div>
    </div>
  );
}
