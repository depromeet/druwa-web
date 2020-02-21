import { css } from '@emotion/core';
import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../components/Comment';
import Spacing from '../components/Spacing';
import TextWriter from '../components/TextWriter';
import {
  Comment as CommentModel,
  LikeType,
  likeTypeFromComment,
  SubComment,
  User,
} from '../models';
import { appendDramaEpisodeComment, createDramaEpisodeComment } from '../remotes';
import {
  fetchDramaEpisodeCommentsActions,
  patchDramaEpisodeCommentLikeActions,
} from '../stores/actions';
import { selectAuthToken, selectDramaEpisodeComments, selectUser } from '../stores/selectors';
import { selectForegroundColor, styled } from '../styles';
import { LoginDialogContext } from './LoginDialogProvider';

interface Props {
  dramaId: number;
  episodeId: number;
}

type CommentLikeButtonClickHandler = (comment: CommentModel | SubComment, like: LikeType) => void;

function DramaEpisodeCommentSection({ dramaId, episodeId }: Props) {
  const dispatch = useDispatch();

  const token = useSelector(selectAuthToken);
  const user = useSelector(selectUser);
  const loginDialog = useContext(LoginDialogContext);
  const comments = useSelector(selectDramaEpisodeComments);

  const handleCommentLike = useCallback(
    (comment: CommentModel | SubComment, like: LikeType) => {
      if (user == null) {
        loginDialog?.open();
        return;
      }

      dispatch(
        patchDramaEpisodeCommentLikeActions.request({
          dramaId,
          episodeId,
          commentId: comment.id,
          like,
        }),
      );
    },
    [user, loginDialog, dispatch, dramaId, episodeId],
  );

  const handleCommentSubmit = useCallback(
    async (text: string, comment?: CommentModel) => {
      if (token == null) {
        return;
      }

      try {
        if (comment != null) {
          await appendDramaEpisodeComment(dramaId, episodeId, comment.id, text, token).toPromise();
        } else {
          await createDramaEpisodeComment(dramaId, episodeId, text, token).toPromise();
        }

        alert('댓글이 등록되었습니다.');
      } catch (error) {
        alert('댓글 등록에 실패하였습니다!');
      } finally {
        dispatch(fetchDramaEpisodeCommentsActions.request({ dramaId, episodeId }));
      }
    },
    [dramaId, episodeId, token, dispatch],
  );

  useEffect(() => {
    dispatch(fetchDramaEpisodeCommentsActions.request({ dramaId, episodeId }));
  }, [dramaId, episodeId, dispatch]);

  return (
    <Wrapper>
      <TextWriter
        maxLength={300}
        disabled={user === null}
        placeholder="댓글을 작성하세요"
        onLogin={() => loginDialog?.open()}
        onSubmit={handleCommentSubmit}
      />
      <CommentList
        user={user}
        comments={comments}
        onCommentLike={handleCommentLike}
        onLogin={() => loginDialog?.open()}
        onSubmit={handleCommentSubmit}
      />
    </Wrapper>
  );
}

export default memo(DramaEpisodeCommentSection);

const Wrapper = styled.div``;

const CommentItem = styled(Comment)`
  margin-bottom: 20px;
`;

function CommentItemWithSubComments({
  comment,
  onCommentLike,
  onLogin,
  onSubmit,
  showWriter,
}: {
  comment: CommentModel;
  onCommentLike: CommentLikeButtonClickHandler;
  onLogin(): void;
  onSubmit(text: string, comment: CommentModel): void;
  showWriter: boolean;
}) {
  const [showSubComments, setShowSubComment] = useState(false);

  return (
    <>
      <CommentItem
        writerName={comment.user.name}
        writerImageUrl={comment.user.imageUrl ?? '/assets/icon/icon-user.svg'}
        body={comment.body}
        likeCount={comment.likeCount}
        dislikeCount={comment.dislikeCount}
        didUserLike={likeTypeFromComment(comment)}
        createdAt={comment.createdAt}
        subCommentButtonText={
          comment.subComments.length > 0 ? `댓글 ${comment.subComments.length}개` : '댓글'
        }
        onSubCommentButtonClick={() => setShowSubComment(x => !x)}
        onLikeChange={like => onCommentLike(comment, like)}
      />
      {showSubComments ? (
        <div
          css={css`
            padding-left: 76px;
          `}
        >
          <TextWriter
            disabled={!showWriter}
            maxLength={300}
            placeholder="댓글을 작성하세요"
            onLogin={onLogin}
            onSubmit={text => onSubmit(text, comment)}
          />
          <Spacing size={24} />
          {comment.subComments.map(comment => (
            <CommentItem
              key={comment.id}
              writerName={comment.user.name}
              writerImageUrl={comment.user.imageUrl ?? '/assets/icon/icon-user.svg'}
              body={comment.body}
              likeCount={comment.likeCount}
              dislikeCount={comment.dislikeCount}
              didUserLike={likeTypeFromComment(comment)}
              createdAt={comment.createdAt}
              onLikeChange={like => onCommentLike(comment, like)}
            />
          ))}
          {comment.subComments.length > 0 ? <Spacing size={24} /> : null}
        </div>
      ) : null}
    </>
  );
}

const CommentList = memo(
  ({
    comments,
    onCommentLike,
    onLogin,
    onSubmit,
    user,
  }: {
    comments: CommentModel[];
    onCommentLike: CommentLikeButtonClickHandler;
    onLogin(): void;
    onSubmit(text: string, comment: CommentModel): void;
    user: User | null;
  }) => {
    if (comments.length === 0) {
      return <Empty>등록된 댓글이 없습니다.</Empty>;
    }

    return (
      <div
        css={css`
          padding: 30px 0 10px 0;
        `}
      >
        {comments.map(comment => (
          <CommentItemWithSubComments
            key={comment.id}
            comment={comment}
            onCommentLike={onCommentLike}
            onLogin={onLogin}
            onSubmit={onSubmit}
            showWriter={user !== null}
          />
        ))}
      </div>
    );
  },
);

const Empty = styled.p`
  margin: 0;
  padding: 70px 0;
  text-align: center;
  font-size: 18px;
  line-height: 1.22;
  color: ${selectForegroundColor('textSecondary')};
`;
