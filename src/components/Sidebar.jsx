import { countSeriesProgress, countMiscProgress, pendingCount, walletBalance } from '../lib/progressUtils';

export default function Sidebar({ catalog, progress, activeKey, onSelect, open, onClose }) {
  const topItems = [{ key: 'home', name: '홈', emoji: '🏠', color: '#2a78d6' }];

  const pending = pendingCount(catalog, progress);
  const approvalsItem = { key: 'approvals', name: '확인 대기', emoji: '🔔', color: '#d03b3b' };

  const listItems = [
    { key: catalog.requiredReading.key, name: catalog.requiredReading.name, emoji: catalog.requiredReading.emoji, color: catalog.requiredReading.color },
    ...catalog.series.map((s) => ({ key: s.key, name: s.name, emoji: s.emoji, color: s.color })),
    { key: 'misc', name: '기타', emoji: '🗂️', color: '#898781' },
  ];

  const bottomItems = [
    { key: 'shop', name: '상점', emoji: '🛍️', color: '#eda100' },
    { key: 'character-shop', name: '캐릭터 꾸미기', emoji: '✨', color: '#e87ba4' },
  ];

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
    if (key === 'character-shop') return null;
    const series = catalog.series.find((s) => s.key === key);
    const { total, read } = countSeriesProgress(series, progress);
    return `${read}/${total}`;
  }

  function renderItem(item) {
    const label = labelFor(item.key);
    const isAlert = item.key === 'approvals' && pending > 0;
    return (
      <li key={item.key}>
        <button
          className={`sidebar__item${activeKey === item.key ? ' sidebar__item--active' : ''}`}
          onClick={() => {
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
        <div className="sidebar__divider" />
        <ul>{bottomItems.map(renderItem)}</ul>
      </nav>
    </>
  );
}
