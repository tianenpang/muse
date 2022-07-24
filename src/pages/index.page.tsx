import { Fragment } from 'react';
import { Text } from '@nextui-org/react';
import { SWRConfig } from 'swr';
import { fetchAllNFTs, queryAllNFTs, queryClient } from '@lib';
import { GridCard } from './home';
import type { NFTData, NFTItem } from '@lib';
import type { InferGetServerSidePropsType, NextPage } from 'next';

const IndexPage: NextPage<IndexPageProps> = (props: IndexPageProps) => {
  const { fallback } = props;

  return (
    <Fragment>
      <SWRConfig value={{ fallback }}>
        <Text h3 css={{ transition: '$color' }}>
          Marketplace
        </Text>
        <GridCard />
      </SWRConfig>
    </Fragment>
  );
};

export const getServerSideProps = async () => {
  const data = await queryClient.query(queryAllNFTs).toPromise();
  const res: NFTItem[] = await fetchAllNFTs(data.data.tokens as NFTData[]);

  return {
    props: {
      fallback: {
        allnfts: res
      }
    }
  };
};

interface IndexPageProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

export default IndexPage;
