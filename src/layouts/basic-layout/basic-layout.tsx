import { Fragment, useCallback, useMemo } from 'react';
import { Container } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { ConnectCard, Footer, Header } from '@components';
import { pageMotion } from '@styles';
import { layoutStyles } from './basic-layout.styles';
import type { FC, ReactNode } from 'react';

export const BasicLayout: FC<BasicLayoutProps> = (props: BasicLayoutProps) => {
  const { children } = props;

  const { pathname } = useRouter();
  const { isConnected } = useAccount();

  const transitionKey = useMemo<string>(() => {
    if (pathname === '/') return pathname;
    return `${pathname}-${isConnected ? 'connected' : 'unconnected'}`;
  }, [pathname, isConnected]);

  const childrenRender = useCallback(() => {
    if (isConnected) return children;
    return <ConnectCard />;
  }, [children, isConnected]);

  return (
    <Fragment>
      <Header />
      <AnimatePresence initial={false} presenceAffectsLayout exitBeforeEnter>
        {/* @ts-ignore TODO: as motion elements*/}
        <Container key={transitionKey} as={motion.main} css={layoutStyles} md {...pageMotion}>
          {childrenRender()}
        </Container>
      </AnimatePresence>
      <Footer />
    </Fragment>
  );
};

interface BasicLayoutProps {
  children: ReactNode;
}
