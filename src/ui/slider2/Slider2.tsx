import classNames from 'classnames';
import React, { ReactNode, useMemo } from 'react';
import { useSpring } from 'react-spring';
import { usePrevious } from '../../hooks';
import { Slider2Context } from './contexts';
import { Slider2Item } from './Slider2Item';
import { List, Wrapper } from './styles';

interface Props {
  /** @default 0 */
  page?: number;
  /** @default 3 */
  size?: number;
  spacing: number;
  className?: string;
  children: ReactNode;
}

export function Slider2({ page = 0, size = 3, spacing, className, children }: Props) {
  const itemSize = useMemo(() => `${100 / size}%`, [size]);
  const prevPage = usePrevious(page) ?? 0;
  const slideStyle = useSpring({
    from: {
      transform: `translateX(${-prevPage * 100}%)`,
    },
    to: {
      transform: `translateX(${-page * 100}%)`,
    },
  });

  return (
    <Slider2Context.Provider
      value={{
        itemSize,
        spacing,
      }}
    >
      <Wrapper className={classNames('Slider2', className)}>
        <List style={slideStyle} className="Slider2__list">
          {children}
        </List>
      </Wrapper>
    </Slider2Context.Provider>
  );
}

Slider2.Item = Slider2Item;
