import { useCallback, useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matched, setMatched] = useState(false);

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setMatched(true);
    } else {
      setMatched(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(${query})`);
    media.addEventListener('change', updateTarget);
    if (media.matches) setMatched(true);
    return () => {
      media.removeEventListener('change', updateTarget);
    };
  }, [query, updateTarget]);

  return matched;
};
