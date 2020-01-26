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
          <DramaEpisodeSummaryCard
            likeCount={1205}
            dislikeCount={23}
            productionCompanyName="Samsung Electronics"
            episodeSummary="바다에 가기 위해 버스에 오른 소녀 한슬(김소혜 분). 그곳에서 한슬은 희망없이 반복되는 일상을 이기지 못하고 탈출한 기영(양동근)을 만나게 된다. 마침내 도착한 바닷가. 무엇이 그들을 바다로 이끌었을까?"
          />
        </ContentWithAside.Content>
        <ContentWithAside.Aside>Aside</ContentWithAside.Aside>
      </ContentWithAside>
      <Spacing size={200} />
    </>
  );
}
