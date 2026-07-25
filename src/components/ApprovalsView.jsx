import { getAllPendingBooks } from '../lib/progressUtils';

export default function ApprovalsView({ catalog, progress, isChild, onConfirmRead, onCancelPending, onNavigate }) {
  const pending = getAllPendingBooks(catalog, progress);

  return (
    <section className="section-view">
      <header className="section-view__header">
        <h2>
          <span className="section-view__emoji">🔔</span> 확인 대기
        </h2>
        <p className="section-view__subtitle">
          {isChild
            ? '라온이가 읽었다고 표시한 책이에요. 엄마나 아빠가 확인하면 완료돼요.'
            : '라온이가 읽었다고 알려온 책이에요. 확인하면 완료 처리되고 포인트도 지급돼요.'}
        </p>
      </header>

      {pending.length === 0 ? (
        <p className="empty-msg">확인을 기다리는 책이 없어요.</p>
      ) : (
        <div className="approvals-list">
          {pending.map((p) => (
            <div key={p.id} className="approvals-item">
              <button className="approvals-item__section" onClick={() => onNavigate(p.sectionKey)}>
                {p.sectionEmoji} {p.sectionName}
              </button>
              <span className="approvals-item__title">{p.title}</span>
              {p.pendingDate && <span className="approvals-item__date">{p.pendingDate}</span>}
              {isChild ? (
                <button className="approvals-item__cancel" onClick={() => onCancelPending(p.id)}>
                  취소
                </button>
              ) : (
                <button className="approvals-item__confirm" onClick={() => onConfirmRead(p.id)}>
                  🔔 확인하기
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
