import { useMemo } from 'react';

export function getQueryParam(key: string) {
  const query = window.location.search.substring(1);
  const queryParams = query.split('&');

  for (let i = 0; i < queryParams.length; i++) {
    const pair = queryParams[i].split('=');

    if (decodeURIComponent(pair[0]) === key) {
      return decodeURIComponent(pair[1]);
    }
  }

  return null;
}

export function useQueryParams(key: string) {
  return useMemo(() => getQueryParam(key), [key]);
}
