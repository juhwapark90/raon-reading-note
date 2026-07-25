import { useCallback, useEffect, useRef, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured, ensureSignedIn } from '../lib/firebase';

const LOCAL_KEY = 'raon-reading-progress-v1';
const ROOM_KEY = 'raon-reading-room-code';

function emptyData() {
  return {
    books: {},
    miscBooks: [],
    purchases: [],
    character: { owned: {}, equipped: {} },
    updatedAt: 0,
  };
}

function loadLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) return { ...emptyData(), ...JSON.parse(raw) };
  } catch (err) {
    console.error('failed to read local progress', err);
  }
  return emptyData();
}

function saveLocal(data) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('failed to save local progress', err);
  }
}

export function getRoomCode() {
  return localStorage.getItem(ROOM_KEY) || '';
}

export function setStoredRoomCode(code) {
  if (code) localStorage.setItem(ROOM_KEY, code);
  else localStorage.removeItem(ROOM_KEY);
}

// syncStatus: 'local-only' | 'no-room' | 'connecting' | 'synced' | 'error'
export function useProgress() {
  const [data, setData] = useState(loadLocal);
  const [roomCode, setRoomCodeState] = useState(getRoomCode);
  const [syncStatus, setSyncStatus] = useState(
    !isFirebaseConfigured ? 'local-only' : roomCode ? 'connecting' : 'no-room'
  );
  const dataRef = useRef(data);
  dataRef.current = data;
  const skipPush = useRef(false);

  useEffect(() => {
    saveLocal(data);
  }, [data]);

  useEffect(() => {
    if (!isFirebaseConfigured || !roomCode) {
      setSyncStatus(isFirebaseConfigured ? 'no-room' : 'local-only');
      return undefined;
    }
    let cancelled = false;
    setSyncStatus('connecting');
    let unsub = null;

    ensureSignedIn()
      .then(() => {
        if (cancelled) return;
        unsub = onSnapshot(
          doc(db, 'rooms', roomCode),
          (snap) => {
            if (snap.exists()) {
              const remote = snap.data();
              if ((remote.updatedAt || 0) >= (dataRef.current.updatedAt || 0)) {
                skipPush.current = true;
                setData({ ...emptyData(), ...remote });
              }
            }
            setSyncStatus('synced');
          },
          (err) => {
            console.error('firestore snapshot error', err);
            setSyncStatus('error');
          }
        );
      })
      .catch((err) => {
        console.error('firebase sign-in error', err);
        setSyncStatus('error');
      });

    return () => {
      cancelled = true;
      if (unsub) unsub();
    };
  }, [roomCode]);

  const update = useCallback(
    (updater) => {
      setData((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        const stamped = { ...next, updatedAt: Date.now() };
        if (isFirebaseConfigured && roomCode && !skipPush.current) {
          ensureSignedIn().then(() =>
            setDoc(doc(db, 'rooms', roomCode), stamped).catch((err) =>
              console.error('firestore write error', err)
            )
          );
        }
        skipPush.current = false;
        return stamped;
      });
    },
    [roomCode]
  );

  const joinRoom = useCallback((code) => {
    const trimmed = code.trim();
    setStoredRoomCode(trimmed);
    setRoomCodeState(trimmed);
  }, []);

  const leaveRoom = useCallback(() => {
    setStoredRoomCode('');
    setRoomCodeState('');
  }, []);

  return { data, update, syncStatus, roomCode, joinRoom, leaveRoom };
}
