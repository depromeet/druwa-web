import { animated } from 'react-spring';
import { selectBackgroundColor, styled } from '../../styles';

export const DialogContainer = styled.div<{ show?: boolean }>`
  display: ${p => (p.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
`;

export const Dimmer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 28px;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.65);
`;

export const DialogCard = styled(animated.div)`
  margin: 0 auto;
  max-width: 85%;
  min-height: 184px;
  border-radius: 4px;
  background-color: ${selectBackgroundColor('card')};
  overflow-y: auto;
`;
