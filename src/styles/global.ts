import { globalCss } from '@nextui-org/react';

export const globalStyles = globalCss({
  '@font-face': {
    fontWeight: 400,
    fontStyle: 'normal',
    fontFamily: 'Inter',
    fontDisplay: 'optional',
    src: "url('/assets/fonts/Inter.woff2') format('woff2')"
  },
  'html, body': {
    size: '100%',
    transition: '$backgroundColor'
  },
  '#__next': {
    size: '100%',
    'div[data-overlay-container]': {
      size: '100%',
      'div[data-rk]': {
        size: '100%',
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-start'
      }
    }
  },
  '.portal': {
    us: 'none'
  },
  // nextui
  '.nextui-backdrop .nextui-backdrop-layer-blur': {
    backdropFilter: 'saturate(100%) blur(4px)'
  },
  // rainbowkit
  '[data-rk] .ju367v90': {
    us: 'none'
  },
  '[data-rk] ._9pm4ki3': {
    animationDuration: '250ms'
  }
});
