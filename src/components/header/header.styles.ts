import { styled } from '@nextui-org/react';
import type { CSS } from '@nextui-org/react';

export const StyledHeader = styled('header', {
  py: '$lg',
  top: 0,
  us: 'none',
  width: '100%',
  height: 'fit-content',
  position: 'sticky',
  zIndex: 'calc($max - 1)',
  backdropFilter: 'saturate(100%) blur(14px)'
});

export const containerCss: CSS = {
  gap: '$md'
};

export const titleCss: CSS = {
  fontSize: '$lg',
  fontWeight: '$semibold'
};

export const navCss: CSS = {
  m: 0,
  ml: '$xl',
  mw: '100%',
  gap: '$md'
};
