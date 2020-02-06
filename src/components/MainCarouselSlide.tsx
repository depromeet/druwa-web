import React, { memo } from 'react';
import { animated, useSprings } from 'react-spring';
import { fontWeights, layouts, lineHeights, selectForegroundColor, styled } from '../styles';
import { convertNewlineToJSX } from '../utils';

interface Props {
  activated: boolean;
  productionName: string;
  title: string;
  description: string;
  backgroundImageUrl: string;
  className?: string;
}

function MainCarouselSlide({
  activated,
  productionName,
  title,
  description,
  backgroundImageUrl,
  className,
}: Props) {
  const [productNameStyle, titleStyle, descriptionStyle] = useSprings(3, [
    {
      from: {
        opacity: 0,
      },
      to: {
        opacity: activated ? 1 : 0,
      },
    },
    {
      from: {
        opacity: 0,
      },
      to: {
        opacity: activated ? 1 : 0,
      },
      delay: 50,
    },
    {
      from: {
        opacity: 0,
        transform: 'translateY(-5px)',
      },
      to: {
        opacity: activated ? 1 : 0,
        transform: `translateY(${activated ? '0' : '-5px'})`,
      },
      delay: 200,
    },
  ]);

  return (
    <Slide role="banner" backgroundImageUrl={backgroundImageUrl} className={className}>
      <SlideInner>
        <ProductionName style={productNameStyle}>{productionName}</ProductionName>
        <Title style={titleStyle}>{title}</Title>
        <Description style={descriptionStyle}>{convertNewlineToJSX(description)}</Description>
      </SlideInner>
    </Slide>
  );
}

export default memo(MainCarouselSlide);

const Slide = styled.div<{ backgroundImageUrl: string }>`
  height: 700px;
  outline: 0;
  background-size: cover;
  background-image: url(${p => p.backgroundImageUrl});
  background-repeat: no-repeat;
  background-position: center;
`;

const SlideInner = styled.div`
  max-width: ${layouts.container}px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  padding-bottom: 187px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;
`;

const ProductionName = styled(animated.div)`
  font-size: 28px;
  color: ${selectForegroundColor('textPrimary')};
`;

const Title = styled(animated.h1)`
  margin: 0;
  font-size: 80px;
  font-weight: ${fontWeights.medium};
  line-height: ${lineHeights.normal};
  color: ${selectForegroundColor('textPrimary')};
`;

const Description = styled(animated.p)`
  margin: 10px 0 0 0;
  padding: 0;
  font-size: 30px;
  font-weight: ${fontWeights.light};
  color: ${selectForegroundColor('textPrimary')};
`;
