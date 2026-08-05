interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  className?: string;
}

export default function Button({
  children,
  variant="primary",
  type="button",
  className
}:ButtonProps){

  const variants = {
    primary:
      `
      bg-foodiesaurus-purple
      text-white
      hover:opacity-80
      `,
    secondary:
      `
      border
      border-foodiesaurus-purple
      text-foodiesaurus-purple
      bg-transparent
      hover:opacity-80
      `,

    ghost:
      `
      border
      border-foodiesaurus-purple
      text-foodiesaurus-purple
      bg-transparent
      `
  };
  return (
    <button
      type={type}
      className={`
      px-5
      py-2.5
      rounded
      font-bold
      text-sm
      h-10
      w-full
      transition
      ${variants[variant]}
      ${className}
      `}
    >
      {children}
    </button>
  )
}