import { Fragment, useMemo } from 'react';
import { Container } from '@nextui-org/react';
import { useAccount } from 'wagmi';
import { Link, WalletButton } from '@components';
import { containerCss, navCss, StyledHeader, titleCss } from './header.styles';
import type { FC } from 'react';

export const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const {} = props;

  const { isConnected } = useAccount();

  const navs = useMemo<LinkItem[]>(() => {
    return [
      { name: 'Home', href: '/' },
      { name: 'Create', href: '/create' }
    ];
  }, []);

  return (
    <Fragment>
      <StyledHeader>
        <Container display="flex" justify="space-between" alignItems="center" wrap="nowrap" css={containerCss} md>
          <Link href="/" css={titleCss}>
            Muse
          </Link>
          <Container as="nav" display="flex" direction="row" justify="flex-start" alignItems="center" css={navCss} gap={0}>
            {navs.map(({ href, name }: LinkItem) => (
              <Link key={name} href={href}>
                {name}
              </Link>
            ))}
          </Container>
          <WalletButton bordered={!isConnected} />
        </Container>
      </StyledHeader>
    </Fragment>
  );
};

export type LinkItem = {
  name: string;
  href: string;
};

interface HeaderProps {}
