import { fontSizes, fontWeights, lineHeights, selectForegroundColor, styled } from '../../styles';

const textFieldSize = 56;

export const InputBox = styled.label`
  display: block;
`;

export const Input = styled.input`
  display: inline-flex;
  align-items: center;
  background: transparent;
  outline: 0;
  width: 100%;
  height: ${textFieldSize}px;
  padding: 0 20px;
  font-size: ${fontSizes.medium}px;
  font-weight: ${fontWeights.regular};
  line-height: ${lineHeights.condensed};
  color: ${selectForegroundColor('textPrimary')};
  border: none;
  border-bottom: 1px solid #565656;

  &::placeholder {
    color: #565656;
  }

  &.TextField__input--errorCaught {
    border: 1px solid #ff3b58;
  }
`;

export const ErrorMessage = styled.span`
  margin-top: 9px;
  display: block;
  font-size: ${fontSizes.regular}px;
  font-weight: ${fontWeights.regular};
  line-height: ${lineHeights.condensed};
  color: #ff3b58;
`;
