import React, { ReactNode, useContext } from 'react';
import { SliderContext } from './contexts';
import { ListItem } from './styles';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SliderItem({ children, className }: Props) {
  const value = useContext(SliderContext);

  return (
    <ListItem
      size={value?.itemSize}
      spacing={value?.spacing !== undefined ? value.spacing / 2 : 0}
      className={className}
    >
      {children}
    </ListItem>
  );
}
