import React, { memo } from 'react';
import { Drama } from '../../models';
import { Slider } from '../../ui/slider';
import RelatedDramaSliderItem from './RelatedDramaSliderItem';

interface Props {
  dramas: Drama[];
  className?: string;
  onDramaClick?(drama: Drama): void;
}

function RelatedDramaSlider({ dramas, className, onDramaClick }: Props) {
  return (
    <Slider itemSize={112} spacing={16} className={className}>
      {dramas.map(drama => (
        <Slider.Item key={drama.id}>
          <RelatedDramaSliderItem
            title={drama.title}
            imageUrl="https://druwa-repository-test.s3.ap-northeast-2.amazonaws.com/ios_small_123-1580750872815-204724.jpg"
            onClick={() => onDramaClick?.(drama)}
          />
        </Slider.Item>
      ))}
    </Slider>
  );
}

export default memo(RelatedDramaSlider);
