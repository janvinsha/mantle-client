import { useEffect, useState } from 'react';

import { getNfts, getNftsOfCollection } from '../utils/contract';

export function useNftOfCollection(id) {
  const [nftList, setNftList] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getNftList() {
      try {
        const collections = await getNftsOfCollection(id);
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
