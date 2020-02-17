import React, { memo, useCallback, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../components/Comment';
import TextWriter from '../components/TextWriter';
import { Comment as CommentModel, LikeType, likeTypeFromComment } from '../models';
import {
  fetchDramaEpisodeCommentsActions,
  patchDramaEpisodeCommentLikeActions,
} from '../stores/actions';
import { selectDramaEpisodeComments, selectUser } from '../stores/selectors';
import { styled } from '../styles';
import { LoginDialogContext } from './LoginDialogProvider';

interface Props {
  dramaId: number;
  episodeId: number;
}

function DramaEpisodeCommentSection({ dramaId, episodeId }: Props) {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const loginDialog = useContext(LoginDialogContext);
  const comments = useSelector(selectDramaEpisodeComments);

  const handleCommentLike = useCallback(
    (comment: CommentModel, like: LikeType) => {
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
      />
      <CommentList>
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            writerName="나석주"
            writerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
            body={comment.body}
            likeCount={comment.likeCount}
            dislikeCount={comment.dislikeCount}
            didUserLike={likeTypeFromComment(comment)}
            createdAt={comment.createdAt}
            onLikeChange={like => handleCommentLike(comment, like)}
          />
        ))}
      </CommentList>
    </Wrapper>
  );
}

export default memo(DramaEpisodeCommentSection);

const Wrapper = styled.div``;

const CommentList = styled.div`
  padding: 30px 0 10px 0;
`;

const CommentItem = styled(Comment)`
  margin-bottom: 20px;
`;
