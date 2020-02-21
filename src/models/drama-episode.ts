import { DramaEpisodeResponse } from '../remotes';

export interface DramaEpisode {
  id: number;
  title: string;
  summary: string;
  number: number;
  durationInMillis: number;
  youtubePlayId: string;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
}

export const dramaEpisodeFromResponse = (response: DramaEpisodeResponse): DramaEpisode => {
  const { playUrl } = response;
  let youtubePlayId = '';

  if (playUrl.startsWith('https://youtu.be')) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    youtubePlayId = playUrl.match(/https:\/\/youtu.be\/(.+)/)?.[1]!;
  } else if (
    playUrl.startsWith('https://www.youtube.com/watch') ||
    playUrl.startsWith('https://youtube.com/watch')
  ) {
    youtubePlayId = playUrl.split('?v=')[1].split('&')[0];
  }

  return {
    id: response.dramaEpisodeId,
    title: response.title,
    summary: response.summary,
    number: response.episodeNumber,
    youtubePlayId,
    durationInMillis: response.durationInMillis,
    likeCount: response.like,
    dislikeCount: response.dislike,
    commentCount: response.totalComments,
  };
};
