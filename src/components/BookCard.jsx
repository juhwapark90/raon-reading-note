import { useState } from 'react';
import { getBookState, getEffectiveBook, isRead, todayStr } from '../lib/progressUtils';

const STARS = [1, 2, 3, 4, 5];

export default function BookCard({ book, progress, onToggleRead, onSetRating, onSetTitle, accent, extraTag }) {
  const effective = getEffectiveBook(book, progress);
  const state = getBookState(progress, book.id);
  const read = isRead(progress, book.id);
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');

  if (!effective.owned) {
    return (
      <div className="book-card book-card--placeholder">
        <div className="book-card__number" style={{ color: accent }}>
          #{book.number}
        </div>
        {editing ? (
          <form
            className="book-card__title-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (draftTitle.trim()) onSetTitle(book.id, draftTitle.trim());
              setEditing(false);
            }}
          >
            <input
              autoFocus
              value={draftTitle}
              placeholder="책 제목을 입력하세요"
              onChange={(e) => setDraftTitle(e.target.value)}
            />
            <button type="submit">저장</button>
          </form>
        ) : (
          <button className="book-card__add-btn" onClick={() => setEditing(true)}>
            + 책 도착하면 제목 입력
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`book-card${read ? ' book-card--read' : ''}`}>
      <div className="book-card__top">
        <span className="book-card__number" style={{ color: accent }}>
          #{book.number}
        </span>
        {extraTag && <span className="book-card__tag">{extraTag}</span>}
      </div>
      <div className="book-card__title">{effective.title}</div>
      <div className="book-card__stars">
        {STARS.map((n) => (
          <button
            key={n}
            className={`star${(state?.rating || 0) >= n ? ' star--on' : ''}`}
            aria-label={`${n}점`}
            onClick={() => onSetRating(book.id, state?.rating === n ? 0 : n)}
          >
            ★
          </button>
        ))}
      </div>
      <button
        className={`book-card__check${read ? ' book-card__check--on' : ''}`}
        onClick={() => onToggleRead(book.id)}
      >
        {read ? `✅ 읽음${state?.date ? ` · ${state.date}` : ''}` : '읽었어요!'}
      </button>
    </div>
  );
}

export { todayStr };
