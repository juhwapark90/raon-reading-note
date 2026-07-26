import { useState } from 'react';
import {
  countSeriesProgress,
  countMiscProgress,
  countCustomSeriesProgress,
  pendingCount,
  walletBalance,
} from '../lib/progressUtils';
import { safeReload } from '../lib/safeReload';

export default function Sidebar({ catalog, progress, activeKey, onSelect, open, onClose, onAddSeries }) {
  const [addingSeries, setAddingSeries] = useState(false);
  const [newSeriesName, setNewSeriesName] = useState('');
  const [newSeriesEmoji, setNewSeriesEmoji] = useState('');

  const topItems = [{ key: 'home', name: '홈', emoji: '🏠', color: '#2a78d6' }];

  const pending = pendingCount(catalog, progress);
  const approvalsItem = { key: 'approvals', name: '확인 대기', emoji: '🔔', color: '#d03b3b' };

  const customSeries = progress.customSeries || [];

  const listItems = [
    { key: catalog.requiredReading.key, name: catalog.requiredReading.name, emoji: catalog.requiredReading.emoji, color: catalog.requiredReading.color },
    ...catalog.series.map((s) => ({ key: s.key, name: s.name, emoji: s.emoji, color: s.color })),
    ...customSeries.map((s) => ({ key: s.key, name: s.name, emoji: s.emoji, color: s.color })),
    { key: 'misc', name: '기타', emoji: '🗂️', color: '#898781' },
  ];

  const bottomItems = [{ key: 'shop', name: '포인트샵', emoji: '🛍️', color: '#eda100' }];

  function labelFor(key) {
    if (key === 'home') return null;
    if (key === 'approvals') return pending > 0 ? String(pending) : null;
    if (key === catalog.requiredReading.key) {
      const total = catalog.requiredReading.books.length;
      const read = catalog.requiredReading.books.filter((b) => progress.books?.[b.id]?.read).length;
      return `${read}/${total}`;
    }
    if (key === 'misc') {
      const { total, read } = countMiscProgress(progress);
      return `${read}/${total}`;
    }
    if (key === 'shop') return `${walletBalance(catalog, progress)}P`;
    const series = catalog.series.find((s) => s.key === key);
    if (series) {
      const { total, read } = countSeriesProgress(series, progress);
      return `${read}/${total}`;
    }
    if (customSeries.some((s) => s.key === key)) {
      const { total, read } = countCustomSeriesProgress(progress, key);
      return `${read}/${total}`;
    }
    return null;
  }

  function renderItem(item) {
    const label = labelFor(item.key);
    const isAlert = item.key === 'approvals' && pending > 0;
    return (
      <li key={item.key}>
        <button
          className={`sidebar__item${activeKey === item.key ? ' sidebar__item--active' : ''}`}
          onClick={() => {
            if (item.key === 'home') {
              // A full reload, not just a client-side nav - the iPhone
              // home-screen icon otherwise never re-fetches the latest deploy.
              // Waits for any in-flight sync write so it can't be dropped.
              safeReload();
              return;
            }
            onSelect(item.key);
            onClose?.();
          }}
        >
          <span className="sidebar__dot" style={{ background: item.color }} />
          <span className="sidebar__emoji">{item.emoji}</span>
          <span className="sidebar__name">{item.name}</span>
          {label && (
            <span className={`sidebar__count${isAlert ? ' sidebar__count--alert' : ''}`}>{label}</span>
          )}
        </button>
      </li>
    );
  }

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <nav className={`sidebar${open ? ' sidebar--open' : ''}`}>
        <div className="sidebar__title">📚 라온이의 독서 노트</div>
        <ul>{topItems.map(renderItem)}</ul>
        <ul>{[approvalsItem].map(renderItem)}</ul>
        <div className="sidebar__divider" />
        <ul>{listItems.map(renderItem)}</ul>

        {addingSeries ? (
          <form
            className="sidebar__add-series-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!newSeriesName.trim()) return;
              onAddSeries(newSeriesName.trim(), newSeriesEmoji.trim() || '📚');
              setNewSeriesName('');
              setNewSeriesEmoji('');
              setAddingSeries(false);
            }}
          >
            <input
              autoFocus
              placeholder="시리즈 이름"
              value={newSeriesName}
              onChange={(e) => setNewSeriesName(e.target.value)}
            />
            <input
              placeholder="이모지(선택)"
              value={newSeriesEmoji}
              onChange={(e) => setNewSeriesEmoji(e.target.value)}
            />
            <div className="sidebar__add-series-actions">
              <button type="submit">추가</button>
              <button type="button" onClick={() => setAddingSeries(false)}>
                취소
              </button>
            </div>
          </form>
        ) : (
          <button className="sidebar__add-series-btn" onClick={() => setAddingSeries(true)}>
            + 시리즈 추가
          </button>
        )}

        <div className="sidebar__divider" />
        <ul>{bottomItems.map(renderItem)}</ul>
      </nav>
    </>
  );
}
