import { useEffect, useState } from 'react';

import { getCollections } from '../utils/contract';

export function useCollectionList() {
  const [collectionList, setCollectionList] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCollectionList() {
      try {
        const collections = await getCollections();
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
