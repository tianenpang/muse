import { styled } from '@nextui-org/react';
import { default as NextImage } from 'next/image';

export const StyledNextImage = styled(NextImage, {
  us: 'none',
  br: '$pill',
  pointerEvents: 'none'
});
