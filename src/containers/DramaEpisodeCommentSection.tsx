import { subMinutes } from 'date-fns';
import React from 'react';
import Comment from '../components/Comment';
import TextWriter from '../components/TextWriter';
import { styled } from '../styles';

export default function DramaEpisodeCommentSection() {
  return (
    <Wrapper>
      <TextWriter maxLength={300} placeholder="댓글을 작성하세요" />
      <CommentList>
        <CommentItem
          writerName="나석주"
          writerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
          body={`I appreciate the mods for changing the banners every so often and little memey jokes like "hiding in the alcoves" for subscribers and "executed by elder buff" for online redditors. I know that a lot of other communities do that too, but a majority of the subs I'm subscribed to don't care enough to update that every (or near every) patch or whenever something big in that community happens. Thank you for putting in the effort and taking the time to do these community threads, even when people don't like what you have to say.
          That being said, I can't see the updated self-prop rule change discussion thread. If say, you are a cosplayer or streamer and you make a comment about something NOT related to cosplay or your stream and someone asks you a question related to your created content and you respond publicly, does that count as a self-promotion point?
          `}
          likeCount={3}
          dislikeCount={0}
          createdAt={subMinutes(new Date(), 5).toString()}
        />
        <CommentItem
          writerName="나석주"
          writerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
          body={`I appreciate the mods for changing the banners every so often and little memey jokes like "hiding in the alcoves" for subscribers and "executed by elder buff" for online redditors. I know that a lot of other communities do that too, but a majority of the subs I'm subscribed to don't care enough to update that every (or near every) patch or whenever something big in that community happens. Thank you for putting in the effort and taking the time to do these community threads, even when people don't like what you have to say.
          That being said, I can't see the updated self-prop rule change discussion thread. If say, you are a cosplayer or streamer and you make a comment about something NOT related to cosplay or your stream and someone asks you a question related to your created content and you respond publicly, does that count as a self-promotion point?
          `}
          likeCount={3}
          dislikeCount={0}
          createdAt={subMinutes(new Date(), 15).toString()}
        />
        <CommentItem
          writerName="나석주"
          writerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
          body={`I appreciate the mods for changing the banners every so often and little memey jokes like "hiding in the alcoves" for subscribers and "executed by elder buff" for online redditors. I know that a lot of other communities do that too, but a majority of the subs I'm subscribed to don't care enough to update that every (or near every) patch or whenever something big in that community happens. Thank you for putting in the effort and taking the time to do these community threads, even when people don't like what you have to say.
          That being said, I can't see the updated self-prop rule change discussion thread. If say, you are a cosplayer or streamer and you make a comment about something NOT related to cosplay or your stream and someone asks you a question related to your created content and you respond publicly, does that count as a self-promotion point?
          `}
          likeCount={3}
          dislikeCount={0}
          createdAt={subMinutes(new Date(), 25).toString()}
        />
      </CommentList>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const CommentList = styled.div`
  padding: 30px 0 10px 0;
`;

const CommentItem = styled(Comment)`
  margin-bottom: 20px;
`;
