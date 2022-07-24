import { Link, styled } from '@nextui-org/react';

export const StyledLink = styled(Link, {
  br: '$md',
  WebkitTapHighlightColor: 'transparent',
  '&:focus': {
    outlineOffset: '2px',
    outline: 'transparent solid 2px',
    boxShadow: '0 0 0 2px $colors$background, 0 0 0 4px $colors$primary'
  },
  '&:focus:not(&:focus-visible)': {
    boxShadow: 'none'
  },
  '@safari': {
    outline: 'none'
  }
});
