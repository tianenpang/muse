import { Fragment } from 'react';
import { default as NextHead } from 'next/head';
import { ThemeProvider, Web3Provider } from '@components';
import { BasicLayout } from '@layouts';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

const App: NextPage<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <Fragment>
      <NextHead>
        <base href="/" />
        <meta charSet="utf-8" />
        <title>Muse - NFTs Rental Marketplace</title>
        <meta name="description" content="NFTs Rental Marketplace" />
        <meta name="keywords" content="Decentralized, NFTs, Rental, Uncollateralized" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, viewport-fit=cover" />
      </NextHead>
      <ThemeProvider>
        <Web3Provider>
          <BasicLayout>
            <Component {...pageProps} />
          </BasicLayout>
        </Web3Provider>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
