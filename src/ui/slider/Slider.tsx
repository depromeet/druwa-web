import React, { ReactNode } from 'react';
import { Button } from '../button';
import { HeadingType, HiddenHeading } from '../hidden-heading';
import { Icon } from '../icon';
import { SliderContext } from './contexts';
import { useSliderDom, useSliderNavControl, useSliderScrolling } from './hooks';
import SliderItem from './SliderItem';
import { List, NavWrapper, Wrapper } from './styles';

interface Props {
  title?: string;
  headingLevel?: HeadingType;
  page?: number;
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
  page = 0,
  itemSize,
  spacing,
  className,
  children,
  leftNavTitle = '좌로 스크롤하기',
  rightNavTitle = '우로 스크롤하기',
}: Props) {
  const [elem, onElemRef] = useSliderDom();
  const [showLeftNav, leftNavStyle, showRightNav, rightNavStyle] = useSliderNavControl(elem);

  const scrollToLeft = useSliderScrolling(elem, {
    direction: -1,
  });
  const scrollToRight = useSliderScrolling(elem, {
    direction: 1,
  });

  return (
    <SliderContext.Provider
      value={{
        page,
        itemSize,
        spacing,
      }}
    >
      <Wrapper className={className}>
        {title !== undefined ? <HiddenHeading as={headingLevel}>{title}</HiddenHeading> : null}
        <List ref={onElemRef} spacing={spacing / 2}>
          {children}
        </List>
        <NavWrapper align="left" style={leftNavStyle} aria-hidden={!showLeftNav}>
          <Button type="icon" size={48} aria-label={leftNavTitle} onClick={scrollToLeft}>
            <Icon name="arrow-next" size={24} aria-hidden={true} />
          </Button>
        </NavWrapper>
        <NavWrapper align="right" style={rightNavStyle} aria-hidden={!showRightNav}>
          <Button type="icon" size={48} aria-label={rightNavTitle} onClick={scrollToRight}>
            <Icon name="arrow-next" size={24} aria-hidden={true} />
          </Button>
        </NavWrapper>
      </Wrapper>
    </SliderContext.Provider>
  );
}

Slider.Item = SliderItem;
