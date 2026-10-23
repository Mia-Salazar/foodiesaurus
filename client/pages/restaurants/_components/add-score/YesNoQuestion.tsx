export function YesNoQuestion({
  name,
  legend,
  onChange,
}: {
  name: string;
  legend: string;
  onChange?: (yes: boolean) => void;
}) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mb-2">{legend}</legend>
      <div className="flex gap-6">
        {[
          { value: "yes", label: "Sí" },
          { value: "no", label: "No" },
        ].map((option) => (
          <label
            key={option.value}
            className="flex min-h-11 items-center gap-2"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              required
              className="h-5 w-5 accent-foodiesaurus"
              onChange={() => onChange?.(option.value === "yes")}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
