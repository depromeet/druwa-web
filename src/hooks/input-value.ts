import { useCallback, useState, KeyboardEvent } from 'react';

export function useInputValue<T extends HTMLElement = HTMLInputElement>(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const handleValueChange = useCallback((event: KeyboardEvent<T>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue((event.target as any).value);
  }, []);

  return [value, handleValueChange] as const;
}
