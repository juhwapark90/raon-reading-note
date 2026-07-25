import { useState } from 'react';
import BookCard from './BookCard';
import ProgressBar from './ProgressBar';
import { countMiscProgress } from '../lib/progressUtils';

const ACCENT = '#898781';

export default function MiscView({ progress, isChild, actions, onAdd, onRemove }) {
  const [title, setTitle] = useState('');
  const books = progress.miscBooks || [];
  const { total, read } = countMiscProgress(progress);

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
        className="free-reading__form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          onAdd(title.trim());
          setTitle('');
        }}
      >
        <input
          placeholder="책 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">+ 책 추가</button>
      </form>

      <div className="book-grid">
        {books.map((book, i) => (
          <BookCard
            key={book.id}
            book={{ ...book, number: i + 1, owned: true }}
            progress={progress}
            accent={ACCENT}
            isChild={isChild}
            onDelete={onRemove}
            {...actions}
          />
        ))}
        {books.length === 0 && <p className="empty-msg">아직 추가한 책이 없어요.</p>}
      </div>
    </section>
  );
}
