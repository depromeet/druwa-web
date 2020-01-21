import classNames from 'classnames';
import React, { forwardRef, HTMLProps } from 'react';
import { ErrorMessage, Input, InputBox } from './styles';

type InputProps = HTMLProps<HTMLInputElement>;
let uniqueId = 0;

interface Props extends InputProps {
  error?: string;
  className?: string;
}

export const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { error, id = `input-${uniqueId++}`, className, ...otherProps } = props;
  const showError = error !== undefined;

  return (
    <InputBox
      htmlFor={id}
      className={classNames(
        'FormField',
        'TextField',
        {
          ['TexField--errorCaught']: showError,
        },
        className,
      )}
    >
      <Input
        ref={ref}
        id={id}
        className={classNames('TextField__input', {
          ['TextField__input--errorCaught']: showError,
        })}
        {...otherProps}
      />
      {showError ? <ErrorMessage>{error}</ErrorMessage> : null}
    </InputBox>
  );
});
