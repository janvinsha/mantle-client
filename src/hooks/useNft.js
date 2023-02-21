import { useEffect, useState } from 'react';

import { getNft } from '../utils/contract';

export function useNft(id) {
  const [nft, setNft] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function _getNft() {
      try {
        const _nft = await getNft(id);
        setNft(_nft);
      } catch (error) {
        console.log('THIS IS THE GET NFT', error);
        setError(true);
      }
    }
    _getNft();
  }, []);

  return {
    nft,
    isLoading: !error && !nft,
    isError: error,
  };
}
