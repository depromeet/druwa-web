import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSpring } from 'react-spring';
import { BehaviorSubject, EMPTY, fromEvent, merge, Subject } from 'rxjs';
import { useObservable } from 'rxjs-hooks';
import { auditTime, filter, ignoreElements, map, switchMap, tap } from 'rxjs/operators';
import { supportsElementScroll } from '../../core';
import { scrollAnimation } from '../../core/animations';
import { isElement } from '../../hooks';
import { Nullable } from '../../utils';
import { SliderContextValue } from './contexts';

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

type SliderScrollAnimationDirection = 'left' | 'right';

function getNextScrollDistance(
  direction: SliderScrollAnimationDirection,
  options: {
    state: SliderScrollState;
    context: SliderContextValue;
  },
) {
  const { state, context } = options;
  const { scrollLeft, width } = state;
  const { itemSize, spacing, threshold } = context;

  let nextIndex: number = 0;
  if (direction === 'left') {
    const n = Math.floor((scrollLeft - threshold) / (itemSize + spacing)) + 1;
    const count = Math.floor((width - threshold) / (itemSize + spacing));

    nextIndex = n - count;
  } else if (direction === 'right') {
    nextIndex = Math.floor((scrollLeft + width - threshold) / (itemSize + spacing)) + 1;
  }

  return (itemSize + spacing) * (nextIndex - 1) - threshold;
}

export function useSliderScrollAnimation(
  elem: Nullable<HTMLElement>,
  context: SliderContextValue | undefined,
) {
  const animate$ = useMemo(() => new Subject<SliderScrollAnimationDirection>(), []);
  const elem$ = useMemo(
    () => new BehaviorSubject<Nullable<HTMLElement> | undefined>(undefined),
    [],
  );
  const context$ = useMemo(
    () => new BehaviorSubject<SliderContextValue | undefined>(undefined),
    [],
  );

  useEffect(() => {
    elem$.next(elem);
  }, [elem$, elem]);

  useEffect(() => {
    context$.next(context);
  }, [context$, context]);

  useEffect(() => {
    const subscription = animate$
      .pipe(
        switchMap(direction => {
          const elem = elem$.getValue();
          const context = context$.getValue();

          if (!isElement(elem) || context === undefined) {
            return EMPTY;
          }

          const scrollState = getSliderScrollState(elem);
          const distanceOffset = getNextScrollDistance(direction, {
            state: scrollState,
            context,
          });

          return scrollAnimation(elem, {
            direction: 'horizontal',
            distanceOffset,
            speed: 500,
            min: 0,
            max: elem.scrollWidth - elem.getBoundingClientRect().width + 1, // 1은 오차...
          });
        }),
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
      elem$.complete();
      context$.complete();
    };
  }, [animate$, elem$, context$]);

  return useCallback(
    (direction: SliderScrollAnimationDirection) => {
      animate$.next(direction);
    },
    [animate$],
  );
}
