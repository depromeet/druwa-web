import { css } from '@emotion/core';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DramaEpisodePlayer from '../components/DramaEpisodePlayer';
import { DramaEpisodePlaylist, DramaEpisodePlaylistItem } from '../components/DramaEpisodePlaylist';
import DramaEpisodeSummaryCard from '../components/DramaEpisodeSummaryCard';
import DramaEpisodeTitle from '../components/DramaEpisodeTitle';
import RelatedDramaSection from '../components/RelatedDramaSection';
import Spacing from '../components/Spacing';
import { Drama, DramaEpisode, getHorizontalImage, LikeType } from '../models';
import {
  fetchDramaEpisodeListActions,
  fetchDramaReviewsActions,
  fetchDramaWithEpisodeActions,
  fetchRelatedDramasActions,
  patchDramaLikeActions,
} from '../stores/actions';
import {
  selectDrama,
  selectDramaEpisode,
  selectDramaEpisodeListWithoutCurrent,
  selectDramaReviews,
  selectRelatedDramas,
  selectShouldFetchDramaEpisodeList,
  selectUser,
} from '../stores/selectors';
import { lineHeights, selectForegroundColor, styled } from '../styles';
import { Card } from '../ui/card';
import { Icon } from '../ui/icon';
import { ContentWithAside } from '../ui/layout/ContentWithAside';
import DramaEpisodeCommentSection from './DramaEpisodeCommentSection';
import DramaEpisodeReviewSection from './DramaEpisodeReviewSection';
import { LoginDialogContext } from './LoginDialogProvider';

export default function DramaEpisodePage() {
  const { dramaId, episodeId } = useParams<{ dramaId: string; episodeId: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const loginDialog = useContext(LoginDialogContext);

  const user = useSelector(selectUser);
  const drama = useSelector(selectDrama);
  const dramaEpisode = useSelector(selectDramaEpisode);
  const relatedDramas = useSelector(selectRelatedDramas);
  const shouldFetchDramaEpisodes = useSelector(selectShouldFetchDramaEpisodeList);
  const dramaEpisodes = useSelector(selectDramaEpisodeListWithoutCurrent);
  const reviews = useSelector(selectDramaReviews);

  const [selectedTab, setSelectedTab] = useState<string>('comments');

  const currentEpisodeIndex = useMemo(
    () => dramaEpisodes.findIndex(episode => episode.id === dramaEpisode?.id),
    [dramaEpisodes, dramaEpisode],
  );

  const handleRelatedDramaClick = useCallback(
    (drama: Drama) => {
      history.push(`/drama/${drama.id}`);
    },
    [history],
  );

  const handleDramaEpisodeClick = useCallback(
    (episode: DramaEpisode) => {
      history.push(`/drama/${dramaId}/episode/${episode.id}`);
    },
    [history, dramaId],
  );

  const handleDramaLikeClick = useCallback(
    (like: LikeType) => {
      if (user == null) {
        loginDialog?.open();
        return;
      }

      dispatch(patchDramaLikeActions.request({ dramaId: +dramaId, like }));
    },
    [loginDialog, user, dispatch, dramaId],
  );

  useEffect(() => {
    dispatch(
      fetchDramaWithEpisodeActions.request({
        dramaId: +dramaId,
        episodeId: +episodeId,
      }),
    );
  }, [dramaId, episodeId, dispatch]);

  useEffect(() => {
    dispatch(fetchDramaReviewsActions.request({ dramaId: +dramaId }));
  }, [dispatch, dramaId]);

  useEffect(() => {
    dispatch(fetchRelatedDramasActions.request({ dramaId: +dramaId }));
  }, [dramaId, dispatch]);

  useEffect(() => {
    if (shouldFetchDramaEpisodes) {
      dispatch(fetchDramaEpisodeListActions.request({ dramaId: +dramaId }));
    }
  }, [dramaId, shouldFetchDramaEpisodes, dispatch]);

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
            likeCount={drama.likeCount}
            dislikeCount={drama.dislikeCount}
            liked={drama.liked}
            disliked={drama.disliked}
            productionCompanyName={drama.productionCompany}
            episodeSummary={dramaEpisode.summary}
            reviews={reviews}
            onLike={handleDramaLikeClick}
          />
        </ContentWithAside.Content>
        <ContentWithAside.Aside>
          <Card
            css={css`
              height: 556px;
            `}
          >
            <DramaEpisodePlaylist scrollIndexTo={currentEpisodeIndex}>
              {dramaEpisodes.map(episode => (
                <DramaEpisodePlaylistItem
                  key={episode.id}
                  thumbnailImageUrl={getHorizontalImage(drama.images)}
                  episodeNumber={episode.number}
                  episodeTitle={episode.title}
                  onClick={() => handleDramaEpisodeClick(episode)}
                />
              ))}
            </DramaEpisodePlaylist>
          </Card>
        </ContentWithAside.Aside>
      </ContentWithAside>

      <RelatedDramaSection
        dramas={relatedDramas ?? []}
        onDramaClick={handleRelatedDramaClick}
        css={css`
          margin-top: 24px;
        `}
      />

      <ContentWithAside
        asideSize={322}
        spacing={8}
        css={css`
          margin-top: 24px;
        `}
      >
        <ContentWithAside.Content>
          <Card>
            <Card.Head size={60}>
              <Tabs>
                <Tab
                  selected={selectedTab === 'comments'}
                  onClick={() => setSelectedTab('comments')}
                >
                  <TabIcon name="comment" />
                  댓글 <b>{dramaEpisode.commentCount}개</b>
                </Tab>
                <Indent />
                <Tab selected={selectedTab === 'reviews'} onClick={() => setSelectedTab('reviews')}>
                  <TabIcon name="star" />
                  리뷰 <b>{reviews.length}개</b>
                </Tab>
              </Tabs>
            </Card.Head>
            <Card.Content>
              {selectedTab === 'comments' ? (
                <DramaEpisodeCommentSection dramaId={+dramaId} episodeId={+episodeId} />
              ) : null}
              {selectedTab === 'reviews' ? <DramaEpisodeReviewSection dramaId={+dramaId} /> : null}
            </Card.Content>
          </Card>
        </ContentWithAside.Content>
        <ContentWithAside.Aside />
      </ContentWithAside>
      <Spacing size={200} />
    </Wrapper>
  );
}

const Wrapper = styled.article`
  min-height: 100vh;
`;

const Tabs = styled.div`
  display: inline-flex;
  align-items: center;
  height: 100%;
`;

const Tab = styled.div<{ selected?: boolean; rightBorder?: boolean }>`
  flex: none;
  display: inline-flex;
  align-items: center;
  margin: 0 16px;
  opacity: ${p => (p.selected ? 1 : 0.5)};
  cursor: pointer;

  height: 36px;
  font-size: 15px;
  line-height: ${lineHeights.condensed};
  letter-spacing: normal;
  color: ${selectForegroundColor('textPrimary')};

  & > b {
    margin-left: 3px;
  }
`;

const TabIcon = styled(Icon)`
  margin-right: 6px;
`;

const Indent = styled.div`
  display: inline-block;
  flex: none;
  width: 2px;
  height: 15px;
  opacity: 0.5;
  border: solid 1px #979797;
`;
