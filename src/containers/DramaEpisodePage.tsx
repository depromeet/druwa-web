import { css } from '@emotion/core';
import React from 'react';
import DramaEpisodePlayer from '../components/DramaEpisodePlayer';
import DramaEpisodeSummaryCard from '../components/DramaEpisodeSummaryCard';
import DramaEpisodeTitle from '../components/DramaEpisodeTitle';
import Spacing from '../components/Spacing';
import { ContentWithAside } from '../ui/layout/ContentWithAside';

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
      <ContentWithAside
        asideSize={322}
        spacing={8}
        css={css`
          margin-top: 61px;
        `}
      >
        <ContentWithAside.Content>
          <DramaEpisodeSummaryCard />
        </ContentWithAside.Content>
        <ContentWithAside.Aside>Aside</ContentWithAside.Aside>
      </ContentWithAside>
      <Spacing size={200} />
    </>
  );
}
