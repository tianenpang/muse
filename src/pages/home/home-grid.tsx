import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Grid, Loading } from '@nextui-org/react';
import { paginatedIndexesConfig, useContractInfiniteReads } from 'wagmi';
import { NFTCard } from '@components';
import { contract } from '@lib';
import type { NFTItem } from '@components';
import type { FC } from 'react';

export const HomeGrid: FC<HomeHeroProps> = (props: HomeHeroProps) => {
  const { totalSupply } = props;

  const [loading, setLoading] = useState<boolean>(true);
  const [items, setItems] = useState<NFTItem[]>([]);

  const tokenURIs = useContractInfiniteReads({
    cacheKey: 'tokenURIs',
    getNextPageParam: (_, pages) => pages.length + 1,
    ...paginatedIndexesConfig(
      (index) => ({
        ...contract.muse.config,
        functionName: '_tokenURIs',
        args: [index]
      }),
      { start: 0, perPage: totalSupply, direction: 'increment' }
    )
  });

  const getAllNFTs = useCallback(async () => {
    if (tokenURIs.data) {
      const data: NFTItem[] = await Promise.all(
        tokenURIs.data.pages[0].map(async (uri: string, id: number) => {
          const response = await fetch(`https://nftstorage.link/ipfs/${uri}/metadata.json`);
          const responseData = await response.json();
          return { ...responseData, uri, id };
        })
      );
      setItems([...data]);
      setLoading(false);
    }
  }, [tokenURIs.data]);

  useEffect(() => {
    if (tokenURIs.data) {
      setLoading(true);
      getAllNFTs();
    }
    return () => {
      setLoading(true);
      setItems([]);
    };
  }, [tokenURIs.data, getAllNFTs]);

  const isLoading = useMemo<boolean>(() => {
    return Boolean(tokenURIs.isLoading || loading);
  }, [tokenURIs.isLoading, loading]);

  return (
    <Fragment>
      {isLoading ? (
        <Loading css={{ m: 'auto' }} color="currentColor" size="lg" />
      ) : (
        <Grid.Container gap={4}>
          {items.map((item) => (
            <Grid key={item.name} xs={12} sm={6} md={4}>
              <NFTCard item={item} />
            </Grid>
          ))}
        </Grid.Container>
      )}
    </Fragment>
  );
};

interface HomeHeroProps {
  totalSupply: number;
}
