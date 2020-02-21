import { css } from '@emotion/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { map } from 'rxjs/operators';
import AmazingReviewCuration from '../components/AmazingReviewCuration';
import CurationContainer from '../components/CurationContainer';
import { DramaSliderTypeA } from '../components/DramaSliderTypeA';
import { DramaSliderTypeB } from '../components/DramaSliderTypeB';
import MainCarousel from '../components/MainCarousel';
import MainFooter from '../components/MainFooter';
import {
  curationsFromResponse,
  DramaCurationItem,
  getHorizontalImage,
  getVerticalImage,
} from '../models';
import { fetchCuration } from '../remotes';
import MainHeader from './MainHeader';

export default function MainPage() {
  const history = useHistory();

  const curation1Items = useCuration() ?? [];
  const curation2Items = useCuration() ?? [];
  const curation3Items = useCuration() ?? [];
  const amazingCurations = useCuration() ?? [];

  const handleCurationItemClick = useCallback(
    (item: DramaCurationItem) => {
      history.push(`/drama/${item.id}`);
    },
    [history],
  );

  return (
    <main>
      <MainHeader />
      <MainCarousel />
      <CurationContainer
        marginTop={100}
        marginBottom={100}
        css={css`
          background-color: #171819;
        `}
      >
        <DramaSliderTypeA title="명작 클라스 한번에 몰아보기" count={curation1Items.length}>
          {curation1Items.map(item => (
            <DramaSliderTypeA.Item
              key={item.id}
              imageUrl={getHorizontalImage(item.images)}
              subTitle={item.productionCompany}
              title={item.title}
              onClick={() => handleCurationItemClick(item)}
            />
          ))}
        </DramaSliderTypeA>
      </CurationContainer>
      {amazingCurations.length > 0 ? (
        <AmazingReviewCuration title="리뷰 폭발! 화제의 작품" curation={amazingCurations[0]} />
      ) : null}
      <CurationContainer marginTop={100}>
        <DramaSliderTypeB
          title="이런 배우 어때요? 뉴페이스 등장!"
          size={4}
          count={curation2Items.length}
        >
          {curation2Items.map(item => (
            <DramaSliderTypeB.Item
              key={item.id}
              imageUrl={getVerticalImage(item.images)}
              subTitle={item.productionCompany}
              title={item.title}
              onClick={() => handleCurationItemClick(item)}
            />
          ))}
        </DramaSliderTypeB>
      </CurationContainer>
      <CurationContainer marginTop={100}>
        <DramaSliderTypeB title="한 겨울엔 마음이 따듯하게" size={4} count={12}>
          {curation3Items.map(item => (
            <DramaSliderTypeB.Item
              key={item.id}
              imageUrl={getVerticalImage(item.images)}
              subTitle={item.productionCompany}
              title={item.title}
              onClick={() => handleCurationItemClick(item)}
            />
          ))}
        </DramaSliderTypeB>
      </CurationContainer>
      <MainFooter />
    </main>
  );
}

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
