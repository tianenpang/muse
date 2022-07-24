import { Fragment } from 'react';
import { Grid, Loading, Text } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { default as useSWR } from 'swr';
import type { NFTItem } from '@lib';
import type { FC } from 'react';

const NFTCard = dynamic(
  async () => {
    const component = await import('@components');
    return component.NFTCard;
  },
  { ssr: false }
);

export const GridCard: FC<GridCardProps> = (props: GridCardProps) => {
  const {} = props;

  const { data, error } = useSWR<NFTItem[]>('allnfts');

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
      <Text css={{ transition: '$color' }} color="secondary" h4>
        No Data.
      </Text>
    );
  }

  return (
    <Fragment>
      <Grid.Container gap={4}>
        {data.map((item) => (
          <Grid key={item.ipfsCID} xs={12} sm={6} md={4}>
            <NFTCard item={item} rentable />
          </Grid>
        ))}
      </Grid.Container>
    </Fragment>
  );
};

interface GridCardProps {}
