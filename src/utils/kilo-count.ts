export function formatKiloCount(count: number, fractionDigits: number = 2) {
  if (count < 1000) {
    return count.toString();
  }

  return `${(count / 1000).toFixed(fractionDigits)}K`;
}
