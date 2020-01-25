import { cssContainerLayoutBreakpoint, layouts, styled } from '../../../styles';

export const Wrapper = styled.div<{ spacing: number }>`
  width: 100%;
  max-width: ${layouts.container}px;
  margin: 0 auto;
  overflow: hidden;
  contain: layout style;

  ${cssContainerLayoutBreakpoint} {
    padding: 0 ${p => p.spacing}px;
  }
`;

export const Container = styled.div<{ spacing: number; asideSize: number }>`
  display: flex;
  align-items: flex-start;
  margin: 0 -${p => p.spacing / 2}px;
  width: 100%;

  ${cssContainerLayoutBreakpoint} {
    margin: 0;
  }

  @media screen and (max-width: ${p => p.asideSize * 2}px) {
    flex-direction: column;
  }
`;

export const Content = styled.div<{ spacing: number; asideSize: number }>`
  flex: 1 1 auto;
  min-width: 0;
  margin: 0 ${p => p.spacing / 2}px;

  @media screen and (max-width: ${p => p.asideSize * 2}px) {
    flex: none;
  }
`;

export const Aside = styled.div<{ spacing: number; asideSize: number }>`
  flex: none;
  width: ${p => p.asideSize}px;
  margin: 0 ${p => p.spacing / 2}px;
`;
