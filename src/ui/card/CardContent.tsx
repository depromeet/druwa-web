import React, { ReactNode } from 'react';
import { Content } from './styles';

interface Props {
  /** @default 24 */
  verticalPadding?: string | number;
  /** @default 16 */
  horizontalPadding?: string | number;
  className?: string;
  children?: ReactNode;
}

export function CardContent({
  verticalPadding = 24,
  horizontalPadding = 16,
  className,
  children,
}: Props) {
  return (
    <Content
      paddingTop={verticalPadding}
      paddingBottom={verticalPadding}
      paddingLeft={horizontalPadding}
      paddingRight={horizontalPadding}
      className={className}
    >
      {children}
    </Content>
  );
}
