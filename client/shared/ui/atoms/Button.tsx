interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  variant="primary",
  type="button",
  className,
  disabled=false
}:ButtonProps){

  const variants = {
    primary:
      `
      bg-foodiesaurus-secondary
      text-white
      hover:opacity-80
      `,
    secondary:
      `
      border
      border-foodiesaurus-secondary
      text-foodiesaurus-secondary
      bg-transparent
      hover:opacity-80
      `,

    ghost:
      `
      border
      border-foodiesaurus-secondary
      text-foodiesaurus-secondary
      bg-transparent
      `
  };
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
      px-5
      py-2.5
      rounded
      font-bold
      text-sm
      min-h-11
      w-full
      transition
      disabled:cursor-not-allowed
      disabled:opacity-50
      ${variants[variant]}
      ${className}
      `}
    >
      {children}
    </button>
  )
}