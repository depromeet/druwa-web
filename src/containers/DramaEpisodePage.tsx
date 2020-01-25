import { css } from '@emotion/core';
import React from 'react';
import DramaEpisodePlayer from '../components/DramaEpisodePlayer';
import DramaEpisodeTitle from '../components/DramaEpisodeTitle';

export default function DramaEpisodePage() {
  return (
    <>
      <DramaEpisodeTitle
        title="최고의 선물 - 인연과 악연 사이"
        episodeNumber={2}
        durationInMillis={12100000}
        css={css`
          padding: 47px 0 30px 0;
        `}
      />
      <DramaEpisodePlayer videoId="JqY0sFJFVGE" />
    </>
  );
}
