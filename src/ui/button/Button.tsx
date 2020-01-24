import classNames from 'classnames';
import React, { HTMLProps, ReactNode } from 'react';
import { Wrapper, Content } from './styles';
import { ButtonColor, ButtonSize, ButtonType } from './types';

interface Props extends Omit<HTMLProps<HTMLButtonElement>, 'size' | 'type'> {
  /** @default 'normal' */
  color?: ButtonColor;
  /** @default 28 */
  size?: ButtonSize;
  /** @default 'flat' */
  type?: ButtonType;
  rounded?: boolean;
  buttonType?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
}

export function Button({
  type = 'flat',
  color = 'normal',
  size = 28,
  rounded = false,
  buttonType = 'button',
  className,
  children,
  ...props
}: Props) {
  return (
    <Wrapper
      type={buttonType}
      className={classNames(
        'Button',
        {
          [`Button--type-${type}`]: true,
          [`Button--size-${size}`]: true,
          'Button--rounded': rounded,
          [`Button--color-${color}`]: true,
        },
        className,
      )}
      {...props}
    >
      <Content className="Button__content">{children}</Content>
    </Wrapper>
  );
}
