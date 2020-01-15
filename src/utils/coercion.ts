/** Coerces a value to a CSS pixel value. */
export function coerceCssPixelValue(value: unknown): string {
  if (value == null) {
    return '';
  }

  return typeof value === 'string' ? value : `${value}px`;
}
