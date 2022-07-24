import { minted as MintedEvent, Muse as MuseContract } from '../generated/Muse/Muse';
import { Token, User } from '../generated/schema';

export function handleMinted(event: MintedEvent): void {
  const tokenContract = MuseContract.bind(event.address);
  let token = Token.load(event.params.id.toString());
  if (!token) {
    token = new Token(event.params.id.toString());
    token.tokenID = event.params.id;
    token.createdAtTimestamp = event.block.timestamp;
    token.ipfsCID = tokenContract._tokenURIs(event.params.id);
    token.metadataURI = `https://nftstorage.link/ipfs/${tokenContract._tokenURIs(event.params.id)}/metadata.json`;
    token.creator = tokenContract.ownerOf(event.params.id).toHexString();
    token.createdBy = tokenContract.ownerOf(event.params.id).toHexString();
  }
  token.owner = tokenContract.ownerOf(event.params.id).toHexString();
  token.save();
  let user = User.load(tokenContract.ownerOf(event.params.id).toHexString());
  if (!user) {
    user = new User(tokenContract.ownerOf(event.params.id).toHexString());
    user.save();
  }
}

// export function handleRented(event: RentedEvent): void {}
// export function handleWithdrawn(event: WithdrawnEvent): void {}
// export function handleApproval(event: Approval): void {}
// export function handleApprovalForAll(event: ApprovalForAll): void {}
// export function handleSetDelegator(event: SetDelegator): void {}
// export function handleTransfer(event: Transfer): void {}
