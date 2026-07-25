import { countSeriesProgress, walletBalance } from '../lib/progressUtils';

export default function Sidebar({ catalog, progress, activeKey, onSelect, freeCount, open, onClose }) {
  const topItems = [{ key: 'home', name: '홈', emoji: '🏠', color: '#2a78d6' }];

  const listItems = [
    { key: catalog.requiredReading.key, name: catalog.requiredReading.name, emoji: catalog.requiredReading.emoji, color: catalog.requiredReading.color },
    ...catalog.series.map((s) => ({ key: s.key, name: s.name, emoji: s.emoji, color: s.color })),
    { key: 'free-reading', name: '자유 독서 일지', emoji: '📔', color: '#898781' },
  ];

  const bottomItems = [{ key: 'shop', name: '상점', emoji: '🛍️', color: '#eda100' }];

  function labelFor(key) {
    if (key === 'home') return null;
    if (key === catalog.requiredReading.key) {
      const total = catalog.requiredReading.books.length;
      const read = catalog.requiredReading.books.filter((b) => progress.books?.[b.id]?.read).length;
      return `${read}/${total}`;
    }
    if (key === 'free-reading') return `${freeCount}권`;
    if (key === 'shop') return `${walletBalance(catalog, progress)}P`;
    const series = catalog.series.find((s) => s.key === key);
    const { total, read } = countSeriesProgress(series, progress);
    return `${read}/${total}`;
  }

  function renderItem(item) {
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
          <span className="sidebar__count">{labelFor(item.key)}</span>
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
        <div className="sidebar__divider" />
        <ul>{listItems.map(renderItem)}</ul>
        <div className="sidebar__divider" />
        <ul>{bottomItems.map(renderItem)}</ul>
      </nav>
    </>
  );
}
