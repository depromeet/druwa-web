import { css } from '@emotion/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DramaEpisodePlayer from '../components/DramaEpisodePlayer';
import { DramaEpisodePlaylist, DramaEpisodePlaylistItem } from '../components/DramaEpisodePlaylist';
import DramaEpisodeSummaryCard from '../components/DramaEpisodeSummaryCard';
import DramaEpisodeTitle from '../components/DramaEpisodeTitle';
import Spacing from '../components/Spacing';
import { fetchDramaWithEpisodeActions } from '../stores/actions';
import { selectDrama, selectDramaEpisode } from '../stores/selectors';
import { styled } from '../styles';
import { Card } from '../ui/card';
import { ContentWithAside } from '../ui/layout/ContentWithAside';
import DramaEpisodeCommentSection from './DramaEpisodeCommentSection';

export default function DramaEpisodePage() {
  const { dramaId, episodeId } = useParams<{ dramaId: string; episodeId: string }>();
  const dispatch = useDispatch();

  const drama = useSelector(selectDrama);
  const dramaEpisode = useSelector(selectDramaEpisode);

  useEffect(() => {
    dispatch(
      fetchDramaWithEpisodeActions.request({
        dramaId: +dramaId,
        episodeId: +episodeId,
      }),
    );
  }, [dramaId, episodeId, dispatch]);

  if (drama === null || dramaEpisode === null) {
    return <Wrapper />;
  }

  return (
    <Wrapper>
      <DramaEpisodeTitle
        title={dramaEpisode.title}
        episodeNumber={dramaEpisode.number}
        durationInMillis={dramaEpisode.durationInMillis}
        css={css`
          padding: 47px 0 30px 0;
        `}
      />
      <DramaEpisodePlayer videoId={dramaEpisode.youtubePlayId} />
      <ContentWithAside
        asideSize={322}
        spacing={8}
        css={css`
          margin-top: 61px;
        `}
      >
        <ContentWithAside.Content>
          <DramaEpisodeSummaryCard
            likeCount={dramaEpisode.likeCount}
            dislikeCount={dramaEpisode.dislikeCount}
            productionCompanyName={drama.productionCompany}
            episodeSummary={dramaEpisode.summary}
          />
        </ContentWithAside.Content>
        <ContentWithAside.Aside>
          <Card
            css={css`
              height: 556px;
            `}
          >
            <DramaEpisodePlaylist scrollIndexTo={5}>
              <DramaEpisodePlaylistItem
                thumbnailImageUrl="/assets/images/drama-episode-thumbnail-placeholder@2x.png"
                episodeNumber={1}
                episodeTitle="굳세어라 청춘"
              />
              <DramaEpisodePlaylistItem
                thumbnailImageUrl="/assets/images/drama-episode-thumbnail-placeholder@2x.png"
                episodeNumber={2}
                episodeTitle="밀당의 기술"
              />
              <DramaEpisodePlaylistItem
                thumbnailImageUrl="/assets/images/drama-episode-thumbnail-placeholder@2x.png"
                episodeNumber={3}
                episodeTitle="밀당의 기술"
              />
              <DramaEpisodePlaylistItem
                thumbnailImageUrl="/assets/images/drama-episode-thumbnail-placeholder@2x.png"
                episodeNumber={3}
                episodeTitle="밀당의 기술"
              />
              <DramaEpisodePlaylistItem
                thumbnailImageUrl="/assets/images/drama-episode-thumbnail-placeholder@2x.png"
                episodeNumber={3}
                episodeTitle="밀당의 기술"
              />
              <DramaEpisodePlaylistItem
                thumbnailImageUrl="/assets/images/drama-episode-thumbnail-placeholder@2x.png"
                episodeNumber={3}
                episodeTitle="밀당의 기술"
              />
              <DramaEpisodePlaylistItem
                thumbnailImageUrl="/assets/images/drama-episode-thumbnail-placeholder@2x.png"
                episodeNumber={3}
                episodeTitle="밀당의 기술"
              />
              <DramaEpisodePlaylistItem
                thumbnailImageUrl="/assets/images/drama-episode-thumbnail-placeholder@2x.png"
                episodeNumber={3}
                episodeTitle="밀당의 기술"
              />
              <DramaEpisodePlaylistItem
                thumbnailImageUrl="/assets/images/drama-episode-thumbnail-placeholder@2x.png"
                episodeNumber={3}
                episodeTitle="밀당의 기술"
              />
              <DramaEpisodePlaylistItem
                thumbnailImageUrl="/assets/images/drama-episode-thumbnail-placeholder@2x.png"
                episodeNumber={3}
                episodeTitle="밀당의 기술"
              />
              <DramaEpisodePlaylistItem
                thumbnailImageUrl="/assets/images/drama-episode-thumbnail-placeholder@2x.png"
                episodeNumber={3}
                episodeTitle="밀당의 기술"
              />
              <DramaEpisodePlaylistItem
                thumbnailImageUrl="/assets/images/drama-episode-thumbnail-placeholder@2x.png"
                episodeNumber={3}
                episodeTitle="밀당의 기술"
              />
            </DramaEpisodePlaylist>
          </Card>
        </ContentWithAside.Aside>
      </ContentWithAside>
      <ContentWithAside asideSize={322} spacing={8}>
        <ContentWithAside.Content>
          <Card>
            <Card.Head size={60} />
            <Card.Content>
              <DramaEpisodeCommentSection />
            </Card.Content>
          </Card>
        </ContentWithAside.Content>
        <ContentWithAside.Aside>Aside</ContentWithAside.Aside>
      </ContentWithAside>
      <Spacing size={200} />
    </Wrapper>
  );
}

const Wrapper = styled.article`
  min-height: 100vh;
`;
