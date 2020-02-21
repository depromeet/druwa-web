import React, { memo } from 'react';
import { Drama, getHorizontalImage } from '../../models';
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
            imageUrl={getHorizontalImage(drama.images)}
            onClick={() => onDramaClick?.(drama)}
          />
        </Slider.Item>
      ))}
    </Slider>
  );
}

export default memo(RelatedDramaSlider);
