import { css } from '@emotion/core';
import React, { memo } from 'react';
import {
  cssButtonReset,
  cssTextEllipsis,
  fontSizes,
  fontWeights,
  lineHeights,
  selectForegroundColor,
  styled,
} from '../../styles';
import { List } from '../../ui/list';

let uniqueId = 0;

export const SIZE = 56;

interface Props {
  id?: string;
  thumbnailImageUrl: string;
  episodeNumber: number;
  episodeTitle: string;
  className?: string;
  onClick?(): void;
}

function DramaEpisodePlaylistItem({
  id = `drama-episode-playlist-item-${uniqueId++}`,
  thumbnailImageUrl,
  episodeNumber,
  episodeTitle,
  className,
  onClick,
}: Props) {
  return (
    <List.Item
      className={className}
      css={css`
        padding: 0 16px;
      `}
    >
      <Wrapper aria-labelledby={id} onClick={onClick}>
        <Thumbnail backgroundImageUrl={thumbnailImageUrl} />
        <Content>
          <EpisodeNumber>{episodeNumber.toString().padStart(2, '0')}</EpisodeNumber>
          <EpisodeTitle id={id}>{episodeTitle}</EpisodeTitle>
        </Content>
      </Wrapper>
    </List.Item>
  );
}

export default memo(DramaEpisodePlaylistItem);

const Wrapper = styled.button`
  ${cssButtonReset};
  margin: 0;
  padding: 0;
  background: transparent;
  display: flex;
  height: ${SIZE}px;
`;

const Thumbnail = styled.div<{ backgroundImageUrl: string }>`
  flex: none;
  width: 100px;
  height: ${SIZE}px;
  margin-right: 12px;
  background-image: url(${p => p.backgroundImageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Content = styled.div`
  flex: 1 1 auto;
  display: block;
  height: ${SIZE}px;
`;

const EpisodeNumber = styled.span`
  display: block;
  font-size: ${fontSizes.regular}px;
  font-weight: ${fontWeights.regular};
  line-height: ${lineHeights.normal};
  color: ${selectForegroundColor('textPrimary')};
  text-align: left;
  ${cssTextEllipsis};
`;

const EpisodeTitle = styled.span`
  display: block;
  font-size: ${fontSizes.regular}px;
  font-weight: ${fontWeights.regular};
  line-height: ${lineHeights.normal};
  color: ${selectForegroundColor('textPrimary')};
  text-align: left;
  ${cssTextEllipsis};
`;
