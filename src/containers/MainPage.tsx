import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { map } from 'rxjs/operators';
import CurationContainer from '../components/CurationContainer';
import { DramaSliderTypeA } from '../components/DramaSliderTypeA';
import { DramaSliderTypeB } from '../components/DramaSliderTypeB';
import MainCarousel from '../components/MainCarousel';
import MainFooter from '../components/MainFooter';
import { curationsFromResponse, DramaCurationItem, getHorizontalImage } from '../models';
import { fetchCuration } from '../remotes';
import MainHeader from './MainHeader';

export default function MainPage() {
  const history = useHistory();

  const curationItems = useCuration() ?? [];
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
      <CurationContainer marginTop={100}>
        <DramaSliderTypeA title="명작 클라스 한번에 몰아보기" count={curationItems.length}>
          {curationItems.map(item => (
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
      <CurationContainer marginTop={100}>
        <DramaSliderTypeB title="이런 배우 어때요? 뉴페이스 등장!" size={4} count={12}>
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
        </DramaSliderTypeB>
      </CurationContainer>
      <CurationContainer marginTop={100}>
        <DramaSliderTypeB title="한 겨울엔 마음이 따듯하게" size={4} count={12}>
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeB.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
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
