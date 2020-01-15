import React, { ReactNode } from 'react';
import { Head } from './styles';

interface Props {
  className?: string;
  children?: ReactNode;
}

export function CardHead({ className, children }: Props) {
  // noinspection HtmlRequiredTitleElement
  return <Head className={className}>{children}</Head>;
}
