import React from 'react';
import TextWriter from '../components/TextWriter';
import { styled } from '../styles';

export default function DramaEpisodeCommentSection() {
  return (
    <Wrapper>
      <TextWriter maxLength={300} placeholder="댓글을 작성하세요" />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
