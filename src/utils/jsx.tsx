import React, { Fragment } from 'react';

export function convertNewlineToJSX(str: string) {
  return str.split('\n').map((line, index) => (
    <Fragment key={index}>
      {index > 0 ? <br /> : ''}
      {line}
    </Fragment>
  ));
}
