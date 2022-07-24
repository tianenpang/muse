import { keyframes, styled } from '@nextui-org/react';
import * as ToastPrimitive from '@radix-ui/react-toast';

const VIEWPORT_PADDING = 24;

const hide = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 }
});

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: 'translateX(0)' }
});

const swipeOut = keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` }
});

const StyledViewport = styled(ToastPrimitive.Viewport, {
  position: 'fixed',
  bottom: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: VIEWPORT_PADDING,
  gap: 10,
  width: 390,
  maxWidth: '100vw',
  margin: 0,
  listStyle: 'none',
  zIndex: 2147483647,
  outline: 'none'
});

const StyledToast = styled(ToastPrimitive.Root, {
  color: '$foreground',
  backgroundColor: '$backgroundContrast',
  borderRadius: '$md',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  padding: 15,
  display: 'grid',
  gridTemplateAreas: '"title action" "description action"',
  gridTemplateColumns: 'auto max-content',
  columnGap: 15,
  alignItems: 'center',

  '@media (prefers-reduced-motion: no-preference)': {
    '&[data-state="open"]': {
      animation: `${slideIn} 250ms ease`
    },
    '&[data-state="closed"]': {
      animation: `${hide} 250ms ease`
    },
    '&[data-swipe="move"]': {
      transform: 'translateX(var(--radix-toast-swipe-move-x))'
    },
    '&[data-swipe="cancel"]': {
      transform: 'translateX(0)',
      transition: 'transform 250ms ease'
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} 250ms ease`
    }
  }
});

const StyledTitle = styled(ToastPrimitive.Title, {
  gridArea: 'title',
  fontWeight: '$normal',
  color: '$foreground',
  fontSize: '$sm'
});

const StyledDescription = styled(ToastPrimitive.Description, {
  gridArea: 'description',
  margin: 0,
  fontSize: '$md',
  color: '$foreground'
});

const StyledAction = styled(ToastPrimitive.Action, {
  gridArea: 'action'
});

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = StyledViewport;
export const Toast = StyledToast;
export const ToastTitle = StyledTitle;
export const ToastDescription = StyledDescription;
export const ToastAction = StyledAction;
export const ToastClose = ToastPrimitive.Close;
