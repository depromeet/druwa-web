import classNames from 'classnames';
import React, { ReactNode, useLayoutEffect, useRef } from 'react';
import { scrollTo } from '../../core/animations';
import { ListContext } from './contexts';
import ListItem from './ListItem';
import { Wrapper } from './styles';

interface Props {
  itemSize: number;
  spacing: number;
  scrollIndexTo?: number;
  children: ReactNode;
  className?: string;
}

export default function List({ itemSize, spacing, scrollIndexTo, children, className }: Props) {
  const ref = useRef<HTMLUListElement | null>(null);

  useLayoutEffect(() => {
    if (scrollIndexTo !== undefined && ref.current !== null) {
      const distance = (itemSize + spacing) * scrollIndexTo + spacing / 2;
      scrollTo(ref.current, 'vertical', distance);
    }
  }, [itemSize, spacing, scrollIndexTo]);

  return (
    <ListContext.Provider
      value={{
        itemSize,
        spacing,
      }}
    >
      <Wrapper ref={ref} className={classNames('List', className)}>
        {children}
      </Wrapper>
    </ListContext.Provider>
  );
}

List.Item = ListItem;
