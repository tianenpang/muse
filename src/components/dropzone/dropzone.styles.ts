import { Card, styled, StyledProgressBar } from '@nextui-org/react';
import type { CSS, VariantProps } from '@nextui-org/react';

const dropzoneTokens = {
  $$dropzoneColor: 'transparent',
  $$dropzoneTextColor: '$colors$text',
  $$dropzonePlaceholderColor: '$colors$accents6',
  $$dropzoneShadow: '$shadows$sm',
  $$dropzoneBorderColor: '$colors$border',
  $$dropzoneHoverBorderColor: '$colors$foreground',
  $$dropzoneLabelColor: '$$inputHoverBorderColor'
};

export const StyledContainer = styled('div', {
  ...dropzoneTokens,
  width: 'initial',
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  boxSizing: 'border-box',
  variants: {
    color: {
      default: {},
      error: {
        $$dropzoneHoverBorderColor: '$colors$error',
        $$dropzoneLabelColor: '$colors$error'
      }
    },
    status: {
      default: {},
      error: {
        $$dropzoneColor: '$colors$errorLight',
        $$dropzoneTextColor: '$colors$errorLightContrast',
        $$dropzoneLabelColor: '$$dropzoneTextColor',
        $$dropzoneHoverBorderColor: '$colors$error',
        $$dropzoneBorderColor: '$colors$errorLight'
      }
    },
    helperColor: {
      default: {
        $$dropzoneHelperColor: '$colors$text'
      },
      error: {
        $$dropzoneHelperColor: '$colors$error'
      }
    }
  }
});

export const StyledLabel = styled('label', {
  mb: '$3',
  us: 'none',
  p: '0 0 0 $2',
  fontSize: '$md',
  display: 'block',
  lineHeight: '$md',
  fontWeight: '$normal',
  transition: '$color',
  color: '$$dropzoneTextColor'
});

export const StyledCard = styled(Card, {
  $$cardColor: '$$dropzoneColor',
  py: '$md',
  us: 'none',
  dflex: 'center',
  borderStyle: 'dashed',
  fs: '$fontSizes$md',
  br: '$space$7',
  color: '$colors$text',
  borderColor: '$$dropzoneBorderColor',
  transition: '$color,$background, $borderColor, $boxShadow',
  variants: {
    active: {
      true: {
        bg: '$accents0',
        boxShadow: '$$dropzoneShadow'
      }
    }
  },
  '.tip': {
    color: '$$dropzonePlaceholderColor',
    transition: '$color'
  }
});

export const StyledHelperTextContainer = styled('div', {
  opacity: 0,
  transition: '$opacity',
  position: 'absolute',
  bottom: 'calc(2.2 * -$space$5)',
  variants: {
    withValue: {
      true: {
        opacity: 1
      }
    }
  }
});

export const StyledHelperText = styled('p', {
  fs: '$xs',
  m: '$1 0 0 $5',
  color: '$$dropzoneHelperColor'
});

export const cardStyles: CSS = {
  transition: '$background, $transform, $filter, $borderColor, $boxShadow'
};

export const cardBodyStyles: CSS = {
  dflex: 'center',
  gap: '$sm'
};

export const previewImage: { [key: string]: CSS } = {
  card: {
    ...cardStyles,
    $$cardColor: 'transparent'
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
  col: {
    flex: 1,
    minWidth: 110
  },
  text: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    transition: '$color'
  }
};

export const previewAudio: { [key: string]: CSS } = {
  card: {
    ...cardStyles,
    us: 'none',
    $$cardColor: 'transparent'
  },
  header: {
    d: 'flex',
    ai: 'center',
    py: '$8'
  },
  body: {},
  progress: {
    transition: '$background',
    [`& ${StyledProgressBar}`]: {
      bg: '#FF4ECD',
      transition: '$width'
    }
  },
  footer: {
    pt: '$2',
    pb: '$8'
  },
  text: {
    transition: '$color'
  }
};

export type StyledContainerVariantProps = VariantProps<typeof StyledContainer>;
