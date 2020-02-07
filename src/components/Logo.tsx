import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { fontWeights, selectForegroundColor, styled } from '../styles';

interface Props {
  /** @default 36 */
  size?: number;
  /** @default '/' */
  routePath?: string;
  className?: string;
}

function Logo({ size = 36, routePath = '/', className }: Props) {
  return (
    <Wrapper to={routePath} className={className}>
      <Text size={size}>D.Studio</Text>
    </Wrapper>
  );
}

export default memo(Logo);

const Wrapper = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
`;

const Text = styled.h1<{ size: number }>`
  margin: 0;
  height: ${p => p.size}px;
  font-size: ${p => p.size}px;
  font-weight: ${fontWeights.black};
  line-height: ${p => p.size}px;
  color: ${selectForegroundColor('textPrimary')};
`;
