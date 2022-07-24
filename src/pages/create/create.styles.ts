import { styled } from '@nextui-org/react';
import type { CSS } from '@nextui-org/react';

export const containerStyles: CSS = {
  m: 0,
  size: '100%',
  px: 'calc(16 * $sm)',
  '@smMax': {
    px: 'calc(6 * $sm)'
  },
  '@xsMax': {
    px: 0
  }
};

export const StyledForm = styled('form', {
  size: '100%',
  display: 'flex',
  gap: '$xl',
  flexFlow: 'column wrap',
  '.nextui-input-wrapper': {
    transition: '$background, $boxShadow'
  },
  '.nextui-input-container--input, .nextui-input-container--textarea': {
    transition: '$transform'
  },
  '.nextui-input-block-label, .nextui-input, .nextui-input-textarea, .nextui-input-helper-text': {
    transition: '$color'
  },
  '.nextui-input-helper-text': {
    fs: '$xs'
  },
  '.nextui-input-label--right': {
    transition: '$background, $color'
  }
});

export const buttonStyles: CSS = {
  '.nextui-button-text': {
    dflex: 'center',
    gap: '$md'
  }
};
