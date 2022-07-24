import { Fragment } from 'react';
import { ConnectButton as RainbowButton } from '@rainbow-me/rainbowkit';
import { ConnectedButton } from '@components/wallet-button/connected-button';
import { ConnectButton } from './connect-button';
import { UnsupportedButton } from './unsupported-button';
import { StyledContainer } from './wallet-button.styles';
import type { ButtonProps } from '@nextui-org/react';
import type { FC } from 'react';

export const WalletButton: FC<WalletButtonProps> = (props: WalletButtonProps) => {
  const { ...rest } = props;

  return (
    <Fragment>
      <StyledContainer>
        <RainbowButton.Custom>
          {({ account, chain, openChainModal, openConnectModal, mounted }) => {
            if (!mounted || !account || !chain) {
              return (
                <ConnectButton {...rest} openConnectModal={() => openConnectModal()}>
                  Connect Wallet
                </ConnectButton>
              );
            }
            if (chain.unsupported) {
              return (
                <UnsupportedButton {...rest} openChainModal={() => openChainModal()}>
                  Unsupported Network
                </UnsupportedButton>
              );
            }
            return <ConnectedButton {...rest} chain={chain} account={account} openChainModal={() => openChainModal()} />;
          }}
        </RainbowButton.Custom>
      </StyledContainer>
    </Fragment>
  );
};

interface WalletButtonProps extends ButtonProps {}
