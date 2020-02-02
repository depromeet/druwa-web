import { useCallback, useState } from 'react';
import { Nullable } from '../utils';

export function isElement<T extends HTMLElement = HTMLElement>(
  elemOrNull: Nullable<T> | undefined,
): elemOrNull is T {
  return elemOrNull != null;
}

export function useElementRef<T extends HTMLElement = HTMLElement>() {
  const [elem, setElem] = useState<Nullable<T>>(null);
  const onRef = useCallback((elem: Nullable<T>) => {
    setElem(elem);
  }, []);

  return [elem, onRef] as const;
}
