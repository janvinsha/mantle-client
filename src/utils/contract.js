import { ethers, Wallet, providers, BigNumber } from 'ethers';
import marketContract from './marketContract.json';
let PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
let ALCHEMY_KEY = process.env.REACT_APP_ALCHEMY_KEY;
const MARKET_CONTRACT_ADDRESS = '0xBaFDdDCd96e18Bedd401f781c4020E8677898828';

const wallet = new Wallet(PRIVATE_KEY);
const provider = new providers.AlchemyProvider('maticmum', ALCHEMY_KEY);
const signer = wallet.connect(provider);
const contract = new ethers.Contract(
  MARKET_CONTRACT_ADDRESS,
  marketContract.abi,
  signer
);
export const getCollections = async () => {
  let collections = [];
  let temp = [1, 2, 3, 4, 5];
  await Promise.all(
    temp.map(async id => {
      let collection = await contract.fetchCollection(id);
      let collectionCopy = { ...collection };
      collectionCopy.collectionId = collection?.collectionId?.toString();
      collections.push(collectionCopy);
    })
  );
  collections = collections.filter(collection => collection?.name?.length > 2);
  console.log('THIS ARE THR COLLECTIONS IN GET COLLECTIONs', collections);
  return collections;
};
export const getCollectionsOfAddress = async address => {
  let collections = await getCollections();
  collections = collections.filter(collection => collection?.owner == address);
  return collections;
};
export const getCollection = async id => {
  let collection = await contract.fetchCollection(id);
  console.log('THIS ARE THR COLLECTION IN GET COLLECTION');
  return collection;
};

export const getProfile = async address => {
  let profile = await contract.getProfile(address);
  console.log('THIS IS THE PROFILE, GETTING THE PROFILE HERE OOO', profile);
  return profile;
};
export const getNfts = async () => {
  let temp = [];
  let nfts = await contract.fetchMarketItems();
  nfts.map(nft => {
    let nftCopy = { ...nft };
    nftCopy.price = nft?.price?.toString();
    nftCopy.tokenId = nft?.tokenId?.toString();
    temp.push(nftCopy);
  });
  console.log('THESE ARE THE NFTS', temp);
  return temp;
};
export const getNftsOfAddress = async address => {
  let nfts = await getNfts();
  return nfts?.filter(nft => nft.seller == address);
};
export const getNft = async id => {
  let nfts = await getNfts();
  let nft = nfts?.filter(nft => nft.tokenId == id);
  console.log('THIS IS THE NFT IN GET NFT', nft);
  return nft[0];
};
export const getNftsOfCollection = async id => {
  let nfts = await getNfts();
  return nfts?.filter(nft => nft.collection == id);
};
