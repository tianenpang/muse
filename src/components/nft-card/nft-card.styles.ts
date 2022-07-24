import { StyledProgressBar } from '@nextui-org/react';
import type { CSS } from '@nextui-org/react';

export const cardStyles: { [key: string]: CSS } = {
  card: {
    $$cardColor: 'transparent',
    w: '100%',
    h: '400px',
    transition: '$background, $transform, $filter, $borderColor, $boxShadow'
  },
  header: {
    top: 0,
    zIndex: 1,
    position: 'absolute',
    bgBlur: '$cardHeaderBlur',
    borderBottom: '$borderWeights$light solid',
    borderColor: '$colors$cardHeaderBlur',
    transition: '$background, $borderColor'
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'transparent',
    transition: '$background',
    [`& ${StyledProgressBar}`]: {
      bg: '#FF4ECD',
      transition: '$width'
    }
  },
  body: {
    p: 0
  },
  footer: {
    bottom: 0,
    zIndex: 1,
    position: 'absolute',
    bgBlur: '$cardFooterBlur',
    borderTop: '$borderWeights$light solid',
    borderColor: '$colors$cardFooterBlur',
    transition: '$background, $borderColor'
  },
  text: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    transition: '$color'
  }
};
