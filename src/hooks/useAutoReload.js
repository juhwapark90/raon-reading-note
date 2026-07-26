import { useEffect } from 'react';
import { safeReload } from '../lib/safeReload';

// iOS "Add to Home Screen" apps keep a cached copy running indefinitely and
// rarely re-fetch index.html on their own. This checks a small version file
// (written fresh on every build, fetched with cache disabled) whenever the
// app becomes visible again, and reloads if a newer deploy is out.
export function useAutoReload() {
  useEffect(() => {
    let cancelled = false;

    async function checkForUpdate() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}version.json?t=${Date.now()}`, {
          cache: 'no-store',
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data.version && data.version !== __APP_VERSION__) {
          safeReload();
        }
      } catch {
        // offline or blocked - just skip this check
      }
    }

    checkForUpdate();

    function onVisible() {
      if (document.visibilityState === 'visible') checkForUpdate();
    }
    document.addEventListener('visibilitychange', onVisible);
    const interval = setInterval(checkForUpdate, 5 * 60 * 1000);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisible);
      clearInterval(interval);
    };
  }, []);
}
