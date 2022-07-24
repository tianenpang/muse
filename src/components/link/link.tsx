import { Fragment } from 'react';
import { default as NextLink } from 'next/link';
import { StyledLink } from './link.styles';
import type { CSS } from '@nextui-org/react';
import type { FC, HTMLAttributeAnchorTarget, ReactNode } from 'react';

export const Link: FC<LinkProps> = (props: LinkProps) => {
  const { href, css, children, ...rest } = props;

  return (
    <Fragment>
      <NextLink href={href} passHref>
        <StyledLink css={{ color: '$text', transition: '$color, $opacity, $boxShadow', br: '$xs', ...css }} {...rest}>
          {children}
        </StyledLink>
      </NextLink>
    </Fragment>
  );
};

interface LinkProps {
  css?: CSS;
  href: string;
  children: ReactNode;
  target?: HTMLAttributeAnchorTarget;
}
