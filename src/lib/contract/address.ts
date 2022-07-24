import { museABI } from './abi';

const address = '0x8079434B5B1138CA97068e3F1238B9B9DB760f28';

export const contract = {
  muse: {
    address: address,
    abi: museABI,
    config: {
      addressOrName: address,
      contractInterface: museABI
    }
  }
};
