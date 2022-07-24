import { Fragment } from 'react';
import { Button } from '@nextui-org/react';
import { Toast as StyledToast, ToastAction, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from './toast.styles';
import type { FC } from 'react';

export const Toast: FC<ToastProps> = (props: ToastProps) => {
  const { open, onOpenChange, title = 'Title', description = 'Description' } = props;

  return (
    <Fragment>
      <ToastProvider swipeDirection="right">
        <StyledToast open={open} onOpenChange={onOpenChange}>
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{description}</ToastDescription>
          <ToastAction asChild altText="Goto schedule to undo">
            <Button size="sm" color="secondary" auto flat>
              Close
            </Button>
          </ToastAction>
        </StyledToast>
        <ToastViewport />
      </ToastProvider>
    </Fragment>
  );
};

export interface ToastProps {
  open: boolean;
  title?: string;
  description?: string;
  onOpenChange: (open: boolean) => void;
}
