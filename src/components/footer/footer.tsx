import { Fragment, useMemo } from 'react';
import { Avatar, Container, Text } from '@nextui-org/react';
import { MoonIcon, SunIcon } from '@components';
import { useTheme } from '@hooks';
import { avatarStyles, StyledFooter, textStyles } from './footer.styles';
import type { FC } from 'react';

export const Footer: FC<FooterProps> = (props: FooterProps) => {
  const {} = props;

  const { isDark, toggleTheme } = useTheme();

  const themeIcon = useMemo(() => {
    return isDark ? <SunIcon css={{ size: 20 }} /> : <MoonIcon css={{ size: 20 }} />;
  }, [isDark]);

  return (
    <Fragment>
      <StyledFooter>
        <Container display="flex" justify="space-between" alignItems="center" md>
          <Text css={textStyles} span>
            Muse 2022.
          </Text>
          <Avatar css={avatarStyles} icon={themeIcon} squared onClick={() => toggleTheme()} />
        </Container>
      </StyledFooter>
    </Fragment>
  );
};

interface FooterProps {}
