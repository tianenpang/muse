import { Fragment, useCallback } from 'react';
import { Button, Card, Text } from '@nextui-org/react';
import { default as NextHead } from 'next/head';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { WalletButton } from '@components';
import { bodyStyles, cardStyles, dividerStyles, footerStyles, headerStyles, textStyles } from './connect-card.styles';
import type { FC, ReactNode } from 'react';

export const ConnectCard: FC<ConnectCardProps> = (props: ConnectCardProps) => {
  const { children } = props;

  const { push } = useRouter();
  const { isConnected } = useAccount();

  const goHomeHandler = useCallback(async () => {
    await push('/');
  }, [push]);

  // TODO: WalletButton flashing when page transition and isConnected
  if (isConnected) return <Fragment />;

  return (
    <Fragment>
      <NextHead>
        <title>Connect Wallet | Muse - NFTs Rental Marketplace</title>
      </NextHead>
      <Card css={cardStyles}>
        <Card.Header css={headerStyles}>
          <Text h4 css={textStyles}>
            Connect Wallet
          </Text>
        </Card.Header>
        <Card.Divider css={dividerStyles} />
        <Card.Body css={bodyStyles}>
          <Text css={textStyles}>{children ?? 'Connect the wallet for next step.'}</Text>
        </Card.Body>
        <Card.Footer css={footerStyles}>
          <Button ripple={false} auto light onClick={() => goHomeHandler()}>
            Home
          </Button>
          <WalletButton bordered={false} />
        </Card.Footer>
      </Card>
    </Fragment>
  );
};

interface ConnectCardProps {
  children?: ReactNode;
}
