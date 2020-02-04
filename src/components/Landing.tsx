import React, { memo } from 'react';
import { User } from '../models';
import { styled } from '../styles';
import MainHeader from '../containers/MainHeader';

interface Props {
  login?: User;
  className?: string;
}

function Landing({ login, className }: Props) {
  return (
    <Wrapper className={className}>
      <MainHeader transparent={true} login={login} />
    </Wrapper>
  );
}

export default memo(Landing);

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
