import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { selectForegroundColor, styled } from '../styles';

interface Props {
  /** @default '/' */
  routePath?: string;
  className?: string;
}

function Logo({ routePath = '/', className }: Props) {
  return (
    <Wrapper to={routePath} className={className}>
      <Text>D.Studio</Text>
    </Wrapper>
  );
}

export default memo(Logo);

const Wrapper = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
`;

const Text = styled.h1`
  margin: 0;
  height: 36px;
  font-size: 36px;
  font-weight: 900;
  line-height: 36px;
  color: ${selectForegroundColor('textPrimary')};
`;
