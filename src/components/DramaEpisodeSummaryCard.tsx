import React from 'react';
import { Card } from '../ui/card';
import { DramaReviewSlider } from './DramaReviewSlider';

export default function DramaEpisodeSummaryCard() {
  return (
    <Card>
      <Card.Head>
        <Card.HeadLeft>Left</Card.HeadLeft>
        <Card.HeadRight>Right</Card.HeadRight>
      </Card.Head>
      <DramaReviewSlider />
    </Card>
  );
}
