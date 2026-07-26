// Tracks in-flight Firestore writes so a forced reload (see safeReload.js)
// never cuts one off mid-flight - which silently drops the write, since
// setDoc calls from useProgress are fire-and-forget for a snappy UI.
let count = 0;
const listeners = new Set();

export function beginWrite() {
  count += 1;
}

export function endWrite() {
  count = Math.max(0, count - 1);
  if (count === 0) {
    listeners.forEach((fn) => fn());
  }
}

export function isWritePending() {
  return count > 0;
}

// Calls fn once, the next time the pending-write count reaches zero.
// Returns an unsubscribe function.
export function onWritesSettled(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
