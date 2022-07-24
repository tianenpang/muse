import { styled } from '@nextui-org/react';
import type { CSS } from '@nextui-org/react';

export const StyledMimeContainer = styled('div', {
  width: 'initial',
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  boxSizing: 'border-box',
  '.mime-card': {
    py: '$xs',
    gap: '$xs',
    transition: '$background, $transform, $filter, $borderColor, $boxShadow'
  },
  '.mime-card-body, .mime-card-footer': {
    p: 0,
    dflex: 'center'
  },
  '.mime-card-body, .mime-card-text': {
    transition: '$color'
  }
});

export const StyledLabel = styled('label', {
  mb: '$3',
  us: 'none',
  p: '0 0 0 $2',
  fontSize: '$md',
  display: 'block',
  lineHeight: '$md',
  color: '$foreground',
  fontWeight: '$normal'
});

export const StyledMime = styled('div', {
  display: 'flex',
  gap: '$xl',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  '@smMax': {
    gap: '$md'
  },
  '@xsMax': {
    gap: '$sm',
    flexFlow: 'column nowrap'
  }
});

export const selectedCardStyles: CSS = {
  $$cardColor: '$colors$secondaryLight',
  $$cardTextColor: '$colors$secondaryLightContrast',
  borderColor: '$colors$secondaryBorder',
  '.mime-card-text': {
    color: '$$cardTextColor'
  }
};
