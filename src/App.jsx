import { useMemo, useState } from 'react';
import catalog from './data/catalog.json';
import { useProgress } from './hooks/useProgress';
import { useProfile } from './hooks/useProfile';
import { useAutoReload } from './hooks/useAutoReload';
import { countTotalProgress, todayStr } from './lib/progressUtils';
import Sidebar from './components/Sidebar';
import ProgressHero from './components/ProgressHero';
import SeriesView from './components/SeriesView';
import RequiredReadingView from './components/RequiredReadingView';
import MiscView from './components/MiscView';
import ApprovalsView from './components/ApprovalsView';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import CharacterShopView from './components/CharacterShopView';
import SyncPanel from './components/SyncPanel';
import ProfileGate from './components/ProfileGate';
import ProfileBadge from './components/ProfileBadge';
import Toast from './components/Toast';
import './App.css';

const CHEERS = [
  '잘했어요! 한 권 더 읽었네요 🎉',
  '멋져요! 라온이 최고! ✨',
  '오늘도 한 권 완독! 📖',
  '대단해요! 계속 이렇게 읽어봐요 🌈',
  '독서왕에 한 걸음 더 가까워졌어요 🏆',
];

const CONFIRM_CHEERS = [
  '확인 완료! 라온이에게 포인트가 지급됐어요 🎉',
  '잘 확인했어요! 포인트 적립 완료 ✨',
];

let cheerTimer = null;

