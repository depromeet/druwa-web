import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDramaEpisodeList } from '../remotes';

export default function DramaFirstEpisodePage() {
  const { dramaId } = useParams<{ dramaId: string }>();
  const history = useHistory();

  useEffect(() => {
    const subscription = fetchDramaEpisodeList(+dramaId).subscribe(
      episodes => {
        const sorted = episodes.sort((a, b) => a.episodeNumber - b.episodeNumber);

        history.replace(`/drama/${dramaId}/episode/${sorted[0]?.dramaEpisodeId}`);
      },
      () => {
        alert('잘못된 페이지 입니다.');
        history.replace('/home');
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [dramaId, history]);

  return null;
}
