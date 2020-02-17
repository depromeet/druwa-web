import { useEffect, useMemo, useState } from 'react';
import { BehaviorSubject, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

const iconSaved = new Map<string, string>();
const isIconName = (iconName: string | undefined): iconName is string => iconName !== undefined;

function getIcon(iconName: string) {
  const filepath = `/assets/icon/icon-${iconName}.svg`;

  if (iconSaved.has(iconName)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return of(iconSaved.get(iconName)!);
  }

  // FIXME LATER: 한 아이콘에 대해서는 ajax 요청 한번만 하도록 고치기
  return ajax({
    method: 'GET',
    url: filepath,
    responseType: 'text',
  }).pipe(
    map(data => data.response as string),
    tap(iconData => {
      iconSaved.set(iconName, iconData);
    }),
    catchError(() => of('')),
  );
}

export function useSvgIcon(iconName: string) {
  const [svg, setSvg] = useState<string>('');
  const iconName$ = useMemo(() => new BehaviorSubject<string | undefined>(undefined), []);

  useEffect(() => {
    iconName$.next(iconName);
  }, [iconName$, iconName]);

  useEffect(() => {
    const subscription = iconName$.pipe(filter(isIconName), switchMap(getIcon)).subscribe(setSvg);

    return () => {
      iconName$.complete();
      subscription.unsubscribe();
    };
  }, [iconName$]);

  return svg;
}
