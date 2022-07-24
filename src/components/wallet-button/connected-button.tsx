import { Fragment, useCallback, useMemo } from 'react';
import { Button, Dropdown } from '@nextui-org/react';
import { default as NextImage } from 'next/image';
import { Category as CategoryIcon, Logout as LogoutIcon, Swap as SwapIcon, Wallet as WalletIcon } from 'react-iconly';
import { useDisconnect } from 'wagmi';
import { Avatar } from '@components';
import type { ButtonProps } from '@nextui-org/react';
import type { FC, Key, ReactNode } from 'react';

export const ConnectedButton: FC<ConnectedButtonProps> = (props: ConnectedButtonProps) => {
  const { chain, account, openChainModal, ...rest } = props;

  const { disconnect } = useDisconnect();

  const chainIcon = useMemo<ReactNode>(() => {
    if (!chain.iconUrl) return <SwapIcon primaryColor="currentColor" set="light" />;
    return <NextImage src={chain.iconUrl} alt={chain.name} width={24} height={24} />;
  }, [chain.iconUrl, chain.name]);

  const onActionHandler = useCallback(
    (key: Key) => {
      switch (key) {
        case 'network':
          openChainModal();
          break;
        case 'disconnect':
          disconnect();
          break;
        default:
          break;
      }
    },
    [disconnect, openChainModal]
  );

  return (
    <Fragment>
      <Dropdown>
        <Dropdown.Trigger>
          <Button
            type="button"
            color="primary"
            auto
            icon={<Avatar address={account.address} ensImage={account.ensAvatar} size={24} />}
            {...rest}
          >
            {account.displayName}
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Menu aria-label="Account Actions" onAction={(key: Key) => onActionHandler(key)}>
          <Dropdown.Item key="assets" textValue="Assets" icon={<CategoryIcon primaryColor="currentColor" set="light" />}>
            My NFTs
          </Dropdown.Item>
          <Dropdown.Item key="balance" textValue="Balance" icon={<WalletIcon primaryColor="currentColor" set="light" />}>
            {account.displayBalance ?? '0 ETH'}
          </Dropdown.Item>
          <Dropdown.Item key="network" textValue="Network" icon={chainIcon}>
            {chain.name}
          </Dropdown.Item>
          <Dropdown.Item
            key="disconnect"
            color="error"
            textValue="Disconnect"
            icon={<LogoutIcon primaryColor="currentColor" set="light" />}
            withDivider
          >
            Disconnect
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );
};

interface ConnectedButtonProps extends ButtonProps {
  account: {
    address: string;
    displayName: string;
    hasPendingTransactions: boolean;
    ensName?: string;
    ensAvatar?: string;
    balanceSymbol?: string;
    displayBalance?: string;
    balanceDecimals?: number;
    balanceFormatted?: string;
  };
  chain: {
    id: number;
    hasIcon: boolean;
    name?: string;
    iconUrl?: string;
    unsupported?: boolean;
    iconBackground?: string;
  };
  openChainModal: () => void;
}
