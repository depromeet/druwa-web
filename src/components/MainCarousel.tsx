import React, { useState } from 'react';
import Carousel from 'react-slick';
import MainCarouselSlide from './MainCarouselSlide';

const slides = [
  {
    productionName: '삼성 웹드라마',
    title: '고래먼지',
    description: `가수 지망생과 삼성 신입사원이 함께\n하우스쉐어링을 하며 펼쳐지는 스토리`,
  },
  {
    productionName: '삼성 웹드라마',
    title: '고래먼지',
    description: `가수 지망생과 삼성 신입사원이 함께\n하우스쉐어링을 하며 펼쳐지는 스토리`,
  },
  {
    productionName: '삼성 웹드라마',
    title: '고래먼지',
    description: `가수 지망생과 삼성 신입사원이 함께\n하우스쉐어링을 하며 펼쳐지는 스토리`,
  },
  {
    productionName: '삼성 웹드라마',
    title: '고래먼지',
    description: `가수 지망생과 삼성 신입사원이 함께\n하우스쉐어링을 하며 펼쳐지는 스토리`,
  },
  {
    productionName: '삼성 웹드라마',
    title: '고래먼지',
    description: `가수 지망생과 삼성 신입사원이 함께\n하우스쉐어링을 하며 펼쳐지는 스토리`,
  },
  {
    productionName: '삼성 웹드라마',
    title: '고래먼지',
    description: `가수 지망생과 삼성 신입사원이 함께\n하우스쉐어링을 하며 펼쳐지는 스토리`,
  },
];

export default function MainCarousel() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  return (
    <Carousel
      arrows={false}
      dots={false}
      autoplay={true}
      draggable={true}
      infinite={true}
      slidesToShow={1}
      afterChange={setCurrentSlideIndex}
    >
      {slides.map((slide, index) => (
        <MainCarouselSlide
          key={index}
          activated={index === currentSlideIndex}
          productionName={slide.productionName}
          title={slide.title}
          description={slide.description}
        />
      ))}
    </Carousel>
  );
}
