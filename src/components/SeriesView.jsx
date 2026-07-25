import { useMemo, useState } from 'react';
import BookCard from './BookCard';
import ProgressBar from './ProgressBar';
import { countSeriesProgress, getEffectiveBook, isRead } from '../lib/progressUtils';

export default function SeriesView({ series, progress, onToggleRead, onSetRating, onSetTitle }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all | read | unread | missing

  const { total, read } = countSeriesProgress(series, progress);

  const visibleBooks = useMemo(() => {
    return series.books.filter((book) => {
      const eff = getEffectiveBook(book, progress);
      if (query.trim() && !eff.title.includes(query.trim())) return false;
      if (filter === 'missing') return !eff.owned;
      if (!eff.owned) return filter === 'all';
      const bookRead = isRead(progress, book.id);
      if (filter === 'read') return bookRead;
      if (filter === 'unread') return !bookRead;
      return true;
    });
  }, [series.books, progress, query, filter]);

  return (
    <section className="section-view">
      <header className="section-view__header">
        <h2>
          <span className="section-view__emoji">{series.emoji}</span> {series.name}
        </h2>
        <ProgressBar total={total} read={read} color={series.color} size="lg" />
      </header>

      <div className="section-view__controls">
        <input
          className="section-view__search"
          placeholder="책 제목 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="section-view__filters">
          {[
            ['all', '전체'],
            ['unread', '안읽음'],
            ['read', '읽음'],
            ['missing', '미보유'],
          ].map(([key, label]) => (
            <button
              key={key}
              className={`chip${filter === key ? ' chip--active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="book-grid">
        {visibleBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            progress={progress}
            accent={series.color}
            onToggleRead={onToggleRead}
            onSetRating={onSetRating}
            onSetTitle={onSetTitle}
          />
        ))}
        {visibleBooks.length === 0 && <p className="empty-msg">조건에 맞는 책이 없어요.</p>}
      </div>
    </section>
  );
}
