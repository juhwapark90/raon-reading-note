import { useMemo, useState } from 'react';
import BookCard from './BookCard';
import ProgressBar from './ProgressBar';
import { getBookStatus, isRead } from '../lib/progressUtils';

const GENRE_COLOR = {
  문학: '#2a78d6',
  사회: '#1baf7a',
  인문: '#eda100',
  과학: '#4a3aa7',
  예술: '#e87ba4',
};

export default function RequiredReadingView({ section, progress, isChild, actions }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeLevel, setActiveLevel] = useState('전체');

  const byLevel = useMemo(() => {
    const map = {};
    for (const level of section.levels) map[level] = [];
    for (const b of section.books) map[b.level].push(b);
    return map;
  }, [section]);

  const overallTotal = section.books.length;
  const overallRead = section.books.filter((b) => isRead(progress, b.id)).length;

  const levelsToShow = activeLevel === '전체' ? section.levels : [activeLevel];

  return (
    <section className="section-view">
      <header className="section-view__header">
        <h2>
          <span className="section-view__emoji">{section.emoji}</span> {section.name}
        </h2>
        <ProgressBar total={overallTotal} read={overallRead} color={section.color} size="lg" />
      </header>

      <div className="section-view__controls">
        <input
          className="section-view__search"
          placeholder="책 제목 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="section-view__filters">
          <button
            className={`chip${activeLevel === '전체' ? ' chip--active' : ''}`}
            onClick={() => setActiveLevel('전체')}
          >
            전체 수준
          </button>
          {section.levels.map((level) => (
            <button
              key={level}
              className={`chip${activeLevel === level ? ' chip--active' : ''}`}
              onClick={() => setActiveLevel(level)}
            >
              {level}
            </button>
          ))}
        </div>
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
      </div>

      {levelsToShow.map((level) => {
        const books = byLevel[level].filter((b) => {
          if (query.trim() && !b.title.includes(query.trim())) return false;
          const status = getBookStatus(progress, b.id);
          if (filter === 'read') return status === 'read';
          if (filter === 'pending') return status === 'pending';
          if (filter === 'unread') return status === 'unread';
          return true;
        });
        const levelTotal = byLevel[level].length;
        const levelRead = byLevel[level].filter((b) => isRead(progress, b.id)).length;
        if (books.length === 0) return null;
        return (
          <div key={level} className="level-group">
            <div className="level-group__header">
              <h3>{level}</h3>
              <ProgressBar total={levelTotal} read={levelRead} color={section.color} size="sm" />
            </div>
            <div className="book-grid">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  progress={progress}
                  accent={GENRE_COLOR[book.genre] || section.color}
                  extraTag={book.genre}
                  isChild={isChild}
                  {...actions}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
