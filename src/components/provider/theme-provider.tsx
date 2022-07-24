import { createContext, Fragment, useCallback, useContext, useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { Toast } from '@components';
import { darkTheme, lightTheme } from '@styles';
import type { FC, ReactNode } from 'react';

const AppContext = createContext({
  // @ts-ignore TODO: add toast provider
  showToast: (title: string, description: string) => {},
  closeToast: () => {}
});

export const useToast = () => useContext(AppContext);

export const ThemeProvider: FC<ThemeProviderProps> = (props: ThemeProviderProps) => {
  const { children } = props;

  const [toast, setToast] = useState({ open: false, title: '', description: '' });

  const showToast = useCallback((title: string, description: string) => {
    setToast((prev) => ({ ...prev, open: true, title, description }));
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <Fragment>
      <AppContext.Provider value={{ showToast, closeToast }}>
        <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          value={{
            dark: darkTheme.className,
            light: lightTheme.className
          }}
        >
          <NextUIProvider>
            {children}
            <Toast {...toast} onOpenChange={closeToast} />
          </NextUIProvider>
        </NextThemeProvider>
      </AppContext.Provider>
    </Fragment>
  );
};

interface ThemeProviderProps {
  children?: ReactNode;
}
