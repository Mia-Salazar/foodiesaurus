export function Fact({ label, value }: { label: string; value: string }) {
  return (
    <li className="rounded bg-neutral-50 px-2.5 py-1 text-sm text-neutral-800">
      <span className="font-semibold">{label}: </span>
      {value}
    </li>
  );
}
