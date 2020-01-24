import { useCallback, useState } from 'react';

export function useBooleanState(defaultValue = false) {
  const [bool, setBool] = useState(defaultValue);

  const setTrue = useCallback(() => {
    setBool(true);
  }, [setBool]);

  const setFalse = useCallback(() => {
    setBool(false);
  }, [setBool]);

  return [bool, setTrue, setFalse] as const;
}
