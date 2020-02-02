import classNames from 'classnames';
import React, { ReactNode, useContext } from 'react';
import { ListContext } from './contexts';
import { Item } from './styles';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SliderItem({ children, className }: Props) {
  const value = useContext(ListContext);

  return (
    <Item
      size={value?.itemSize}
      spacing={value?.spacing !== undefined ? value.spacing : 0}
      className={classNames('ListItem', className)}
    >
      {children}
    </Item>
  );
}
