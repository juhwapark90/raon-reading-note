import { isWritePending, onWritesSettled } from './pendingWrites';

// A forced reload (auto-update check, "홈" tap) must never fire while a
// Firestore write is in flight - the reload aborts the in-flight request,
// silently dropping whatever the user just did (e.g. a parent's read
// confirmation), which then looks "reverted" the next time anyone opens
// the app. Waits for the write to settle first, with a safety timeout in
// case something hangs.
export function safeReload() {
  if (!isWritePending()) {
    window.location.reload();
    return;
  }

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    window.location.reload();
  };

  const unsubscribe = onWritesSettled(() => {
    unsubscribe();
    finish();
  });

  setTimeout(() => {
    unsubscribe();
    finish();
  }, 5000);
}
