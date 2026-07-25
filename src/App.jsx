import { useMemo, useState } from 'react';
import catalog from './data/catalog.json';
import { useProgress } from './hooks/useProgress';
import { countTotalProgress, todayStr } from './lib/progressUtils';
import Sidebar from './components/Sidebar';
import ProgressHero from './components/ProgressHero';
import SeriesView from './components/SeriesView';
import RequiredReadingView from './components/RequiredReadingView';
import FreeReadingView from './components/FreeReadingView';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import SyncPanel from './components/SyncPanel';
import Toast from './components/Toast';
import './App.css';

const CHEERS = [
  '잘했어요! 한 권 더 읽었네요 🎉',
  '멋져요! 라온이 최고! ✨',
  '오늘도 한 권 완독! 📖',
  '대단해요! 계속 이렇게 읽어봐요 🌈',
  '독서왕에 한 걸음 더 가까워졌어요 🏆',
];

let cheerTimer = null;

export default function App() {
  const { data, update, syncStatus, roomCode, joinRoom, leaveRoom } = useProgress();
  const [activeKey, setActiveKey] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const { total, read } = useMemo(() => countTotalProgress(catalog, data), [data]);

  function celebrate() {
    const msg = CHEERS[Math.floor(Math.random() * CHEERS.length)];
    setToastMsg(msg);
    window.clearTimeout(cheerTimer);
    cheerTimer = window.setTimeout(() => setToastMsg(''), 2200);
  }

  function toggleRead(bookId) {
    update((prev) => {
      const cur = prev.books[bookId] || {};
      const nextRead = !cur.read;
      if (nextRead) celebrate();
      return {
        ...prev,
        books: {
          ...prev.books,
          [bookId]: { ...cur, read: nextRead, date: nextRead ? todayStr() : cur.date },
        },
      };
    });
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

  function addFreeReading(entry) {
    update((prev) => ({
      ...prev,
      freeReading: [...prev.freeReading, { id: `free-${Date.now()}`, ...entry }],
    }));
    celebrate();
  }

  function updateFreeReading(id, patch) {
    update((prev) => ({
      ...prev,
      freeReading: prev.freeReading.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  }

  function removeFreeReading(id) {
    update((prev) => ({
      ...prev,
      freeReading: prev.freeReading.filter((e) => e.id !== id),
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

  const activeSeries = catalog.series.find((s) => s.key === activeKey);

  return (
    <div className="app-shell">
      <Sidebar
        catalog={catalog}
        progress={data}
        activeKey={activeKey}
        onSelect={setActiveKey}
        freeCount={data.freeReading.length}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="app-main">
        <div className="app-topbar">
          <ProgressHero total={total} read={read} onMenuClick={() => setSidebarOpen(true)} />
          <SyncPanel
            syncStatus={syncStatus}
            roomCode={roomCode}
            onJoin={joinRoom}
            onLeave={leaveRoom}
          />
        </div>

        {activeKey === 'home' && (
          <HomeView catalog={catalog} progress={data} onNavigate={setActiveKey} />
        )}

        {activeKey === 'shop' && (
          <ShopView
            catalog={catalog}
            progress={data}
            onBuy={buyCoupon}
            onMarkShared={markPurchaseShared}
          />
        )}

        {activeKey === catalog.requiredReading.key && (
          <RequiredReadingView
            section={catalog.requiredReading}
            progress={data}
            onToggleRead={toggleRead}
            onSetRating={setRating}
          />
        )}

        {activeSeries && (
          <SeriesView
            series={activeSeries}
            progress={data}
            onToggleRead={toggleRead}
            onSetRating={setRating}
            onSetTitle={setTitleOverride}
          />
        )}

        {activeKey === 'free-reading' && (
          <FreeReadingView
            entries={data.freeReading}
            onAdd={addFreeReading}
            onUpdate={updateFreeReading}
            onRemove={removeFreeReading}
          />
        )}
      </main>
      <Toast message={toastMsg} />
    </div>
  );
}
