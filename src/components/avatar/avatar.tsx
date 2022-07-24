import { Fragment, useMemo } from 'react';
import { default as gradientAvatar } from 'gradient-avatar';
import { StyledNextImage } from './avatar.styles';
import type { AvatarComponentProps } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/AvatarContext';
import type { FC } from 'react';

export const Avatar: FC<AvatarProps> = (props: AvatarProps) => {
  const { address, ensImage, size } = props;

  const customImage = useMemo<string>(() => {
    return `data:image/svg+xml;utf8,${encodeURIComponent(gradientAvatar(address))}`;
  }, [address]);

  return (
    <Fragment>
      <StyledNextImage src={ensImage ?? customImage} width={size} height={size} alt="Avatar" unselectable="on" />
    </Fragment>
  );
};

interface AvatarProps extends AvatarComponentProps {}
