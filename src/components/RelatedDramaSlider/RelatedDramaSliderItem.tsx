import React, { memo } from 'react';
import {
  cssButtonReset,
  cssTextEllipsis,
  fontSizes,
  selectForegroundColor,
  styled,
} from '../../styles';

interface Props {
  title: string;
  imageUrl: string;
  className?: string;
  onClick?(): void;
}

function RelatedDramaSliderItem({ title, imageUrl, className, onClick }: Props) {
  return (
    <Wrapper className={className} onClick={onClick}>
      <Image role="img" style={{ backgroundImage: `url(${imageUrl})` }} aria-label="" />
      <Title>{title}</Title>
    </Wrapper>
  );
}

export default memo(RelatedDramaSliderItem);

const Wrapper = styled.button`
  ${cssButtonReset};
  background: transparent;
  margin: 0;
  display: block;
  height: 112px;
`;

const Image = styled.div`
  width: 100%;
  height: 86px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Title = styled.span`
  display: block;
  margin-top: 6px;
  font-size: ${fontSizes.regular}px;
  line-height: 20px;
  height: 20px;
  color: ${selectForegroundColor('textPrimary')};
  ${cssTextEllipsis};
`;
