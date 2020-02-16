import React, { memo, ReactNode, useCallback, useRef } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useInputValue } from '../hooks';
import {
  cssButtonReset,
  fontSizes,
  fontWeights,
  lineHeights,
  selectBackgroundColor,
  selectForegroundColor,
  styled,
} from '../styles';
import { Button } from '../ui/button';

interface Props {
  maxLength?: number;
  disabled?: boolean;
  disabledText?: ReactNode;
  placeholder?: string;
  className?: string;
  onLogin?(): void;
  onSubmit?(text: string): void;
}

function TextWriter({
  maxLength,
  disabled,
  disabledText = '댓글을',
  placeholder,
  className,
  onLogin,
  onSubmit,
}: Props) {
  const [value, setValue] = useInputValue<HTMLTextAreaElement>('');

  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const handleSubmit = useCallback(() => {
    if (value.length === 0) {
      submitButtonRef.current?.focus?.();
      return;
    }

    onSubmit?.(value);
  }, [value, onSubmit]);

  return (
    <Wrapper className={className}>
      <TextareaWrapper>
        <Textarea
          value={value}
          rows={2}
          maxLength={maxLength}
          disabled={disabled}
          placeholder={disabled ? undefined : placeholder}
          onChange={setValue}
        />
        {disabled ? (
          <Disabled>
            {disabledText} 작성하려면 <LoginAnchor onClick={onLogin}>로그인</LoginAnchor> 해주세요.
          </Disabled>
        ) : null}
      </TextareaWrapper>
      <Tools>
        <MaxLength>{maxLength !== undefined ? `${value.length}/${maxLength}` : ''}</MaxLength>
        <Button ref={submitButtonRef} color="dark" size={36} onClick={handleSubmit}>
          등록하기
        </Button>
      </Tools>
    </Wrapper>
  );
}

export default memo(TextWriter);

const Wrapper = styled.div`
  width: 100%;
  background-color: ${selectBackgroundColor('textarea')};
  border-radius: 4px;
`;

const TextareaWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 16px;
  background-color: ${selectBackgroundColor('textarea')};
  border-bottom: 1px solid ${selectBackgroundColor('base')};
`;

const Textarea = styled(TextareaAutosize)`
  display: block;
  width: 100%;
  padding: 0;
  font-size: ${fontSizes.regular}px;
  font-weight: ${fontWeights.regular};
  line-height: ${lineHeights.normal};
  color: ${selectForegroundColor('textPrimary')};
  background: transparent;
  border: none;
  outline: 0;
  resize: none;

  &::placeholder {
    color: ${selectForegroundColor('textSecondary')};
  }
`;

const Disabled = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
  right: 16px;
  bottom: 16px;
  font-size: ${fontSizes.regular}px;
  font-weight: ${fontWeights.regular};
  line-height: ${lineHeights.normal};
  color: ${selectForegroundColor('textSecondary')};
`;

const LoginAnchor = styled.button`
  ${cssButtonReset};
  padding: 0;
  display: inline;
  background: transparent;
  text-decoration: underline;
  font-size: ${fontSizes.regular}px;
  font-weight: ${fontWeights.regular};
  line-height: ${lineHeights.normal};
  color: ${selectForegroundColor('textSecondary')};
`;

const Tools = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
  height: 56px;
`;

const MaxLength = styled.div`
  display: inline-flex;
  font-size: ${fontSizes.regular}px;
  font-weight: ${fontWeights.regular};
  line-height: ${lineHeights.normal};
  color: ${selectForegroundColor('textSecondary')};
`;
