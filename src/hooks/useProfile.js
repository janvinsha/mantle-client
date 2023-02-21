import { useEffect, useState } from 'react';

import { getProfile } from '../utils/contract';

export function useProfile(address) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function _getProfile() {
      try {
        const _profile = await getProfile(address);
        setProfile(_profile);
      } catch (error) {
        console.log('THIS IS THE ERROR TRYING TO GET THE PROFILE', error);
        setError(true);
      }
    }
    _getProfile();
  }, []);

  return {
    profile,
    isLoading: !error && !profile,
    isError: error,
  };
}
