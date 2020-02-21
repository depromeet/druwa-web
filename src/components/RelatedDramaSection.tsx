import React, { memo } from 'react';
import { Drama } from '../models';
import {
  cssContainerLayoutBreakpoint,
  fontSizes,
  fontWeights,
  layouts,
  lineHeights,
  selectForegroundColor,
  styled,
} from '../styles';
import { Card } from '../ui/card';
import { RelatedDramaSlider } from './RelatedDramaSlider';

interface Props {
  dramas: Drama[];
  className?: string;
  onDramaClick?(drama: Drama): void;
}

function RelatedDramaSection({ dramas, className, onDramaClick }: Props) {
  return (
    <Wrapper className={className}>
      <Card role="section">
        <Card.Content verticalPadding={16}>
          <Title>연관 드라마</Title>
          <Slider dramas={dramas} onDramaClick={onDramaClick} />
        </Card.Content>
      </Card>
    </Wrapper>
  );
}

export default memo(RelatedDramaSection);

const Wrapper = styled.div`
  width: 100%;
  max-width: ${layouts.container}px;
  margin: 0 auto;
  overflow: hidden;
  contain: layout style;

  ${cssContainerLayoutBreakpoint} {
    padding: 0 12px;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: ${fontSizes.medium}px;
  font-weight: ${fontWeights.medium};
  line-height: ${lineHeights.condensed};
  color: ${selectForegroundColor('textPrimary')};
`;

const Slider = styled(RelatedDramaSlider)`
  padding: 12px 0 4px 0;
  margin: 0 -16px;
`;
