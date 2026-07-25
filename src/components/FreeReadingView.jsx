import { useState } from 'react';
import { todayStr } from '../lib/progressUtils';

const STARS = [1, 2, 3, 4, 5];

export default function FreeReadingView({ entries, onAdd, onUpdate, onRemove }) {
  const [title, setTitle] = useState('');

  const sorted = [...entries].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return (
    <section className="section-view">
      <header className="section-view__header">
        <h2>
          <span className="section-view__emoji">📔</span> 자유 독서 일지
        </h2>
        <p className="section-view__subtitle">
          시리즈에 없는 책을 읽었을 때 자유롭게 기록해요. 지금까지{' '}
          <strong>{entries.length}권</strong> 기록했어요.
        </p>
      </header>

      <form
        className="free-reading__form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          onAdd({ title: title.trim(), date: todayStr(), rating: 0, memo: '' });
          setTitle('');
        }}
      >
        <input
          placeholder="읽은 책 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">+ 기록 추가</button>
      </form>

      <div className="free-reading__list">
        {sorted.map((entry) => (
          <div key={entry.id} className="free-reading__item">
            <div className="free-reading__item-main">
              <span className="free-reading__title">{entry.title}</span>
              <span className="free-reading__date">{entry.date}</span>
            </div>
            <div className="book-card__stars">
              {STARS.map((n) => (
                <button
                  key={n}
                  className={`star${(entry.rating || 0) >= n ? ' star--on' : ''}`}
                  onClick={() => onUpdate(entry.id, { rating: entry.rating === n ? 0 : n })}
                >
                  ★
                </button>
              ))}
            </div>
            <button className="free-reading__remove" onClick={() => onRemove(entry.id)}>
              삭제
            </button>
          </div>
        ))}
        {sorted.length === 0 && <p className="empty-msg">아직 기록이 없어요. 첫 책을 추가해보세요!</p>}
      </div>
    </section>
  );
}
