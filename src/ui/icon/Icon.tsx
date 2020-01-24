import classNames from 'classnames';
import React, { HTMLProps, memo } from 'react';
import { useSvgIcon } from './hooks';
import { IconBox } from './styles';

interface Props
  extends Omit<
    HTMLProps<HTMLElement>,
    'name' | 'size' | 'children' | 'width' | 'height' | 'dangerouslySetInnerHTML'
  > {
  name: string;
  /** @default 24 */
  size?: number;
}

export const Icon = memo<Props>(({ name, size = 24, role = 'img', className, ...props }) => {
  const svg = useSvgIcon(name);

  return (
    <IconBox
      role={role}
      width={size}
      height={size}
      className={classNames('Icon', className)}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...props}
    />
  );
});
