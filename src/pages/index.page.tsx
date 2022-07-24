import { Fragment } from 'react';
import { Loading, Text } from '@nextui-org/react';
import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import { contract } from '@lib';
import { HomeGrid } from './home';
import type { NextPage } from 'next';

const IndexPage: NextPage<IndexPageProps> = (props: IndexPageProps) => {
  const {} = props;

  const totalSupply = useContractRead({
    ...contract.muse.config,
    functionName: 'totalSupply'
  });

  return (
    <Fragment>
      <Text h3 css={{ transition: '$color' }}>
        Marketplace
      </Text>
      {totalSupply.isLoading ? (
        <Loading css={{ m: 'auto' }} color="currentColor" size="lg" />
      ) : (
        <HomeGrid totalSupply={BigNumber.from(totalSupply.data).toNumber()} />
      )}
    </Fragment>
  );
};

interface IndexPageProps {}

export default IndexPage;
