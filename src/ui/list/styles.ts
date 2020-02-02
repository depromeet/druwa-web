import { styled } from '../../styles';

export const Wrapper = styled.ul`
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export const Item = styled.li<{ size?: number; spacing?: number }>`
  display: block;
  width: 100%;
  height: ${p => p.size}px;
  margin: ${p => p.spacing}px 0;
`;
