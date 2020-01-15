import { selectAccentColor, selectPrimaryColor, styled } from '../../styles';
import { coerceCssPixelValue } from '../../utils';

export const CircleImageWrapper = styled.span<{ size: string | number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: ${p => coerceCssPixelValue(p.size)};
  height: ${p => coerceCssPixelValue(p.size)};
  border-radius: 50%;
  user-select: none;

  &.CircleImage--border-primary,
  &.CircleImage--border-accent {
    padding: 1px;
    border: 2px solid;
  }

  &.CircleImage--border-primary {
    border-color: ${selectPrimaryColor};
  }
  &.CircleImage--border-accent {
    border-color: ${selectAccentColor};
  }
`;

export const CircleImage = styled.img<{ size: string | number }>`
  display: inline-block;
  width: ${p => coerceCssPixelValue(p.size)};
  height: ${p => coerceCssPixelValue(p.size)};
  border-radius: 50%;
`;
