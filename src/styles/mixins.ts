import { css } from '@emotion/core';

export const cssButtonReset = css`
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
  // The \`outline: none\` from above works on all browsers, however Firefox also
  // adds a special \`focus-inner\` which we have to disable explicitly. See:
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Firefox
  &::-moz-focus-inner {
    border: 0;
  }
`;

export const cssVisuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip: rect(0, 0, 0, 0);
`;

export const cssHideScrollbar = css`
  &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
    width: 0 !important;
    height: 0 !important;
  }
`;

export const cssTextEllipsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
