import { useCallback, useState } from 'react';
import { PROFILES } from '../data/profiles';

// Which family member is using this device right now. Deliberately kept out
// of the synced progress data - it's a per-device/browser choice, not
// something to share across the family's room code.
const KEY = 'raon-reading-profile';

function loadProfile() {
  const id = localStorage.getItem(KEY);
  return id && PROFILES[id] ? id : null;
}

export function useProfile() {
  const [profileId, setProfileId] = useState(loadProfile);

  const selectProfile = useCallback((id) => {
    if (!PROFILES[id]) return;
    localStorage.setItem(KEY, id);
    setProfileId(id);
  }, []);

  const clearProfile = useCallback(() => {
    localStorage.removeItem(KEY);
    setProfileId(null);
  }, []);

  return {
    profileId,
    profile: profileId ? PROFILES[profileId] : null,
    isChild: profileId ? PROFILES[profileId].isChild : false,
    selectProfile,
    clearProfile,
  };
}
