import { useEffect, useState } from 'react';

import { getCollection } from '../utils/contract';

export function useCollection(id) {
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function _getCollection() {
      try {
        const collections = await getCollection(id);
        setCollection(collections);
      } catch (error) {
        setError(true);
      }
    }
    _getCollection();
  }, []);

  return {
    collection,
    isLoading: !error && !collection,
    isError: error,
  };
}
