import ProgressBar from './ProgressBar';
import { MILESTONES } from '../lib/progressUtils';

const BADGE_EMOJI = ['🥉', '🥈', '🥇', '🏅', '🎖️', '🏆', '👑', '🌟', '💎', '🚀'];

export default function ProgressHero({ total, read, onMenuClick }) {
  return (
    <div className="progress-hero">
      <button className="menu-btn" onClick={onMenuClick} aria-label="메뉴 열기">
        ☰
      </button>
      <div className="progress-hero__main">
        <div className="progress-hero__stat">
          <span className="progress-hero__number">{read}</span>
          <span className="progress-hero__total"> / {total}권</span>
        </div>
        <ProgressBar total={total} read={read} color="#2a78d6" size="lg" />
      </div>
      <div className="progress-hero__badges">
        {MILESTONES.map((m, i) => (
          <span
            key={m}
            className={`badge${read >= m ? ' badge--on' : ''}`}
            title={`${m}권 달성`}
          >
            {BADGE_EMOJI[i]}
          </span>
        ))}
      </div>
    </div>
  );
}
