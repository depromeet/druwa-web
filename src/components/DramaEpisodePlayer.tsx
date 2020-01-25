import React, { memo } from 'react';
import { useYoutubePlayer } from '../core';
import { deployUrl } from '../environment';
import { styled } from '../styles';

let uniqueId = 0;

interface Props {
  id?: string;
  videoId: string;
  className?: string;
}

// TODO: 썸네일 추가
function DramaEpisodePlayer({
  id = `drama-episode-player-${uniqueId++}`,
  videoId,
  className,
}: Props) {
  useYoutubePlayer(id, videoId, {
    width: 854,
    height: 481,
    playerVars: {
      autoplay: 0,
      color: 'white',
      fs: 0,
      enablejsapi: 1,
      origin: deployUrl,
    },
    onStateChange(state) {
      // TODO: 재생시간 추적. polling + state 변화로
      console.log(state);
    },
  });

  return (
    <Wrapper className={className}>
      <Inner id={id} />
    </Wrapper>
  );
}

export default memo(DramaEpisodePlayer);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  min-height: 481px;
`;

const Inner = styled.div`
  display: block;
`;
