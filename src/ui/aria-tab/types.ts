import { AllHTMLAttributes } from 'react';

export type JSXElement = keyof JSX.IntrinsicElements;

export type WithCustomElement<
  Element extends JSXElement,
  ExcludeProps extends keyof AllHTMLAttributes<Element> = never
> = {
  as?: Element;
} & Omit<AllHTMLAttributes<Element>, 'as' | ExcludeProps>;
