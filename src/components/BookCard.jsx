import { useState } from 'react';
import { getBookState, getEffectiveBook, getBookStatus } from '../lib/progressUtils';

const STARS = [1, 2, 3, 4, 5];

export default function BookCard({
  book,
  progress,
  isChild,
  accent,
  extraTag,
  onSetRating,
  onSetTitle,
  onRequestRead,
  onCancelPending,
  onConfirmRead,
  onUnconfirmRead,
  onDelete,
}) {
  const effective = getEffectiveBook(book, progress);
  const state = getBookState(progress, book.id);
  const status = getBookStatus(progress, book.id);
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

  let actionEl;
  if (status === 'read') {
    actionEl = (
      <div className="book-card__read-row">
        <span className="book-card__check book-card__check--on">
          ✅ 읽음{state?.date ? ` · ${state.date}` : ''}
        </span>
        {!isChild && (
          <button className="book-card__undo" onClick={() => onUnconfirmRead(book.id)}>
            되돌리기
          </button>
        )}
      </div>
    );
  } else if (status === 'pending') {
    actionEl = isChild ? (
      <button className="book-card__check book-card__check--pending" onClick={() => onCancelPending(book.id)}>
        🔔 확인 기다리는 중 (취소)
      </button>
    ) : (
      <button className="book-card__check book-card__check--confirm" onClick={() => onConfirmRead(book.id)}>
        🔔 확인하기
      </button>
    );
  } else {
    actionEl = isChild ? (
      <button className="book-card__check" onClick={() => onRequestRead(book.id)}>
        읽었어요!
      </button>
    ) : (
      <div className="book-card__check book-card__check--muted">아직 안 읽음</div>
    );
  }

  return (
    <div className={`book-card${status === 'read' ? ' book-card--read' : ''}${status === 'pending' ? ' book-card--pending' : ''}`}>
      <div className="book-card__top">
        <span className="book-card__number" style={{ color: accent }}>
          #{book.number}
        </span>
        {extraTag && <span className="book-card__tag">{extraTag}</span>}
        {onDelete && (
          <button className="book-card__delete" onClick={() => onDelete(book.id)} aria-label="삭제">
            ✕
          </button>
        )}
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
      {actionEl}
    </div>
  );
}
