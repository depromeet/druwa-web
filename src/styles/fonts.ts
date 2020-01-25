import { css } from '@emotion/core';

export enum FontFamily {
  SansSerif = 'sans-serif',
}

export const cssSansSerif = css`
  font-family: Roboto, 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Apple SD Gothic Neo, 'Helvetica Neue', Arial, sans-serif;
`;

export type FontSize = 'small' | 'regular' | 'medium' | 'big';
export type FontWeight = 'regular' | 'medium' | 'bold' | 'black';
export type LinHeight = 'normal' | 'condensed';

export const fontSizes: Readonly<Record<FontSize, number>> = {
  small: 12,
  regular: 14,
  medium: 16,
  big: 20,
};

export const fontWeights: Readonly<Record<FontWeight, number>> = {
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
};

export const lineHeights: Readonly<Record<LinHeight, number>> = {
  normal: 1.43,
  condensed: 1.17,
};
