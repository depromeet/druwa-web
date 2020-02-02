import classNames from 'classnames';
import { css } from '@emotion/core';
import React, { ReactNode } from 'react';
import { useElementRef } from '../../hooks';
import { Button } from '../button';
import { HeadingType, HiddenHeading } from '../hidden-heading';
import { Icon } from '../icon';
import { SliderContext } from './contexts';
import { useSliderNavControl, useSliderScrollAnimation } from './hooks';
import SliderItem from './SliderItem';
import { List, NavWrapper, Wrapper } from './styles';

interface Props {
  title?: string;
  headingLevel?: HeadingType;
  itemSize: number;
  spacing: number;
  className?: string;
  leftNavTitle?: string;
  rightNavTitle?: string;
  children: ReactNode;

  onPageChange?(page: number): void;
}

export default function Slider({
  title,
  headingLevel = 'h3',
  itemSize,
  spacing,
  className,
  children,
  leftNavTitle = '좌로 스크롤하기',
  rightNavTitle = '우로 스크롤하기',
}: Props) {
  const [elem, onElemRef] = useElementRef();
  const [showLeftNav, leftNavStyle, showRightNav, rightNavStyle] = useSliderNavControl(elem);
  const scrollTo = useSliderScrollAnimation(elem, {
    itemSize,
    threshold: 64,
    spacing,
  });

  return (
    <SliderContext.Provider
      value={{
        itemSize,
        threshold: 64,
        spacing,
      }}
    >
      <Wrapper className={classNames('Slider', className)}>
        {title !== undefined ? <HiddenHeading as={headingLevel}>{title}</HiddenHeading> : null}
        <List ref={onElemRef} spacing={spacing / 2} className="Slider__list">
          {children}
        </List>
        <NavWrapper
          align="left"
          style={leftNavStyle}
          aria-hidden={!showLeftNav}
          className="Slider__nav Slider__nav--left"
        >
          <Button
            type="icon"
            size={48}
            aria-label={leftNavTitle}
            onClick={() => scrollTo('left')}
            className="Slider__navButton"
          >
            <Icon
              name="arrow-next"
              size={24}
              aria-hidden={true}
              css={css`
                transform: rotate(180deg);
              `}
            />
          </Button>
        </NavWrapper>
        <NavWrapper
          align="right"
          style={rightNavStyle}
          aria-hidden={!showRightNav}
          className="Slider__nav Slider__nav--right"
        >
          <Button
            type="icon"
            size={48}
            aria-label={rightNavTitle}
            onClick={() => scrollTo('right')}
            className="Slider__navButton"
          >
            <Icon name="arrow-next" size={24} aria-hidden={true} />
          </Button>
        </NavWrapper>
      </Wrapper>
    </SliderContext.Provider>
  );
}

Slider.Item = SliderItem;
