import { Fragment } from 'react';
import { Button } from '@nextui-org/react';
import type { ButtonProps } from '@nextui-org/react';
import type { FC, ReactNode } from 'react';

export const ConnectButton: FC<ConnectButtonProps> = (props: ConnectButtonProps) => {
  const { openConnectModal, children, ...rest } = props;

  return (
    <Fragment>
      <Button type="button" color="primary" auto {...rest} onClick={() => openConnectModal()}>
        {children}
      </Button>
    </Fragment>
  );
};

interface ConnectButtonProps extends ButtonProps {
  children: ReactNode;
  openConnectModal: () => void;
}
