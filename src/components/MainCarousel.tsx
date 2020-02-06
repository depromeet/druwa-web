import React, { useState } from 'react';
import Carousel from 'react-slick';
import { colorPlatte, cssButtonReset, styled } from '../styles';
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
      dots={true}
      appendDots={dots => <Dots>{dots}</Dots>}
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
          backgroundImageUrl="/assets/images/main-carousel-sample.jpeg"
          title={slide.title}
          description={slide.description}
        />
      ))}
    </Carousel>
  );
}

const Dots = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 35px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;

  > li {
    margin: 0 5px;
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background-color: ${colorPlatte.white};

    > button {
      ${cssButtonReset};
      background: transparent;
      display: block;
      margin: 0;
      width: 100%;
      height: 100%;
      text-indent: -9999em;
      text-transform: uppercase;
    }

    &.slick-active {
      background-color: ${colorPlatte.accent};
    }
  }
`;
