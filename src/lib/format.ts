export function formatUzPrice(amount: number): string {
  return `${amount.toLocaleString("ru-RU")} сум`;
}

export function formatSessionDate(isoDate: string): string {
  const d = new Date(isoDate + "T12:00:00");
  return d.toLocaleDateString("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}
