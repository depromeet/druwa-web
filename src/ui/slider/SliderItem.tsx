import classNames from 'classnames';
import React, { ReactNode, useContext } from 'react';
import { useSpring } from 'react-spring';
import { useElementRef, useImpression } from '../../hooks';
import { SliderContext } from './contexts';
import { ListItem } from './styles';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SliderItem({ children, className }: Props) {
  const value = useContext(SliderContext);
  const [elem, elemRef] = useElementRef();
  const impressed = useImpression(elem, true, {
    areaThreshold: 1,
    timeThreshold: 150,
  });

  const itemStyle = useSpring({
    opacity: impressed ? 1 : 0.1,
    from: {
      opacity: 1,
    },
  });

  return (
    <ListItem
      ref={elemRef}
      size={value?.itemSize}
      spacing={value?.spacing !== undefined ? value.spacing / 2 : 0}
      style={itemStyle}
      className={classNames('SliderItem', className)}
    >
      {children}
    </ListItem>
  );
}
