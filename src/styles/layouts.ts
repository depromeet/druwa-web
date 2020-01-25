export const layouts = {
  container: 1080,
} as const;

export const cssContainerLayoutBreakpoint = `@media screen and (max-width: ${layouts.container}px)`;
