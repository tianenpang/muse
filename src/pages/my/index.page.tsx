import { Fragment } from 'react';
import { Grid, Loading, Text } from '@nextui-org/react';
import { default as useSWR } from 'swr';
import { useAccount } from 'wagmi';
import { NFTCard } from '@components';
import { fetchNFTsByAddress, NFTItem } from '@lib';
import type { FC } from 'react';

export const MyPage: FC<MyPageProps> = (props: MyPageProps) => {
  const {} = props;

  const { address } = useAccount();

  const { data, error } = useSWR<NFTItem[]>(address, async () => await fetchNFTsByAddress(address));

  if (error) {
    return (
      <Text css={{ transition: '$color' }} color="error" h4>
        An error has occurred.
      </Text>
    );
  }

  if (!data) return <Loading css={{ m: 'auto' }} color="currentColor" size="lg" />;

  if (data.length === 0) {
    return (
      <Fragment>
        <Text h3 css={{ transition: '$color' }}>
          My NFTs
        </Text>
        <Text css={{ transition: '$color' }} color="secondary" h4>
          No Data.
        </Text>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Text h3 css={{ transition: '$color' }}>
        My NFTs
      </Text>
      <Grid.Container gap={4}>
        {data.map((item) => (
          <Grid key={item.ipfsCID} xs={12} sm={6} md={4}>
            <NFTCard item={item} />
          </Grid>
        ))}
      </Grid.Container>
    </Fragment>
  );
};

interface MyPageProps {}

export default MyPage;
