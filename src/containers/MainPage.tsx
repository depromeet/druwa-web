import React from 'react';
import { DramaSliderTypeA } from '../components/DramaSliderTypeA';
import MainCarousel from '../components/MainCarousel';
import MainFooter from '../components/MainFooter';
import { layouts, styled } from '../styles';
import MainHeader from './MainHeader';

export default function MainPage() {
  return (
    <main>
      <MainHeader />
      <MainCarousel />
      <Curation>
        <DramaSliderTypeA title="명작 클라스 한번에 몰아보기" count={12}>
          <DramaSliderTypeA.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeA.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeA.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeA.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeA.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeA.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeA.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeA.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeA.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeA.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeA.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
          <DramaSliderTypeA.Item
            imageUrl="/assets/images/sample.png"
            subTitle="플레이리스트"
            title="사랑은 은하수처럼"
          />
        </DramaSliderTypeA>
      </Curation>
      <MainFooter />
    </main>
  );
}

const Curation = styled.div`
  max-width: ${layouts.container}px;
  margin: 0 auto;
`;
