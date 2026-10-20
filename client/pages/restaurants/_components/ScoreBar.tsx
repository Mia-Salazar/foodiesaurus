interface ScoreBarProps {
  value: number;
  max?: 10 | 100;
  label: string;
}

export function ScoreBar({ value, max = 10, label }: ScoreBarProps) {
  const percent = max === 100 ? Math.min(value, 100) : Math.min(value * 10, 100);
  const display = max === 100 ? `${value}%` : String(value);

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="m-0 text-sm font-semibold text-neutral-800">{label}</p>
        <p className="m-0 shrink-0 text-sm tabular-nums">
          <span className="font-semibold text-foodiesaurus">{display}</span>
          {max === 10 && <span className="text-neutral-400">/10</span>}
        </p>
      </div>
      <div
        className="relative h-2.5 overflow-hidden rounded-full bg-neutral-100"
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-foodiesaurus"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
