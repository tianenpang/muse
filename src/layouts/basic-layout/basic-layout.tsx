import { Fragment, useMemo } from 'react';
import { Container } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Footer, Header } from '@components';
import { pageMotion } from '@styles';
import { layoutStyles } from './basic-layout.styles';
import type { FC, ReactNode } from 'react';

export const BasicLayout: FC<BasicLayoutProps> = (props: BasicLayoutProps) => {
  const { children } = props;

  const { pathname } = useRouter();

  const transitionKey = useMemo<string>(() => pathname, [pathname]);

  return (
    <Fragment>
      <Header />
      <AnimatePresence initial={false} presenceAffectsLayout exitBeforeEnter>
        {/* @ts-ignore TODO: as motion elements*/}
        <Container key={transitionKey} as={motion.main} css={layoutStyles} md {...pageMotion}>
          {children}
        </Container>
      </AnimatePresence>
      <Footer />
    </Fragment>
  );
};

interface BasicLayoutProps {
  children: ReactNode;
}
