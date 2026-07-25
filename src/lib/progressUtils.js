export function getBookState(progress, bookId) {
  return (progress.books && progress.books[bookId]) || null;
}

export function isRead(progress, bookId) {
  return Boolean(getBookState(progress, bookId)?.read);
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
  return { total, read };
}

export const MILESTONES = [10, 30, 60, 100, 150, 200, 300, 400, 500, 600];

export const POINTS_PER_BOOK = 10;

// Points are always derived from what's actually checked/logged right now,
// never a manually-incremented counter - so toggling a book off removes the
// points it granted, and there's no way to farm points by re-checking books.
export function totalBooksCompleted(catalog, progress) {
  return countTotalProgress(catalog, progress).read + (progress.freeReading?.length || 0);
}

export function totalPointsEarned(catalog, progress) {
  return totalBooksCompleted(catalog, progress) * POINTS_PER_BOOK;
}

export function pointsSpent(progress) {
  return (progress.purchases || []).reduce((sum, p) => sum + (p.price || 0), 0);
}

export function walletBalance(catalog, progress) {
  return totalPointsEarned(catalog, progress) - pointsSpent(progress);
}

export function todayStr() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
