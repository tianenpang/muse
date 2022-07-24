import { createTheme } from '@nextui-org/react';
import type { BaseTheme } from '@nextui-org/react/types/theme/types';

const common: BaseTheme = {
  fonts: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Cantarell, "Fira Sans", "Helvetica Neue", sans-serif',
    mono: 'Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace'
  },
  transitions: {
    width: 'width 250ms ease 0s',
    color: 'color 250ms ease 0s',
    filter: 'filter 0.25s ease 0s',
    opacity: 'opacity 250ms ease 0s',
    transform: 'transform 0.25s ease 0s',
    boxShadow: 'box-shadow 250ms ease 0s',
    visibility: 'visibility 250ms ease 0s',
    background: 'background 250ms ease 0s',
    borderColor: 'border-color 250ms ease 0s',
    backgroundColor: 'background-color 250ms ease 0s',
    card: '$background, $transform, $filter, $boxShadow'
  }
};

export const lightTheme = createTheme({
  type: 'light',
  className: 'light-theme',
  theme: {
    ...common,
    colors: {
      primaryLight: 'hsla(0, 0%, 0%, 0.5)',
      primaryLightHover: 'hsla(0, 0%, 0%, 0.6)',
      primaryLightActive: 'hsla(0, 0%, 0%, 0.7)',
      primaryLightContrast: 'hsla(0, 0%, 0%, 1)',
      primary: 'hsla(0, 0%, 0%, 1)',
      primaryBorder: 'hsla(0, 0%, 0%, 0.8)',
      primaryBorderHover: 'hsla(0, 0%, 0%, 1)',
      primarySolidHover: 'hsla(0, 0%, 0%, 1)',
      primarySolidContrast: 'hsl(0, 0%, 100%, 1)',
      primaryShadow: 'hsla(0, 0%, 0%, 0.9)',
      cardHeaderBlur: 'hsla(0, 0%, 0%, 0.5)',
      cardFooterBlur: 'hsla(0, 0%, 100%, 0.5)'
    }
  }
});

export const darkTheme = createTheme({
  type: 'dark',
  className: 'dark-theme',
  theme: {
    ...common,
    colors: {
      primaryLight: 'hsla(0, 0%, 100%, 0.5)',
      primaryLightHover: 'hsla(0, 0%, 100%, 0.6)',
      primaryLightActive: 'hsla(0, 0%, 100%, 0.7)',
      primaryLightContrast: 'hsla(0, 0%, 100%, 1)',
      primary: 'hsla(0, 0%, 100%, 1)',
      primaryBorder: 'hsla(0, 0%, 100%,  0.8)',
      primaryBorderHover: 'hsla(0, 0%, 100%, 1)',
      primarySolidHover: 'hsla(0, 0%, 100%, 1)',
      primarySolidContrast: 'hsl(0, 0%, 0%, 1)',
      primaryShadow: 'hsla(0, 0%, 100%, 0.9)',
      cardHeaderBlur: 'hsla(0, 0%, 100%, 0.5)',
      cardFooterBlur: 'hsla(0, 0%, 0%, 0.5)'
    }
  }
});
