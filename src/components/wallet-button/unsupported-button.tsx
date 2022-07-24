import { Fragment } from 'react';
import { Button } from '@nextui-org/react';
import type { ButtonProps } from '@nextui-org/react';
import type { FC, ReactNode } from 'react';

export const UnsupportedButton: FC<UnsupportedButtonProps> = (props: UnsupportedButtonProps) => {
  const { openChainModal, children, ...rest } = props;

  return (
    <Fragment>
      <Button type="button" color="error" auto flat {...rest} onClick={() => openChainModal()}>
        {children}
      </Button>
    </Fragment>
  );
};

interface UnsupportedButtonProps extends ButtonProps {
  children: ReactNode;
  openChainModal: () => void;
}
