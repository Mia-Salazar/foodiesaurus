type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="
        p-3
        border
        border-gray-dark
        rounded
        text-base
      "
    />
  );
}