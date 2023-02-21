import { useEffect, useState } from 'react';

import { getNfts, getNftsOfAddress } from '../utils/contract';

export function useNftOfAddress(address) {
  const [nftList, setNftList] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getNftList() {
      try {
        const collections = await getNftsOfAddress(address);
        setNftList(collections);
      } catch (error) {
        setError(true);
      }
    }
    getNftList();
  }, []);

  return {
    nftList,
    isLoading: !error && !nftList,
    isError: error,
  };
}
