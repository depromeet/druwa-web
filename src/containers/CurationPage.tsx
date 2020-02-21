import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { map } from 'rxjs/operators';
import { CurationList } from '../components/CurationList';
import { curationsFromResponse, DramaCurationItem, getHorizontalImage } from '../models';
import { fetchCuration } from '../remotes';
import { layouts, selectBackgroundColor, selectForegroundColor, styled } from '../styles';
import { useQueryParams } from '../utils';
import MainHeader from './MainHeader';

export default function CurationPage() {
  const history = useHistory();
  const title = useQueryParams('title');
  const curations = useCuration() ?? [];

  const handleCurationClick = useCallback(
    (curation: DramaCurationItem) => {
      history.push(`/drama/${curation.id}`);
    },
    [history],
  );

  return (
    <>
      <MainHeader />
      {title != null ? <Header>{title}</Header> : null}
      <Content>
        <CurationList>
          {curations.map(curation => (
            <CurationList.Item
              key={curation.id}
              imageUrl={getHorizontalImage(curation.images)}
              productionName={curation.productionCompany}
              likeCount={curation.likeCount}
              liked={curation.liked}
              onClick={() => handleCurationClick(curation)}
            />
          ))}
        </CurationList>
      </Content>
    </>
  );
}

const Header = styled.h1`
  padding: 50px 0;
  margin: 0;
  background-color: ${selectBackgroundColor('card')};
  font-size: 42px;
  font-weight: 500;
  color: ${selectForegroundColor('textPrimary')};
  text-align: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: ${layouts.container}px;
  margin: 80px auto;
`;

function useCuration() {
  const [items, setItems] = useState<DramaCurationItem[] | undefined>();

  useEffect(() => {
    const subscription = fetchCuration()
      .pipe(map(curationsFromResponse))
      .subscribe(items => setItems(items));

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return items;
}
