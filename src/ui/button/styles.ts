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

const flatButtonRadius = {
  none: '9%',
  rounded: '50%',
} as const;

export const Wrapper = styled.button`
  ${cssButtonReset};
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
    border-radius: ${flatButtonRadius.none};
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

    // Rounded
    &.Button--rounded {
      border-radius: ${flatButtonRadius.rounded};
    }

    // Button size
    &.Button--size-28 {
      line-height: 28px;
      height: 28px;
    }
    &.Button--size-36 {
      line-height: 36px;
      height: 36px;
    }
    &.Button--size-48 {
      line-height: 48px;
      height: 48px;
    }
  }

  // TODO
  &.Button--type-icon {
    border-radius: 50%;
  }
`;

export const Content = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
