import { styled } from '@nextui-org/react';
import type { CSS } from '@nextui-org/react';

export const StyledFooter = styled('footer', {
  py: '$lg',
  mt: 'auto',
  us: 'none',
  pt: 'calc($lg * 2)',
  width: '100%',
  height: 'fit-content',
  zIndex: 'calc($max - 1)'
});

export const textStyles: CSS = {
  m: 0,
  transition: '$color'
};

export const avatarStyles: CSS = {
  transition: '$color',
  '& .nextui-avatar-bg': {
    transition: '$background, $boxShadow'
  }
};
