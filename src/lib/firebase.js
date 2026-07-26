import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId);

let app = null;
let auth = null;
let db = null;

if (isFirebaseConfigured) {
  app = getApps().length ? getApps()[0] : initializeApp(config);
  auth = getAuth(app);
  db = getFirestore(app);
}

let signInPromise = null;

// On every fresh page load (including the forced reloads useAutoReload does
// for iOS home-screen installs), Firebase Auth restores a previously signed-in
// anonymous session from local storage, but that restore is asynchronous -
// checking auth.currentUser immediately after getAuth() almost always sees
// null and would otherwise trigger a needless network round-trip to sign in
// again. Waiting for the first onAuthStateChanged event picks up the restored
// session (no network call) whenever one exists, so Firestore reconnects as
// soon as the local session is ready instead of after an extra auth request.
export function ensureSignedIn() {
  if (!isFirebaseConfigured) return Promise.resolve(null);
  if (auth.currentUser) return Promise.resolve(auth.currentUser);
  if (!signInPromise) {
    signInPromise = new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe();
          if (user) {
            resolve(user);
          } else {
            signInAnonymously(auth)
              .then((cred) => resolve(cred.user))
              .catch(reject);
          }
        },
        reject
      );
    });
  }
  return signInPromise;
}

export { db };
