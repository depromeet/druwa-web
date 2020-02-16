import { subMinutes } from 'date-fns';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import Review from '../components/Review';
import TextWriter from '../components/TextWriter';
import { selectUser } from '../stores/selectors';
import { styled } from '../styles';
import { LoginDialogContext } from './LoginDialogProvider';

export default function DramaEpisodeReviewSection() {
  const user = useSelector(selectUser);
  const loginDialog = useContext(LoginDialogContext);

  return (
    <Wrapper>
      <TextWriter
        maxLength={1000}
        disabled={user === null}
        disabledText="리뷰를"
        placeholder="리뷰를 작성하세요"
        onLogin={() => loginDialog?.open()}
      />
      <ReviewList>
        <ReviewItem
          writerName="나석주"
          writerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
          body={`I appreciate the mods for changing the banners every so often and little memey jokes like "hiding in the alcoves" for subscribers and "executed by elder buff" for online redditors. I know that a lot of other communities do that too, but a majority of the subs I'm subscribed to don't care enough to update that every (or near every) patch or whenever something big in that community happens. Thank you for putting in the effort and taking the time to do these community threads, even when people don't like what you have to say.
          That being said, I can't see the updated self-prop rule change discussion thread. If say, you are a cosplayer or streamer and you make a comment about something NOT related to cosplay or your stream and someone asks you a question related to your created content and you respond publicly, does that count as a self-promotion point?
          `}
          reviewRating={4}
          createdAt={subMinutes(new Date(), 5).toString()}
        />
        <ReviewItem
          writerName="나석주"
          writerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
          body={`I appreciate the mods for changing the banners every so often and little memey jokes like "hiding in the alcoves" for subscribers and "executed by elder buff" for online redditors. I know that a lot of other communities do that too, but a majority of the subs I'm subscribed to don't care enough to update that every (or near every) patch or whenever something big in that community happens. Thank you for putting in the effort and taking the time to do these community threads, even when people don't like what you have to say.
          That being said, I can't see the updated self-prop rule change discussion thread. If say, you are a cosplayer or streamer and you make a comment about something NOT related to cosplay or your stream and someone asks you a question related to your created content and you respond publicly, does that count as a self-promotion point?
          `}
          reviewRating={5}
          createdAt={subMinutes(new Date(), 15).toString()}
        />
        <ReviewItem
          writerName="나석주"
          writerImageUrl="https://avatars0.githubusercontent.com/u/13250888?s=460&v=4"
          body={`I appreciate the mods for changing the banners every so often and little memey jokes like "hiding in the alcoves" for subscribers and "executed by elder buff" for online redditors. I know that a lot of other communities do that too, but a majority of the subs I'm subscribed to don't care enough to update that every (or near every) patch or whenever something big in that community happens. Thank you for putting in the effort and taking the time to do these community threads, even when people don't like what you have to say.
          That being said, I can't see the updated self-prop rule change discussion thread. If say, you are a cosplayer or streamer and you make a comment about something NOT related to cosplay or your stream and someone asks you a question related to your created content and you respond publicly, does that count as a self-promotion point?
          `}
          reviewRating={2}
          createdAt={subMinutes(new Date(), 25).toString()}
        />
      </ReviewList>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const ReviewList = styled.div`
  padding: 30px 0 10px 0;
`;

const ReviewItem = styled(Review)`
  margin-bottom: 20px;
`;
