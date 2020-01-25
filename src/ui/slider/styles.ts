import { animated } from 'react-spring';
import { cssHideScrollbar, styled } from '../../styles';

export const Wrapper = styled.section`
  position: relative;
  width: 100%;
`;

export const ListItem = styled(animated.li)<{ size?: number; spacing?: number }>`
  display: inline-block;
  width: ${p => p.size}px;
  margin: 0 ${p => p.spacing}px;
  vertical-align: top;
`;

export const List = styled.ul<{ spacing: number }>`
  display: block;
  list-style: none;
  margin: 0;
  padding: 0 ${p => p.spacing}px;
  white-space: nowrap;
  overflow: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  ${cssHideScrollbar};
`;

export const NavWrapper = styled(animated.div)<{ align: 'left' | 'right' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  position: absolute;
  ${p => (p.align === 'left' ? 'left: 0' : p.align === 'right' ? 'right: 0' : '')};
  top: 0;
  bottom: 0;
  height: 100%;
`;
