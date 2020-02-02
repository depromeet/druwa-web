import classNames from 'classnames';
import React, { forwardRef, HTMLProps, ReactNode } from 'react';
import { Content, Wrapper } from './styles';
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

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      type = 'flat',
      color = 'normal',
      size = 28,
      rounded = false,
      buttonType = 'button',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Wrapper
        ref={ref}
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
  },
);
