import { createClient } from 'urql';

export const APIURL = 'https://api.thegraph.com/subgraphs/name/tianenpang/muse';

export const queryAllNFTs = `
  query {
    tokens(
      orderBy: tokenID
      orderDirection: desc
    ) {
      tokenID
      ipfsCID
      metadataURI
      createdBy
    }
  }
`;

export const queryNFTsByAddress = `
  query UserToken ($address: String!) {
    tokens(
      orderBy: tokenID
      orderDirection: desc
      where: {
        createdBy: $address
      }
    ) {
      tokenID
      ipfsCID
      metadataURI
      createdBy
    }
  }
`;

export const queryClient = createClient({
  url: APIURL
});
