const presetColors = [
  "#3b82f6",
  "#10b981",
  "#ef4444",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
];

export function generateLegendFromRT(rtNames: string[]) {
  const unique = Array.from(new Set(rtNames));
  return unique.map((name, i) => ({
    name,
    color: presetColors[i % presetColors.length],
  }));
}
