import { css } from '@emotion/core';

export const layouts = {
  container: 1080,
} as const;

export const cssContainerLayoutBreakpoint = css`
  @media screen (max-width: ${layouts.container}px);
`;
