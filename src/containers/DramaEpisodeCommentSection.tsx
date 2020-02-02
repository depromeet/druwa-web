import React from 'react';
import CommentWriter from '../components/CommentWriter';
import { styled } from '../styles';

export default function DramaEpisodeCommentSection() {
  return (
    <Wrapper>
      <CommentWriter maxLength={300} placeholder="댓글을 작성하세요" />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
