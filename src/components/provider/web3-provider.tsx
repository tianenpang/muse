import { Fragment, useMemo } from 'react';
import { defaultTheme } from '@nextui-org/react';
import {
  connectorsForWallets,
  darkTheme as rainbowDarkTheme,
  RainbowKitProvider,
  lightTheme as rainbowLightTheme,
  wallet
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { Avatar } from '@components';
import { useMediaQuery, useTheme } from '@hooks';
import { darkTheme, lightTheme } from '@styles';
import type { Theme as RainbowTheme } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider';
import type { ThemeOptions } from '@rainbow-me/rainbowkit/dist/themes/baseTheme';
import type { FC, ReactNode } from 'react';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.mainnet, chain.polygon],
  [
    jsonRpcProvider({ rpc: () => ({ http: 'https://rpc-mumbai.maticvigil.com/v1/a1bc762a38f412f3af976f545cd134df77c63626' }) }),
    publicProvider()
  ]
);

const needsInjectedWalletFallback = Boolean(
  typeof window !== 'undefined' && window.ethereum && !window.ethereum.isMetaMask && !window.ethereum.isCoinbaseWallet
);

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [wallet.metaMask({ chains, shimDisconnect: true }), wallet.rainbow({ chains })]
  },
  {
    groupName: 'Others',
    wallets: [
      wallet.walletConnect({ chains }),
      wallet.coinbase({ appName: 'Muse', chains }),
      ...(needsInjectedWalletFallback ? [wallet.injected({ chains })] : [])
    ]
  }
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

export const Web3Provider: FC<Web3ProviderProps> = (props: Web3ProviderProps) => {
  const { children } = props;

  const { isSystem, isDark } = useTheme();
  const preferDark = useMediaQuery('prefers-color-scheme: dark');

  const rainbowTheme = useMemo<RainbowTheme>(() => {
    const common: ThemeOptions = { overlayBlur: 'small' };
    const { radii } = defaultTheme;
    const { colors, fonts, shadows } = isDark ? darkTheme : lightTheme;
    const theme = isSystem && preferDark ? rainbowDarkTheme(common) : isDark ? rainbowDarkTheme(common) : rainbowLightTheme(common);
    return {
      ...theme,
      fonts: {
        ...theme.fonts,
        body: fonts.sans.computedValue
      },
      colors: {
        ...theme.colors,
        accentColor: colors.primary.computedValue,
        accentColorForeground: colors.primarySolidContrast.computedValue
      },
      radii: {
        ...theme.radii,
        modal: radii.xs.computedValue,
        menuButton: radii.xs.computedValue,
        modalMobile: radii.xs.computedValue,
        actionButton: radii.xs.computedValue,
        connectButton: radii.xs.computedValue
      },
      shadows: {
        ...theme.shadows,
        dialog: shadows.lg.computedValue,
        selectedWallet: shadows.xs.computedValue,
        selectedOption: shadows.xs.computedValue
      }
    };
  }, [isDark, isSystem, preferDark]);

  return (
    <Fragment>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} avatar={Avatar} theme={rainbowTheme} appInfo={{ appName: 'Muse' }}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </Fragment>
  );
};

interface Web3ProviderProps {
  children?: ReactNode;
}
