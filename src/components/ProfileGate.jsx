import { useState } from 'react';
import { PROFILE_LIST } from '../data/profiles';
import PasswordPrompt from './PasswordPrompt';

export default function ProfileGate({ onSelect }) {
  const [pending, setPending] = useState(null);

  const handleClick = (p) => {
    if (p.requiresPassword) setPending(p);
    else onSelect(p.id);
  };

  return (
    <div className="profile-gate">
      <div className="profile-gate__box">
        <div className="profile-gate__title">📚 누가 들어왔나요?</div>
        {pending ? (
          <PasswordPrompt
            label={pending.label}
            onConfirm={() => {
              onSelect(pending.id);
              setPending(null);
            }}
            onCancel={() => setPending(null)}
          />
        ) : (
          <div className="profile-gate__list">
            {PROFILE_LIST.map((p) => (
              <button key={p.id} className="profile-gate__btn" onClick={() => handleClick(p)}>
                <span className="profile-gate__emoji">{p.emoji}</span>
                <span className="profile-gate__label">{p.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
