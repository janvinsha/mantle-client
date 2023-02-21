import { useEffect, useState } from 'react';

import { getNfts } from '../utils/contract';

export function useNftList() {
  const [nftList, setNftList] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getNftList() {
      try {
        const collections = await getNfts();
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
