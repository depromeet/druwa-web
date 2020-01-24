import React, { HTMLProps, ReactNode, useMemo } from 'react';
import { cssVisuallyHidden, styled } from '../../styles';

export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface Props extends Omit<HTMLProps<HTMLElement>, 'className' | 'children'> {
  /** @default h1 */
  as?: HeadingType;
  className?: string;
  children?: ReactNode;
}

/**
 * 보조기술에 읽히나 시각적으로 감춰진 헤딩 컴포넌트 입니다.
 *
 * 페이지 구역을 나눌때 보조기술은 HTML5 Outline과 다르게 작동하므로, 헤딩의 수준에 따라 'as'를 적절하게 사용하여 구역을
 * 의미있게 나눠주시기 바랍니다.
 *
 * @see https://www.accessibility-developer-guide.com/examples/headings/html-5-outline/
 */
export function HiddenHeading({ as = 'h1', className, children, ...props }: Props) {
  const Heading = useMemo(
    () =>
      styled[as]`
        ${cssVisuallyHidden};
      `,
    [as],
  );

  return (
    <Heading className={className} {...props}>
      {children}
    </Heading>
  );
}
