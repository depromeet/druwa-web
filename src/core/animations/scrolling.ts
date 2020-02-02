import { map, tap } from 'rxjs/operators';
import { duration, eases } from '../rx-animations';

export interface ScrollAnimationOptions {
  distanceOffset: number;
  /** @default 'vertical' */
  direction?: 'vertical' | 'horizontal';
  /** @default 500 */
  speed?: number;
  min?: number;
  max?: number;
}

function getStartOffset(elem: HTMLElement, direction: ScrollAnimationOptions['direction']) {
  switch (direction) {
    case 'vertical':
      return elem.scrollTop;
    case 'horizontal':
      return elem.scrollLeft;
  }

  return 0;
}

export function scrollTo(
  elem: HTMLElement,
  direction: ScrollAnimationOptions['direction'],
  distance: number,
) {
  switch (direction) {
    case 'vertical':
      elem?.scrollTo(0, distance);
      break;
    case 'horizontal':
      elem?.scrollTo(distance, 0);
      break;
  }
}

export function scrollAnimation(elem: HTMLElement, options: ScrollAnimationOptions) {
  const { distanceOffset, direction = 'vertical', speed = 500, min, max } = options;

  const startOffset = getStartOffset(elem, direction);

  let distance = distanceOffset;
  if (min !== undefined) {
    distance = Math.max(distance, min);
  }
  if (max !== undefined) {
    distance = Math.min(distance, max);
  }

  const dir = distance > startOffset ? 1 : -1;
  const diff = Math.abs(distance - startOffset);

  return duration(speed).pipe(
    map(eases.quarticInOut),
    map(timing => timing * diff),
    tap(frame => {
      scrollTo(elem, direction, startOffset + frame * dir);
    }),
  );
}
