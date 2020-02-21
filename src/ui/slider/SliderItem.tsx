import classNames from 'classnames';
import React, { ReactNode, useContext } from 'react';
import { SliderContext } from './contexts';
import { ListItem } from './styles';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SliderItem({ children, className }: Props) {
  const value = useContext(SliderContext);

  // const itemStyle = useSpring({
  //   opacity: impressed ? 1 : 0.1,
  //   from: {
  //     opacity: 1,
  //   },
  // });

  return (
    <ListItem
      size={value?.itemSize}
      spacing={value?.spacing !== undefined ? value.spacing / 2 : 0}
      className={classNames('SliderItem', className)}
    >
      {children}
    </ListItem>
  );
}
