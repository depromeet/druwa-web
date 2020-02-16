import React, { memo } from 'react';
import { fontWeights, lineHeights, selectForegroundColor, styled } from '../../styles';
import { Slider2 } from '../../ui/slider2';

interface Props {
  imageUrl: string;
  subTitle: string;
  title: string;
  className?: string;
  onClick?(): void;
}

export const DramaSliderTypeBItem = memo<Props>(
  ({ imageUrl, subTitle, title, className, onClick }) => {
    return (
      <Item onClick={onClick} className={className}>
        <Wrapper>
          <Background style={{ backgroundImage: `url(${imageUrl})` }} />
          <Content>
            <SubTitle>{subTitle}</SubTitle>
            <Title>{title}</Title>
          </Content>
        </Wrapper>
      </Item>
    );
  },
);

const Item = styled(Slider2.Item)`
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 343px;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: transform 335ms ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const Content = styled.div`
  position: absolute;
  padding: 0 16px;
  left: 0;
  right: 0;
  bottom: 32px;
  z-index: 1;
`;

const SubTitle = styled.span`
  display: block;
  margin-top: 13px;
  font-size: 20px;
  width: 100%;
  font-weight: ${fontWeights.light};
  line-height: ${lineHeights.condensed};
  text-align: center;
  color: ${selectForegroundColor('textPrimary')};
`;

const Title = styled.span`
  display: block;
  margin-top: 8px;
  font-size: 38px;
  font-weight: ${fontWeights.bold};
  line-height: ${lineHeights.condensed};
  text-align: center;
  width: 100%;
  white-space: normal;
  word-break: break-all;
  color: ${selectForegroundColor('textPrimary')};
`;
