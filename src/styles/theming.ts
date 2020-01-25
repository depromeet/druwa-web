import _styled, { CreateStyled } from '@emotion/styled';
import { colorPlatte } from './palette';

export interface Theme {
  readonly primary: string;
  readonly accent: string;
  readonly isDark: boolean;
  readonly foreground: {
    readonly textPrimary: string;
    readonly textSecondary: string;
    readonly textDisabled: string;
    readonly icon: string;
    readonly iconContrast: string;
    readonly buttonPrimaryText: string;
    readonly buttonSecondaryText: string;
  };
  readonly background: {
    readonly base: string;
    readonly card: string;
    readonly float: string;
    readonly textarea: string;
    readonly border: string;
    readonly disabled: string;
  };
}

export type PropsWithTheme<T = {}> = T & { theme: Theme };

export const styled = _styled as CreateStyled<Theme>;

export const selectPrimaryColor = (props: PropsWithTheme) => props.theme.primary;

export const selectAccentColor = (props: PropsWithTheme) => props.theme.accent;

export function selectBackgroundColor(key: keyof Theme['background']) {
  return (props: PropsWithTheme) => props.theme.background[key];
}

export function selectForegroundColor(key: keyof Theme['foreground']) {
  return (props: PropsWithTheme) => props.theme.foreground[key];
}

// TODO
export const defaultLightTheme: Theme = {
  primary: colorPlatte.primary,
  accent: colorPlatte.accent,
  isDark: false,
  foreground: {
    textPrimary: colorPlatte.black,
    textSecondary: '',
    textDisabled: '',
    icon: colorPlatte.black,
    iconContrast: colorPlatte.white,
    buttonPrimaryText: colorPlatte.white,
    buttonSecondaryText: '',
  },
  background: {
    base: colorPlatte.white,
    card: '',
    float: '',
    textarea: '',
    border: '',
    disabled: '',
  },
};

export const defaultDarkTheme: Theme = {
  primary: colorPlatte.primary,
  accent: colorPlatte.accent,
  isDark: true,
  foreground: {
    textPrimary: colorPlatte.white,
    textSecondary: colorPlatte.grey100,
    textDisabled: colorPlatte.grey200,
    icon: colorPlatte.black,
    iconContrast: colorPlatte.white,
    buttonPrimaryText: colorPlatte.white,
    buttonSecondaryText: colorPlatte.grey100,
  },
  background: {
    base: colorPlatte.grey500,
    card: colorPlatte.grey400,
    float: colorPlatte.grey200,
    textarea: colorPlatte.grey300,
    border: colorPlatte.grey300,
    disabled: colorPlatte.grey300,
  },
};
