import React, { memo, useMemo } from 'react';
import {
  cssContainerLayoutBreakpoint,
  fontSizes,
  fontWeights,
  layouts,
  lineHeights,
  selectForegroundColor,
  styled,
} from '../styles';

interface Props {
  title: string;
  episodeNumber: number;
  durationInMillis: number;
  className?: string;
}

const MINUTE_IN_MILLIS = 1000 * 60;
const HOUR_IN_MILLIS = MINUTE_IN_MILLIS * 60;

function DramaEpisodeTitle({ title, episodeNumber, durationInMillis, className }: Props) {
  const duration = useMemo(() => {
    const hours = Math.floor(durationInMillis / HOUR_IN_MILLIS);
    const minutes = Math.round((durationInMillis - hours * HOUR_IN_MILLIS) / MINUTE_IN_MILLIS);

    return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
  }, [durationInMillis]);

  return (
    <Wrapper className={className}>
      <EpisodeNumber>Episode {episodeNumber.toString().padStart(2, '0')}</EpisodeNumber>
      <Title>{title}</Title>
      <Duration>{duration}</Duration>
    </Wrapper>
  );
}

export default memo(DramaEpisodeTitle);

const Wrapper = styled.div`
  display: block;
  margin: 0 auto;
  max-width: ${layouts.container}px;
  width: 100%;

  ${cssContainerLayoutBreakpoint} {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const EpisodeNumber = styled.div`
  font-size: ${fontSizes.small}px;
  font-weight: ${fontWeights.medium};
  text-align: center;
  line-height: ${lineHeights.condensed};
  color: ${selectForegroundColor('textSecondary')};
`;

const Title = styled.h1`
  display: block;
  margin: 8px 0 0 0;
  padding: 0;
  font-size: ${fontSizes.big}px;
  font-weight: ${fontWeights.bold};
  text-align: center;
  line-height: ${lineHeights.condensed};
  color: ${selectForegroundColor('textPrimary')};
`;

const Duration = styled.div`
  margin: 8px 0 0 0;
  font-size: ${fontSizes.small}px;
  font-weight: ${fontWeights.medium};
  text-align: center;
  line-height: ${lineHeights.condensed};
  letter-spacing: normal;
  color: ${selectForegroundColor('textSecondary')};
`;
