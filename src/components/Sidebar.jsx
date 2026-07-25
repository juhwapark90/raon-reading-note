import { countSeriesProgress } from '../lib/progressUtils';

export default function Sidebar({ catalog, progress, activeKey, onSelect, freeCount, open, onClose }) {
  const items = [
    { key: catalog.requiredReading.key, name: catalog.requiredReading.name, emoji: catalog.requiredReading.emoji, color: catalog.requiredReading.color },
    ...catalog.series.map((s) => ({ key: s.key, name: s.name, emoji: s.emoji, color: s.color })),
    { key: 'free-reading', name: '자유 독서 일지', emoji: '📔', color: '#898781' },
  ];

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <nav className={`sidebar${open ? ' sidebar--open' : ''}`}>
        <div className="sidebar__title">📚 라온이의 독서 노트</div>
        <ul>
          {items.map((item) => {
            let label = null;
            if (item.key === catalog.requiredReading.key) {
              const total = catalog.requiredReading.books.length;
              const read = catalog.requiredReading.books.filter(
                (b) => progress.books?.[b.id]?.read
              ).length;
              label = `${read}/${total}`;
            } else if (item.key === 'free-reading') {
              label = `${freeCount}권`;
            } else {
              const series = catalog.series.find((s) => s.key === item.key);
              const { total, read } = countSeriesProgress(series, progress);
              label = `${read}/${total}`;
            }
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
                  <span className="sidebar__count">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
