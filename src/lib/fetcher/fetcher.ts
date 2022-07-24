import { queryClient, queryNFTsByAddress } from '@lib/graph';

export const fetchAllNFTs = async (data: NFTData[]): Promise<NFTItem[]> => {
  return await Promise.all(
    data.map(async (item: NFTData) => {
      const res = await fetch(item.metadataURI);
      const json = await res.json();
      return { ...json, ...item };
    })
  );
};

export const fetchNFTsByAddress = async (address?: string): Promise<NFTItem[]> => {
  const data = await queryClient.query(queryNFTsByAddress, { address: address?.toLowerCase() }).toPromise();
  return await Promise.all(
    data.data.tokens.map(async (item: NFTData) => {
      const res = await fetch(item.metadataURI);
      const json = await res.json();
      return { ...json, ...item };
    })
  );
};

export type NFTData = {
  tokenID: number;
  ipfsCID: string;
  createdBy: string;
  metadataURI: string;
};

export type NFTItem = NFTData & {
  name: string;
  description: string;
  price: string;
  thumbnail: {
    name: string;
    originalName: string;
    type: string;
    size: number;
    datetime: number;
  };
  audio: {
    name: string;
    originalName: string;
    type: string;
    size: number;
    datetime: number;
  };
};
