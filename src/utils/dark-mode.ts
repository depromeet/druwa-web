export function isDarkMode() {
  return Boolean(window?.matchMedia('(prefers-color-scheme: dark)').matches);
}
