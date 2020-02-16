import classNames from 'classnames';
import React, { HTMLProps, ReactNode, useContext } from 'react';
import { Slider2Context } from './contexts';
import { ListItem } from './styles';

interface Props extends HTMLProps<HTMLLIElement> {
  children: ReactNode;
  className?: string;
}

export function Slider2Item({ children, className, ...props }: Props) {
  const value = useContext(Slider2Context);

  return (
    <ListItem
      {...props}
      size={value?.itemSize}
      spacing={value?.spacing !== undefined ? value.spacing / 2 : 0}
      className={classNames('Slider2Item', className)}
    >
      {children}
    </ListItem>
  );
}
