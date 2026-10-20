export function hasValue(value?: string) {
  const trimmed = value?.trim();
  return Boolean(trimmed) && trimmed !== "0";
}
