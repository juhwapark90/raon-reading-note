export const PROFILES = {
  raon: { id: 'raon', label: '라온이♡', emoji: '👧', isChild: true },
  mom: { id: 'mom', label: '엄마', emoji: '👩', isChild: false, requiresPassword: true },
  dad: { id: 'dad', label: '아빠', emoji: '👨', isChild: false, requiresPassword: true },
};

export const PROFILE_LIST = Object.values(PROFILES);
