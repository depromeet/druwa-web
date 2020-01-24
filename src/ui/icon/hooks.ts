import { useEffect, useMemo, useState } from 'react';
import { BehaviorSubject, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

const isIconName = (iconName: string | undefined): iconName is string => iconName !== undefined;

function getIcon(iconName: string) {
  const filepath = `/assets/icon/icon-${iconName}.svg`;

  return ajax({
    method: 'GET',
    url: filepath,
    responseType: 'text',
  }).pipe(
    map(data => data.response as string),
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
