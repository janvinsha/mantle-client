import { useEffect, useState } from 'react';

import { getCollectionsOfAddress } from '../utils/contract';

export function useCollectionOfAddress(address) {
  const [collectionList, setCollectionList] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCollectionList() {
      try {
        const collections = await getCollectionsOfAddress(address);
        setCollectionList(collections);
      } catch (error) {
        setError(true);
      }
    }
    getCollectionList();
  }, []);

  return {
    collectionList,
    isLoading: !error && !collectionList,
    isError: error,
  };
}
