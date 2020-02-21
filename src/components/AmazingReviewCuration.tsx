import { css } from '@emotion/core';
import chunk from 'lodash.chunk';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { map } from 'rxjs/operators';
import { DramaCurationItem, getVerticalImage, Review, reviewFromResponse } from '../models';
import { fetchDramaReviews } from '../remotes';
import { layouts, selectForegroundColor, styled } from '../styles';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Slider } from '../ui/slider';
import { formatKiloCount } from '../utils';
import { DramaReviewSliderItem } from './DramaReviewSlider';

interface Props {
  title: string;
  curation: DramaCurationItem;
  className?: string;
}

function AmazingReviewCuration({ title, curation, className }: Props) {
  const history = useHistory();
  const reviews = useReviews(curation.id);
  const handleButtonClick = useCallback(() => {
    history.push(`/drama/${curation.id}`);
  }, [history, curation.id]);

  return (
    <Wrapper className={className}>
      <Section>
        <Title>{title}</Title>
        <Content>
          <Image style={{ backgroundImage: `url(${getVerticalImage(curation.images)})` }} />
          <Texts>
            <ProductionName>{curation.productionCompany}</ProductionName>
            <CurationTitle>
              {curation.title}
              <Icon
                name="like"
                css={css`
                  margin-left: 24px;
                `}
              />
              <LikeCount>{formatKiloCount(curation.likeCount)}</LikeCount>
            </CurationTitle>
            <Summary>{curation.summary}</Summary>
            <ButtonWrapper>
              <Button
                role="link"
                data-href={`/drama/${curation.id}`}
                type="flat"
                color="primary"
                size={36}
                onClick={handleButtonClick}
              >
                드라마 보러가기
              </Button>
            </ButtonWrapper>
          </Texts>
          <SlideWrapper>
            <Slider itemSize={400} spacing={16}>
              {chunk(reviews, 3).map((x, index) => (
                <Slider.Item key={index}>
                  {x.map((y, i) => (
                    <DramaReviewSliderItem
                      key={y.id}
                      title={y.title}
                      body={y.body}
                      rating={y.rating}
                      reviewerImageUrl={y.user.imageUrl ?? '/assets/icon/icon-user.svg'}
                      reviewerName={y.user.name}
                      createdAt={y.createdAt}
                      css={
                        i > 0
                          ? css`
                              margin-top: 10px;
                            `
                          : undefined
                      }
                    />
                  ))}
                </Slider.Item>
              ))}
            </Slider>
          </SlideWrapper>
        </Content>
      </Section>
    </Wrapper>
  );
}

export default memo(AmazingReviewCuration);

const Wrapper = styled.div`
  padding: 100px 0;
  min-height: 603px;
`;

const Section = styled.section`
  width: 100%;
  max-width: ${layouts.container}px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 500;
  color: ${selectForegroundColor('textPrimary')};
`;

const Content = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Image = styled.div`
  flex: none;
  width: 264px;
  height: 347px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Texts = styled.div`
  padding-left: 34px;
`;

const ProductionName = styled.span`
  font-size: 20px;
  color: ${selectForegroundColor('textPrimary')};
`;

const CurationTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  font-size: 38px;
  font-weight: bold;
  line-height: 43px;
  color: ${selectForegroundColor('textPrimary')};
`;

const LikeCount = styled.span`
  margin-left: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${selectForegroundColor('textPrimary')};
`;

const Summary = styled.p`
  margin: 15px 0 0 0;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
  color: ${selectForegroundColor('textPrimary')};
`;

const ButtonWrapper = styled.div`
  margin-top: 80px;
`;

const SlideWrapper = styled.div`
  flex: none;
  width: 400px;
  margin-left: 40px;
  min-height: 347px;
`;

function useReviews(dramaId: number) {
  const [reviews, setReviews] = useState<Review[] | undefined>(undefined);

  useEffect(() => {
    const subscription = fetchDramaReviews(dramaId)
      .pipe(map(reviews => reviews.map(reviewFromResponse)))
      .subscribe(reviews => {
        setReviews(reviews);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [dramaId]);

  return reviews;
}
