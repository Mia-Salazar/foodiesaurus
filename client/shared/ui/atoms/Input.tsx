type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isGhost?: boolean;
};

export default function Input({ isGhost, className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`
        p-3
        border
        border-gray-dark
        rounded
        text-base
        ${isGhost ? "bg-white text-neutral-900 placeholder-neutral-800" : ""}
        ${className ?? ""}
      `}
    />
  );
}