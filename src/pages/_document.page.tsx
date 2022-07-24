import { Children } from 'react';
import { CssBaseline } from '@nextui-org/react';
import { default as NextDocument, Head as NextHead, Html as NextHTML, Main as NextMain, NextScript } from 'next/document';
import { globalStyles } from '@styles';
import type { NextPage } from 'next';
import type { DocumentContext, DocumentInitialProps, DocumentProps } from 'next/document';

const Doc: NextPage<DocumentProps, DocumentInitialProps> = (props: DocumentProps) => {
  const { locale } = props;

  return (
    <NextHTML dir="ltr" lang={locale}>
      <NextHead>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="follow, index" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="preload" href="/assets/fonts/Inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={locale} />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="/assets/image/og.png" />
        <meta name="twitter:image" content="/assets/image/og.png" />
        <meta property="og:description" content="NFTs Rental Marketplace" />
        <meta name="twitter:description" content="NFTs Rental Marketplace" />
        <meta property="og:title" content="Muse - NFTs Rental Marketplace" />
        <meta name="twitter:title" content="Muse - NFTs Rental Marketplace" />
        <meta property="og:site_name" content="Muse - NFTs Rental Marketplace" />
      </NextHead>
      <body>
        <NextMain />
        <NextScript />
      </body>
    </NextHTML>
  );
};

Doc.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
  const initialProps = await NextDocument.getInitialProps(ctx);
  globalStyles();

  return {
    ...initialProps,
    styles: Children.toArray([initialProps.styles, CssBaseline.flush()])
  };
};

export default Doc;
