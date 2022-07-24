import { styled } from '@nextui-org/react';
import type { CSS, VariantProps } from '@nextui-org/react';

export const StyledSVG = styled('svg', {});

export type StyledSVGVariantProps = VariantProps<typeof StyledSVG>;

export type StyledSVGProps = StyledSVGVariantProps & {
  css?: CSS;
};
