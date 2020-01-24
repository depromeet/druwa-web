import React, { memo } from 'react';
import { coerceCssPixelValue } from '../utils';

interface Props {
  size: number | string;
}

function Spacing({ size }: Props) {
  return <div style={{ height: coerceCssPixelValue(size) }} />;
}

export default memo(Spacing);
