import {
  colorPlatte,
  cssButtonReset,
  cssSansSerif,
  fontWeights,
  selectAccentColor,
  selectBackgroundColor,
  selectForegroundColor,
  selectPrimaryColor,
  styled,
} from '../../styles';

export const Wrapper = styled.button`
  ${cssButtonReset};
  display: inline-block;
  position: relative;
  white-space: nowrap;
  text-decoration: none;
  vertical-align: baseline;
  text-align: center;
  margin: 0;
  color: inherit;
  background: transparent;
  ${cssSansSerif};

  // Explicitly set the default overflow to \`visible\`. It is already set
  // on most browsers except on IE11 where it defaults to \`hidden\`.
  overflow: visible;
  cursor: pointer;
  border: none;

  &.Button--type-flat {
    font-size: 14px;
    font-weight: ${fontWeights.medium};
    padding: 0 16px;
    border-radius: 4px;
    color: ${selectForegroundColor('buttonPrimaryText')};

    // Button color
    &.Button--color-normal {
      background-color: ${selectBackgroundColor('float')};
    }
    &.Button--color-primary {
      background-color: ${selectPrimaryColor};
    }
    &.Button--color-accent {
      background-color: ${selectAccentColor};
    }
    &.Button--color-dark {
      color: ${selectForegroundColor('buttonSecondaryText')};
      background-color: ${colorPlatte.grey400};
    }

    &:disabled {
      color: ${selectForegroundColor('buttonSecondaryText')};
      background-color: ${selectBackgroundColor('disabled')};
      cursor: default;
    }

    // Button size
    &.Button--size-28 {
      line-height: 28px;
      height: 28px;

      &.Button--rounded {
        border-radius: 14px;
      }
    }
    &.Button--size-36 {
      line-height: 36px;
      height: 36px;

      &.Button--rounded {
        border-radius: 18px;
      }
    }
    &.Button--size-48 {
      line-height: 48px;
      height: 48px;

      &.Button--rounded {
        border-radius: 24px;
      }
    }
    &.Button--size-64 {
      line-height: 64px;
      height: 64px;
      font-size: 18px;

      &.Button--rounded {
        border-radius: 32px;
      }
    }
  }

  &.Button--type-icon {
    padding: 0;
    border-radius: 50%;
    background-color: transparent;

    & > .Button__content {
      width: 100%;
      height: 100%;
    }

    // Button color
    &.Button--color-normal {
      background-color: ${selectBackgroundColor('float')};
    }
    &.Button--color-primary {
      background-color: ${selectPrimaryColor};
    }
    &.Button--color-white {
      background-color: ${colorPlatte.white};
    }
    &.Button--color-accent {
      background-color: ${selectAccentColor};
    }
    &.Button--color-dark {
      background-color: ${colorPlatte.grey400};
    }

    // Button size
    &.Button--size-28 {
      line-height: 28px;
      width: 28px;
      height: 28px;
    }
    &.Button--size-36 {
      line-height: 36px;
      width: 36px;
      height: 36px;
    }
    &.Button--size-48 {
      line-height: 48px;
      width: 48px;
      height: 48px;
    }
  }
`;

export const Content = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
