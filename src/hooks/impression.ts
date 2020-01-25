import { iif, Observable } from 'rxjs';
import { useObservable } from 'rxjs-hooks';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { supportsIntersectionObserver } from '../core';

interface ImpressionRefHookOptions {
  rootMargin?: string;
  /**
   * 몇 퍼센트 이상 화면에 표시되면 "보인다"고 생각할지 결정합니다.
   * 예를 들어, 0.5가 주어지면 0.5 이상이 보여졌을 때 `true`, 이하가 보여졌을 때 `false`가 반환됩니다.
   * @default 0
   */
  areaThreshold?: number;
  /**
   * 몇 밀리세컨드 이상 화면에 표시되거나 사라져야 실제로 값을 업데이트할지 결정합니다.
   * 예를 들어, 값이 2000이면 2초 사이에 요소의 표시 상태가 바뀌어도 첫 상태와 끝 상태가 같다면 이벤트가 호출되지 않습니다.
   * @default 0
   */
  timeThreshold?: number;
}

const isElement = (elem: HTMLElement | null): elem is HTMLElement => elem !== null;

function intersectionObserver(
  elem: HTMLElement,
  options: Pick<ImpressionRefHookOptions, 'rootMargin' | 'areaThreshold'> = {},
) {
  const { rootMargin, areaThreshold: threshold = 0 } = options;

  return new Observable<boolean>(subscriber => {
    if (!supportsIntersectionObserver()) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        const currentRatio = entry.intersectionRatio;

        const didImpressionEnd = threshold === 0 ? !entry.isIntersecting : currentRatio < threshold;

        subscriber.next(!didImpressionEnd);
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(elem);

    return () => {
      observer.unobserve(elem);
      observer.disconnect();
    };
  });
}

export function useImpression<T extends HTMLElement = HTMLElement>(
  elem: T | null,
  initialState: boolean = true,
  options: ImpressionRefHookOptions = {},
) {
  const { rootMargin, areaThreshold, timeThreshold = 0 } = options;

  return useObservable<
    boolean,
    [HTMLElement | null, string | undefined, number | undefined, number]
  >(
    input$ =>
      input$.pipe(
        filter(([elem]) => isElement(elem)),
        switchMap(([elem, rootMargin, areaThreshold, timeThreshold]) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const intersection$ = intersectionObserver(elem!, { rootMargin, areaThreshold });

          return iif(
            () => timeThreshold > 0,
            intersection$.pipe(debounceTime(timeThreshold)),
            intersection$,
          );
        }),
      ),
    initialState,
    [elem, rootMargin, areaThreshold, timeThreshold],
  );
}
