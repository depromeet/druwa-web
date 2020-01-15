import { selectBackgroundColor, styled } from '../../styles';
import { coerceCssPixelValue } from '../../utils';

export const Wrapper = styled.div`
  display: block;
  border: 1px solid ${selectBackgroundColor('border')};
  border-radius: 4px;
  background-color: ${selectBackgroundColor('card')};
  overflow: hidden;
`;

const HEAD_SIZE = 44;

export const Head = styled.div`
  display: flex;
  width: 100%;
  height: ${HEAD_SIZE}px;
  justify-content: space-between;
  background-color: ${selectBackgroundColor('card')};
  border-bottom: 1px solid ${selectBackgroundColor('border')};
`;

export const HeadItem = styled.div<{
  paddingLeft?: string | number;
  paddingRight?: string | number;
}>`
  display: inline-flex;
  ${p =>
    p.paddingLeft !== undefined ? `padding-left: ${coerceCssPixelValue(p.paddingLeft)}` : ''};
  ${p =>
    p.paddingRight !== undefined ? `padding-right: ${coerceCssPixelValue(p.paddingRight)}` : ''};
  align-items: center;
  height: 100%;
`;

export const Content = styled.div<{
  paddingLeft?: string | number;
  paddingRight?: string | number;
  paddingTop?: string | number;
  paddingBottom?: string | number;
}>`
  ${p =>
    p.paddingLeft !== undefined ? `padding-left: ${coerceCssPixelValue(p.paddingLeft)}` : ''};
  ${p =>
    p.paddingRight !== undefined ? `padding-right: ${coerceCssPixelValue(p.paddingRight)}` : ''};
  ${p => (p.paddingTop !== undefined ? `padding-top: ${coerceCssPixelValue(p.paddingTop)}` : '')};
  ${p =>
    p.paddingBottom !== undefined ? `padding-bottom: ${coerceCssPixelValue(p.paddingBottom)}` : ''};
  background-color: ${selectBackgroundColor('card')};
`;
