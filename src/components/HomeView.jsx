import { countSeriesProgress, totalPointsEarned, walletBalance } from '../lib/progressUtils';
import ProgressBar from './ProgressBar';

export default function HomeView({ catalog, progress, onNavigate }) {
  const points = totalPointsEarned(catalog, progress);
  const balance = walletBalance(catalog, progress);

  const req = catalog.requiredReading;
  const reqRead = req.books.filter((b) => progress.books?.[b.id]?.read).length;

  const cards = [
    { key: req.key, name: req.name, emoji: req.emoji, color: req.color, total: req.books.length, read: reqRead },
    ...catalog.series.map((s) => {
      const { total, read } = countSeriesProgress(s, progress);
      return { key: s.key, name: s.name, emoji: s.emoji, color: s.color, total, read };
    }),
    {
      key: 'free-reading',
      name: '자유 독서 일지',
      emoji: '📔',
      color: '#898781',
      total: null,
      read: progress.freeReading?.length || 0,
    },
  ];

  return (
    <section className="section-view">
      <header className="section-view__header">
        <h2>
          <span className="section-view__emoji">🏠</span> 오늘의 독서 현황
        </h2>
      </header>

      <div className="home-stats">
        <div className="home-stat-card">
          <div className="home-stat-card__label">모은 포인트</div>
          <div className="home-stat-card__value">{points}P</div>
        </div>
        <div className="home-stat-card">
          <div className="home-stat-card__label">쓸 수 있는 포인트</div>
          <div className="home-stat-card__value">{balance}P</div>
        </div>
        <button className="home-stat-card home-stat-card--action" onClick={() => onNavigate('shop')}>
          <div className="home-stat-card__label">용돈 쿠폰 받으러 가기</div>
          <div className="home-stat-card__value">🛍️ 상점</div>
        </button>
      </div>

      <h3 className="home-section-title">시리즈별 진행률</h3>
      <div className="home-grid">
        {cards.map((c) => (
          <button key={c.key} className="home-card" onClick={() => onNavigate(c.key)}>
            <div className="home-card__top">
              <span className="home-card__dot" style={{ background: c.color }} />
              <span className="home-card__emoji">{c.emoji}</span>
              <span className="home-card__name">{c.name}</span>
            </div>
            {c.total !== null ? (
              <ProgressBar total={c.total} read={c.read} color={c.color} size="sm" />
            ) : (
              <div className="home-card__free">{c.read}권 기록</div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
