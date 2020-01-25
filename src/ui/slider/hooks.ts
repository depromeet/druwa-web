import { useMemo, useState } from 'react';
import { useSpring } from 'react-spring';
import { EMPTY, fromEvent, merge } from 'rxjs';
import { useEventCallback, useObservable } from 'rxjs-hooks';
import {
  auditTime,
  filter,
  ignoreElements,
  map,
  mapTo,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { duration, eases, supportsElementScroll } from '../../core';
import { isElement } from '../../hooks';

interface SliderScrollState {
  scrollLeft: number;
  scrollWidth: number;
  width: number;
}

function getSliderScrollState(elem: HTMLElement | null) {
  return {
    scrollLeft: elem?.scrollLeft ?? 0,
    scrollWidth: elem?.scrollWidth ?? 0,
    width: elem?.getBoundingClientRect().width ?? 0,
  };
}

function shouldShowLeftNav({ scrollLeft }: SliderScrollState) {
  return scrollLeft > 0;
}

function shouldShowRightNav({ scrollLeft, scrollWidth, width }: SliderScrollState) {
  return scrollLeft === 0 ? true : scrollLeft < scrollWidth - width;
}

export function useSliderNavControl(elem: HTMLElement | null) {
  const scrollState = getSliderScrollState(elem);

  const canUseNav = useMemo(() => supportsElementScroll(), []);
  const [showLeftNav, setLeftNavShowState] = useState(shouldShowLeftNav(scrollState));
  const [showRightNav, setRightNavShowState] = useState(shouldShowRightNav(scrollState));

  const leftNavStyle = useSpring({
    opacity: canUseNav && showLeftNav ? 1 : 0,
    from: {
      opacity: 0,
    },
  });
  const rightNavStyle = useSpring({
    opacity: canUseNav && showRightNav ? 1 : 0,
    from: {
      opacity: 0,
    },
  });

  useObservable<void, [HTMLElement | null]>(
    input$ =>
      input$.pipe(
        map(([elem]) => elem),
        filter(isElement),
        switchMap(elem =>
          merge(
            fromEvent(elem, 'scroll'),
            fromEvent(window, 'resize'),
            fromEvent(window, 'orientationchange'),
          ).pipe(
            auditTime(16),
            map(() => getSliderScrollState(elem)),
            tap(state => {
              setLeftNavShowState(shouldShowLeftNav(state));
              setRightNavShowState(shouldShowRightNav(state));
            }),
          ),
        ),
        ignoreElements(),
      ),
    void 0,
    [elem],
  );

  return [showLeftNav, leftNavStyle, showRightNav, rightNavStyle] as const;
}

const horizontalScrollAnimation = (
  elem: HTMLElement,
  distance: number,
  direction: 1 | -1,
  speed: number,
) => {
  const startOffset = elem.scrollLeft;

  const min = 0;
  const max = elem.scrollWidth - elem.getBoundingClientRect().width + 1; // 1은 오차...

  const distanceOffset = Math.min(Math.max(startOffset + distance * direction, min), max);
  const dir = distanceOffset > startOffset ? 1 : -1;
  const diff = Math.abs(distanceOffset - startOffset);

  return duration(speed).pipe(
    map(eases.quarticInOut),
    map(timing => timing * diff),
    tap(frame => {
      elem?.scrollTo(startOffset + frame * dir, 0);
    }),
  );
};

interface SliderScrollingHookOptions {
  /** @default 1 */
  direction?: 1 | -1;
  speed?: number;
}

export function useSliderScrolling(
  elem: HTMLElement | null,
  options: SliderScrollingHookOptions = {},
) {
  const { direction = 1, speed = 500 } = options;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [animate] = useEventCallback<any, null, [HTMLElement | null, number, 1 | -1]>(
    (event$, inputs$) =>
      event$.pipe(
        withLatestFrom(inputs$),
        map(([, inputs]) => inputs),
        switchMap(inputs => {
          const [elem, speed, direction] = inputs;

          if (isElement(elem)) {
            return horizontalScrollAnimation(
              elem,
              elem.getBoundingClientRect().width,
              direction,
              speed,
            );
          }

          return EMPTY;
        }),
        mapTo(null),
      ),
    null,
    [elem, speed, direction],
  );

  return animate;
}
