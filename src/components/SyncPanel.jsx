import { useState } from 'react';
import { isFirebaseConfigured } from '../lib/firebase';

const STATUS_LABEL = {
  'local-only': { text: '이 기기에만 저장 중', color: '#898781' },
  'no-room': { text: '동기화 코드 필요', color: '#eda100' },
  connecting: { text: '연결 중...', color: '#eda100' },
  synced: { text: '동기화됨', color: '#0ca30c' },
  error: { text: '동기화 오류', color: '#d03b3b' },
};

function randomCode() {
  return Math.random().toString(36).slice(2, 8);
}

export default function SyncPanel({ syncStatus, roomCode, onJoin, onLeave }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const status = STATUS_LABEL[syncStatus] || STATUS_LABEL['local-only'];

  return (
    <div className="sync-panel">
      <button className="sync-panel__badge" onClick={() => setOpen((v) => !v)}>
        <span className="sync-panel__dot" style={{ background: status.color }} />
        {status.text}
      </button>
      {open && (
        <div className="sync-panel__popover">
          {!isFirebaseConfigured && (
            <p>
              Firebase 설정이 아직 없어요. 이 기기에만 기록이 저장돼요. 여러 기기에서 함께 보려면
              README의 안내대로 Firebase를 연결해주세요.
            </p>
          )}
          {isFirebaseConfigured && (
            <>
              {roomCode ? (
                <>
                  <p>
                    현재 가족 코드: <strong>{roomCode}</strong>
                  </p>
                  <p className="sync-panel__hint">
                    다른 기기에서도 같은 코드를 입력하면 기록이 함께 보여요.
                  </p>
                  <button onClick={onLeave}>코드 연결 해제</button>
                </>
              ) : (
                <>
                  <p>가족 코드를 만들거나 입력해서 여러 기기에서 함께 기록해요.</p>
                  <div className="sync-panel__row">
                    <input
                      value={draft}
                      placeholder="가족 코드"
                      onChange={(e) => setDraft(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        if (draft.trim()) onJoin(draft.trim());
                      }}
                    >
                      연결
                    </button>
                  </div>
                  <button
                    className="sync-panel__new"
                    onClick={() => setDraft(randomCode())}
                  >
                    새 코드 만들기
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
