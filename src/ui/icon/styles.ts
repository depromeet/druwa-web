import { styled } from '../../styles';

export const IconBox = styled.i<{ width: number; height: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${p => p.width}px;
  height: ${p => p.height}px;

  & > svg {
    display: inline-block;
    width: ${p => p.width}px;
    height: ${p => p.height}px;
  }
`;
