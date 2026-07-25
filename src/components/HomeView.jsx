import {
  countMiscProgress,
  countSeriesProgress,
  pendingCount,
  totalPointsEarned,
  walletBalance,
} from '../lib/progressUtils';
import ProgressBar from './ProgressBar';
import CharacterView from './CharacterView';

export default function HomeView({ catalog, progress, isChild, onNavigate }) {
  const points = totalPointsEarned(catalog, progress);
  const balance = walletBalance(catalog, progress);
  const pending = pendingCount(catalog, progress);

  const req = catalog.requiredReading;
  const reqRead = req.books.filter((b) => progress.books?.[b.id]?.read).length;
  const misc = countMiscProgress(progress);

  const cards = [
    { key: req.key, name: req.name, emoji: req.emoji, color: req.color, total: req.books.length, read: reqRead },
    ...catalog.series.map((s) => {
      const { total, read } = countSeriesProgress(s, progress);
      return { key: s.key, name: s.name, emoji: s.emoji, color: s.color, total, read };
    }),
    { key: 'misc', name: '기타', emoji: '🗂️', color: '#898781', total: misc.total, read: misc.read },
  ];

  return (
    <section className="section-view">
      <header className="section-view__header">
        <h2>
          <span className="section-view__emoji">🏠</span> 오늘의 독서 현황
        </h2>
      </header>

      {pending > 0 && (
        <button className="pending-banner" onClick={() => onNavigate('approvals')}>
          <span className="pending-banner__icon">🔔</span>
          <span>
            {isChild
              ? `확인을 기다리는 책이 ${pending}권 있어요.`
              : `라온이가 ${pending}권을 읽었다고 알려왔어요! 눌러서 확인해주세요.`}
          </span>
        </button>
      )}

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
        <button
          className="home-stat-card home-stat-card--action home-stat-card--character"
          onClick={() => onNavigate('character-shop')}
        >
          <CharacterView equipped={progress.character?.equipped} size={56} />
          <div className="home-stat-card__label">캐릭터 꾸미기</div>
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
            <ProgressBar total={c.total} read={c.read} color={c.color} size="sm" />
          </button>
        ))}
      </div>
    </section>
  );
}
