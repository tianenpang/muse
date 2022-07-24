import { useCallback, useMemo } from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import { useMediaQuery } from '@hooks';

export const useTheme = (): UseTheme => {
  const { theme: nextTheme, setTheme } = useNextTheme();
  const preferDark = useMediaQuery('prefers-color-scheme: dark');

  const isDark = useMemo<boolean>(() => {
    return Boolean(nextTheme === 'dark');
  }, [nextTheme]);

  const isSystem = useMemo<boolean>(() => {
    return Boolean(nextTheme === 'system');
  }, [nextTheme]);

  const toggleTheme = useCallback(() => {
    isSystem && preferDark ? setTheme('light') : setTheme(isDark ? 'light' : 'dark');
  }, [isDark, isSystem, preferDark, setTheme]);

  const forceTheme = useCallback(
    (theme: string) => {
      setTheme(theme);
    },
    [setTheme]
  );

  return { isDark, isSystem, toggleTheme, forceTheme };
};

interface UseTheme {
  isDark: boolean;
  isSystem: boolean;
  toggleTheme: () => void;
  forceTheme: (theme: string) => void;
}
