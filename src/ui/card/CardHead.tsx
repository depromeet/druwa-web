import React, { ReactNode } from 'react';
import { Head } from './styles';

interface Props {
  /** @default 44 */
  size?: string | number;
  className?: string;
  children?: ReactNode;
}

export function CardHead({ size = 44, className, children }: Props) {
  // noinspection HtmlRequiredTitleElement
  return (
    <Head size={size} className={className}>
      {children}
    </Head>
  );
}
