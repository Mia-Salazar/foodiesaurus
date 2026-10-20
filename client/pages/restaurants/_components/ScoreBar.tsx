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
      <h5 className="mb-2.5 text-sm font-semibold">{label}</h5>
      <div className="flex items-center gap-2">
        <div
          className="relative h-4 w-full bg-[#eff2f5]"
          role="meter"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value}
        >
          <span
            className="absolute inset-y-0 left-0 bg-foodiesaurus"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="font-semibold tabular-nums">{display}</span>
        {max === 10 && <span className="text-neutral-500">/10</span>}
      </div>
    </div>
  );
}
