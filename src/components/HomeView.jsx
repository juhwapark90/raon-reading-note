import {
  countCustomSeriesProgress,
  countMiscProgress,
  countSeriesProgress,
  getCustomSeriesList,
  pendingCount,
  walletBalance,
} from '../lib/progressUtils';
import ProgressBar from './ProgressBar';
import CharacterView from './CharacterView';

export default function HomeView({ catalog, progress, isChild, totalRead, onNavigate }) {
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
    ...getCustomSeriesList(progress).map((s) => {
      const { total, read } = countCustomSeriesProgress(progress, s.key);
      return { key: s.key, name: s.name, emoji: s.emoji, color: s.color, total, read };
    }),
    { key: 'misc', name: '기타', emoji: '🗂️', color: '#898781', total: misc.total, read: misc.read },
  ];

  return (
    <section className="section-view">
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

      <div className="home-hero">
        <CharacterView equipped={progress.character?.equipped} size={140} />
        <div className="home-hero__text">
          지금까지 총 <span className="home-hero__count">{totalRead}</span>권의 책을 읽었어요.
        </div>
      </div>

      <button className="home-point-btn" onClick={() => onNavigate('shop')}>
        💰 {balance}P
      </button>

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
