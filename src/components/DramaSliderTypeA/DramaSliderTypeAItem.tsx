import React from 'react';
import { fontWeights, lineHeights, selectForegroundColor, styled } from '../../styles';
import { Slider2 } from '../../ui/slider2';

interface Props {
  imageUrl: string;
  subTitle: string;
  title: string;
  className?: string;
  onClick?(): void;
}

export function DramaSliderTypeAItem({ imageUrl, subTitle, title, className, onClick }: Props) {
  return (
    <Item onClick={onClick} className={className}>
      <Wrapper>
        <Image style={{ backgroundImage: `url(${imageUrl})` }} />
        <SubTitle>{subTitle}</SubTitle>
        <Title>{title}</Title>
      </Wrapper>
    </Item>
  );
}

const Item = styled(Slider2.Item)``;

const Wrapper = styled.div`
  display: block;
`;

const Image = styled.div`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const SubTitle = styled.span`
  display: block;
  margin-top: 13px;
  font-size: 17px;
  font-weight: ${fontWeights.light};
  line-height: 1.18;
  letter-spacing: normal;
  color: ${selectForegroundColor('textPrimary')};
`;

const Title = styled.span`
  display: block;
  margin-top: 8px;
  font-size: 28px;
  font-weight: ${fontWeights.medium};
  line-height: ${lineHeights.condensed};
  color: ${selectForegroundColor('textPrimary')};
`;
