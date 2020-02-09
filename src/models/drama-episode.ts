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

export const dramaEpisodeFromResponse = (response: DramaEpisodeResponse): DramaEpisode => ({
  id: response.dramaEpisodeId,
  title: response.title,
  summary: response.summary,
  number: response.episodeNumber,
  youtubePlayId: response.playUrl.match(/https:\/\/youtu.be\/(.+)/)?.[1] ?? '',
  durationInMillis: response.durationInMillis,
  likeCount: response.like,
  dislikeCount: response.dislike,
  commentCount: response.totalComments,
});
