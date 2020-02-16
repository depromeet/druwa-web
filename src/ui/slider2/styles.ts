import { animated } from 'react-spring';
import { styled } from '../../styles';

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const List = styled(animated.ul)`
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  white-space: nowrap;
`;

export const ListItem = styled(animated.li)<{ size?: string; spacing: number }>`
  display: inline-block;
  width: calc(${p => `${p.size} - ${p.spacing * 2}px`});
  margin: 0 ${p => p.spacing}px;
  vertical-align: top;
`;
