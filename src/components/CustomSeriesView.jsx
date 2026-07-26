import { useMemo, useState } from 'react';
import BookCard from './BookCard';
import ProgressBar from './ProgressBar';
import { getBookState, getBookStatus, getCustomSeriesBooks } from '../lib/progressUtils';

export default function CustomSeriesView({
  series,
  progress,
  isChild,
  actions,
  onAdd,
  onRemoveBook,
  onRemoveSeries,
  onNavigateHome,
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [filter, setFilter] = useState('all');

  const books = getCustomSeriesBooks(progress, series.key);
  const total = books.length;
  const read = books.filter((b) => getBookStatus(progress, b.id) === 'read').length;

  const sortedBooks = useMemo(() => {
    const withStatus = books.map((b) => ({
      ...b,
      status: getBookStatus(progress, b.id),
      readDate: getBookState(progress, b.id)?.date,
    }));
    const readBooks = [...withStatus.filter((b) => b.status === 'read')].sort((a, b) =>
      (b.readDate || '').localeCompare(a.readDate || '')
    );
    const pendingBooks = withStatus.filter((b) => b.status === 'pending');
    const unreadBooks = withStatus.filter((b) => b.status === 'unread');
    return [...readBooks, ...pendingBooks, ...unreadBooks];
  }, [books, progress]);

  const visibleBooks = sortedBooks.filter((b) => filter === 'all' || b.status === filter);

  return (
    <section className="section-view">
      <header className="section-view__header">
        <h2>
          <span className="section-view__emoji">{series.emoji}</span> {series.name}
        </h2>
        <ProgressBar total={total} read={read} color={series.color} size="lg" />
      </header>

      <form
        className="misc-add-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          onAdd(series.key, { title: title.trim(), category: category.trim(), subtitle: subtitle.trim() });
          setTitle('');
          setCategory('');
          setSubtitle('');
        }}
      >
        <input placeholder="책 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input
          placeholder="책 구분 (선택)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          placeholder="소제목 (선택)"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <button type="submit">+ 책 추가</button>
      </form>

      <div className="section-view__filters">
        {[
          ['all', '전체'],
          ['unread', '안읽음'],
          ['pending', '확인 대기'],
          ['read', '읽음'],
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

      <div className="book-grid">
        {visibleBooks.map((book, i) => (
          <BookCard
            key={book.id}
            book={{ ...book, number: i + 1, owned: true }}
            progress={progress}
            accent={series.color}
            extraTag={book.category}
            subtitle={book.subtitle}
            isChild={isChild}
            onDelete={onRemoveBook}
            {...actions}
          />
        ))}
        {visibleBooks.length === 0 && <p className="empty-msg">조건에 맞는 책이 없어요.</p>}
      </div>

      {!isChild && (
        <button
          className="custom-series__delete"
          onClick={() => {
            if (window.confirm(`"${series.name}" 시리즈를 완전히 삭제할까요? 안에 있는 책 기록도 함께 삭제돼요.`)) {
              onRemoveSeries(series.key);
              onNavigateHome();
            }
          }}
        >
          🗑️ 이 시리즈 삭제
        </button>
      )}
    </section>
  );
}