export default function App() {
  const { data, update, syncStatus, roomCode, joinRoom, leaveRoom } = useProgress();
  const { profile, isChild, selectProfile } = useProfile();
  useAutoReload();
  const [activeKey, setActiveKey] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const { total, read } = useMemo(() => countTotalProgress(catalog, data), [data]);

  function celebrate(pool = CHEERS) {
    const msg = pool[Math.floor(Math.random() * pool.length)];
    setToastMsg(msg);
    window.clearTimeout(cheerTimer);
    cheerTimer = window.setTimeout(() => setToastMsg(''), 2200);
  }

  // 라온이 marks a book as read -> goes to "pending", awaiting a parent's
  // confirmation. Only confirmation (below) grants points/progress credit.
  function requestRead(bookId) {
    update((prev) => ({
      ...prev,
      books: {
        ...prev.books,
        [bookId]: { ...(prev.books[bookId] || {}), pending: true, pendingDate: todayStr() },
      },
    }));
    celebrate();
  }

  function cancelPending(bookId) {
    update((prev) => ({
      ...prev,
      books: {
        ...prev.books,
        [bookId]: { ...(prev.books[bookId] || {}), pending: false, pendingDate: null },
      },
    }));
  }

  function confirmRead(bookId) {
    update((prev) => {
      const cur = prev.books[bookId] || {};
      return {
        ...prev,
        books: {
          ...prev.books,
          [bookId]: {
            ...cur,
            read: true,
            pending: false,
            date: todayStr(),
            confirmedBy: profile?.id,
          },
        },
      };
    });
    celebrate(CONFIRM_CHEERS);
  }

  function unconfirmRead(bookId) {
    update((prev) => ({
      ...prev,
      books: {
        ...prev.books,
        [bookId]: { ...(prev.books[bookId] || {}), read: false, pending: false },
      },
    }));
  }

  function setRating(bookId, rating) {
    update((prev) => ({
      ...prev,
      books: { ...prev.books, [bookId]: { ...(prev.books[bookId] || {}), rating } },
    }));
  }

  function setTitleOverride(bookId, title) {
    update((prev) => ({
      ...prev,
      books: { ...prev.books, [bookId]: { ...(prev.books[bookId] || {}), titleOverride: title } },
    }));
  }

  function addMiscBook(title) {
    update((prev) => ({
      ...prev,
      miscBooks: [...(prev.miscBooks || []), { id: `misc-${Date.now()}`, title }],
    }));
  }

  function removeMiscBook(id) {
    update((prev) => ({
      ...prev,
      miscBooks: (prev.miscBooks || []).filter((b) => b.id !== id),
      books: Object.fromEntries(Object.entries(prev.books).filter(([k]) => k !== id)),
    }));
  }

  function buyCoupon(purchase) {
    update((prev) => ({
      ...prev,
      purchases: [...(prev.purchases || []), purchase],
    }));
    celebrate();
  }

  function markPurchaseShared(purchaseId) {
    update((prev) => ({
      ...prev,
      purchases: (prev.purchases || []).map((p) =>
        p.id === purchaseId ? { ...p, shared: true } : p
      ),
    }));
  }

  function buyCharacterItem(item) {
    update((prev) => {
      const character = prev.character || { owned: {}, equipped: {} };
      return {
        ...prev,
        character: {
          owned: { ...character.owned, [item.id]: item.price },
          equipped: { ...character.equipped, [item.slot]: item.id },
        },
      };
    });
    celebrate();
  }

  function equipCharacterItem(item) {
    update((prev) => {
      const character = prev.character || { owned: {}, equipped: {} };
      return {
        ...prev,
        character: {
          ...character,
          equipped: { ...character.equipped, [item.slot]: item.id },
        },
      };
    });
  }

  function unequipCharacterSlot(slot) {
    update((prev) => {
      const character = prev.character || { owned: {}, equipped: {} };
      const equipped = { ...character.equipped };
      delete equipped[slot];
      return { ...prev, character: { ...character, equipped } };
    });
  }

  const bookActions = {
    onSetRating: setRating,
    onSetTitle: setTitleOverride,
    onRequestRead: requestRead,
    onCancelPending: cancelPending,
    onConfirmRead: confirmRead,
    onUnconfirmRead: unconfirmRead,
  };

  const activeSeries = catalog.series.find((s) => s.key === activeKey);

  if (!profile) {
    return <ProfileGate onSelect={selectProfile} />;
  }

  return (
    <div className="app-shell">
      <Sidebar
        catalog={catalog}
        progress={data}
        activeKey={activeKey}
        onSelect={setActiveKey}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="app-main">
        <div className="app-topbar">
          <ProgressHero total={total} read={read} onMenuClick={() => setSidebarOpen(true)} />
          <div className="app-topbar__right">
            <ProfileBadge profile={profile} onSelect={selectProfile} />
            <SyncPanel
              syncStatus={syncStatus}
              roomCode={roomCode}
              onJoin={joinRoom}
              onLeave={leaveRoom}
            />
          </div>
        </div>

        {activeKey === 'home' && (
          <HomeView catalog={catalog} progress={data} isChild={isChild} onNavigate={setActiveKey} />
        )}

        {activeKey === 'approvals' && (
          <ApprovalsView
            catalog={catalog}
            progress={data}
            isChild={isChild}
            onConfirmRead={confirmRead}
            onCancelPending={cancelPending}
            onNavigate={setActiveKey}
          />
        )}

        {activeKey === 'shop' && (
          <ShopView
            catalog={catalog}
            progress={data}
            isChild={isChild}
            onBuy={buyCoupon}
            onMarkShared={markPurchaseShared}
          />
        )}

        {activeKey === 'character-shop' && (
          <CharacterShopView
            catalog={catalog}
            progress={data}
            isChild={isChild}
            onBuy={buyCharacterItem}
            onEquip={equipCharacterItem}
            onUnequip={unequipCharacterSlot}
          />
        )}

        {activeKey === catalog.requiredReading.key && (
          <RequiredReadingView
            section={catalog.requiredReading}
            progress={data}
            isChild={isChild}
            actions={bookActions}
          />
        )}

        {activeSeries && (
          <SeriesView series={activeSeries} progress={data} isChild={isChild} actions={bookActions} />
        )}

        {activeKey === 'misc' && (
          <MiscView
            progress={data}
            isChild={isChild}
            actions={bookActions}
            onAdd={addMiscBook}
            onRemove={removeMiscBook}
          />
        )}
      </main>
      <Toast message={toastMsg} />
    </div>
  );
}
