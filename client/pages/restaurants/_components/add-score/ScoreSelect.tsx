const selectClassName =
  "min-h-11 rounded border border-gray-dark bg-white p-3 text-neutral-900";

const SCORES = Array.from({ length: 10 }, (_, index) => index + 1);

export function ScoreSelect({
  id,
  name,
  label,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  onChange: (score: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        required
        className={selectClassName}
        defaultValue=""
        aria-describedby={`${id}-help`}
        aria-required="true"
        onChange={(event) => onChange(Number(event.target.value))}
      >
        <option value="" disabled>
          Elige un número
        </option>
        {SCORES.map((score) => (
          <option key={score} value={score}>
            {score}
          </option>
        ))}
      </select>
      <p id={`${id}-help`} className="m-0 text-sm text-neutral-800">
        1 es muy mal. 10 es muy bien.
      </p>
    </div>
  );
}
