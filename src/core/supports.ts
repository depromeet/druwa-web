export function supportsElementScroll() {
  const root = document.getElementById('root');

  return typeof root?.scroll === 'function';
}
