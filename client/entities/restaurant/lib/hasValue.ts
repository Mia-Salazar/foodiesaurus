export function hasValue(value?: string): value is string {
  const trimmed = value?.trim();
  return Boolean(trimmed) && trimmed !== "0";
}
