import { useMemo, useState } from 'react';
import BookCard from './BookCard';
import ProgressBar from './ProgressBar';
import { countMiscProgress, getBookState, getBookStatus } from '../lib/progressUtils';

const ACCENT = '#898781';

export default function MiscView({ progress, isChild, actions, onAdd, onRemove }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [filter, setFilter] = useState('all'); // all | unread | pending | read
  const books = progress.miscBooks || [];
  const { total, read } = countMiscProgress(progress);

  // Default order is "read order" - most recently finished first, then
  // books waiting on a parent's confirmation, then still-unread ones.
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
          <span className="section-view__emoji">🗂️</span> 기타
        </h2>
        <p className="section-view__subtitle">정해진 시리즈에 없는 책은 여기에 추가해서 기록해요.</p>
        <ProgressBar total={total} read={read} color={ACCENT} size="lg" />
      </header>

      <form
        className="misc-add-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          onAdd({ title: title.trim(), category: category.trim(), subtitle: subtitle.trim() });
          setTitle('');
          setCategory('');
          setSubtitle('');
        }}
      >
        <input
          placeholder="책 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="책 구분 (예: 과학, 위인전)"
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
            accent={ACCENT}
            extraTag={book.category}
            subtitle={book.subtitle}
            isChild={isChild}
            onDelete={onRemove}
            {...actions}
          />
        ))}
        {visibleBooks.length === 0 && <p className="empty-msg">조건에 맞는 책이 없어요.</p>}
      </div>
    </section>
  );
}
