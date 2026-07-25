import { DEFAULT_FACE_ID } from '../data/characterItems';

export function getBookState(progress, bookId) {
  return (progress.books && progress.books[bookId]) || null;
}

// A book's lifecycle is unread -> pending (라온이 says she read it) ->
// read (a parent confirmed it). Only "read" counts toward progress/points.
export function isRead(progress, bookId) {
  return Boolean(getBookState(progress, bookId)?.read);
}

export function isPending(progress, bookId) {
  const s = getBookState(progress, bookId);
  return Boolean(s?.pending) && !s?.read;
}

export function getBookStatus(progress, bookId) {
  const s = getBookState(progress, bookId);
  if (s?.read) return 'read';
  if (s?.pending) return 'pending';
  return 'unread';
}

// A placeholder slot (no title yet) becomes "owned" once a title has been
// filled in for it, even though the source catalog marks it unowned.
export function getEffectiveBook(book, progress) {
  const state = getBookState(progress, book.id);
  const titleOverride = state?.titleOverride?.trim();
  return {
    ...book,
    title: book.title || titleOverride || '',
    owned: book.owned || Boolean(titleOverride),
  };
}

export function countSeriesProgress(series, progress) {
  const ownedBooks = series.books
    .map((b) => getEffectiveBook(b, progress))
    .filter((b) => b.owned);
  const readCount = ownedBooks.filter((b) => isRead(progress, b.id)).length;
  return { total: ownedBooks.length, read: readCount };
}

export function getMiscBooks(progress) {
  return progress.miscBooks || [];
}

export function countMiscProgress(progress) {
  const books = getMiscBooks(progress);
  const read = books.filter((b) => isRead(progress, b.id)).length;
  return { total: books.length, read };
}

export function countTotalProgress(catalog, progress) {
  let total = 0;
  let read = 0;
  for (const s of catalog.series) {
    const c = countSeriesProgress(s, progress);
    total += c.total;
    read += c.read;
  }
  const req = catalog.requiredReading.books;
  total += req.length;
  read += req.filter((b) => isRead(progress, b.id)).length;
  const misc = countMiscProgress(progress);
  total += misc.total;
  read += misc.read;
  return { total, read };
}

export const MILESTONES = [10, 30, 60, 100, 150, 200, 300, 400, 500, 600];

export const POINTS_PER_BOOK = 10;

// Points are always derived from what's actually confirmed-read right now,
// never a manually-incremented counter - so unconfirming a book removes the
// points it granted, and there's no way to farm points by re-checking books.
export function totalBooksCompleted(catalog, progress) {
  return countTotalProgress(catalog, progress).read;
}

export function totalPointsEarned(catalog, progress) {
  return totalBooksCompleted(catalog, progress) * POINTS_PER_BOOK;
}

export function pointsSpent(progress) {
  const couponSpend = (progress.purchases || []).reduce((sum, p) => sum + (p.price || 0), 0);
  const characterSpend = Object.values(progress.character?.owned || {}).reduce(
    (sum, p) => sum + (p || 0),
    0
  );
  return couponSpend + characterSpend;
}

export function isCharacterItemOwned(progress, itemId) {
  if (itemId === DEFAULT_FACE_ID) return true;
  return Boolean(progress.character?.owned?.[itemId]);
}

export function getEquippedCharacterItems(progress) {
  return progress.character?.equipped || {};
}

export function walletBalance(catalog, progress) {
  return totalPointsEarned(catalog, progress) - pointsSpent(progress);
}

// Every pending (awaiting parent confirmation) book across the whole
// catalog, enriched with where it lives so the approvals list can show and
// link to it.
export function getAllPendingBooks(catalog, progress) {
  const results = [];

  const req = catalog.requiredReading;
  for (const b of req.books) {
    if (isPending(progress, b.id)) {
      results.push({
        id: b.id,
        title: b.title,
        sectionKey: req.key,
        sectionName: req.name,
        sectionEmoji: req.emoji,
        pendingDate: getBookState(progress, b.id)?.pendingDate,
      });
    }
  }

  for (const s of catalog.series) {
    for (const rawBook of s.books) {
      const b = getEffectiveBook(rawBook, progress);
      if (b.owned && isPending(progress, b.id)) {
        results.push({
          id: b.id,
          title: b.title,
          sectionKey: s.key,
          sectionName: s.name,
          sectionEmoji: s.emoji,
          pendingDate: getBookState(progress, b.id)?.pendingDate,
        });
      }
    }
  }

  for (const b of getMiscBooks(progress)) {
    if (isPending(progress, b.id)) {
      results.push({
        id: b.id,
        title: b.title,
        sectionKey: 'misc',
        sectionName: '기타',
        sectionEmoji: '🗂️',
        pendingDate: getBookState(progress, b.id)?.pendingDate,
      });
    }
  }

  results.sort((a, b) => (a.pendingDate || '').localeCompare(b.pendingDate || ''));
  return results;
}

export function pendingCount(catalog, progress) {
  return getAllPendingBooks(catalog, progress).length;
}

export function todayStr() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
