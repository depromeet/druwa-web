import React, { ReactNode } from 'react';
import {
  fontSizes,
  fontWeights,
  selectBackgroundColor,
  selectForegroundColor,
  styled,
} from '../../styles';
import { List } from '../../ui/list';
import { SIZE } from './DramaEpisodePlaylistItem';

interface Props {
  scrollIndexTo?: number;
  children: ReactNode;
  className?: string;
}

export default function DramaEpisodePlaylist({ scrollIndexTo, children, className }: Props) {
  return (
    <Playlist className={className}>
      <Title>다른 회차 둘러보기</Title>
      <Content itemSize={SIZE} spacing={20} scrollIndexTo={scrollIndexTo}>
        {children}
      </Content>
    </Playlist>
  );
}

const Playlist = styled.section`
  width: 100%;
  height: 100%;
`;

const Title = styled.h2`
  width: 100%;
  height: 60px;
  margin: 0;
  border-bottom: 1px solid ${selectBackgroundColor('border')};
  padding: 0 16px;
  font-size: ${fontSizes.medium}px;
  font-weight: ${fontWeights.medium};
  line-height: 60px;
  color: ${selectForegroundColor('textPrimary')};
`;

const Content = styled(List)`
  height: calc(100% - 60px);
`;
