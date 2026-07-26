import { useState } from 'react';
import { PROFILE_LIST } from '../data/profiles';
import PasswordPrompt from './PasswordPrompt';

export default function ProfileBadge({ profile, onSelect }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(null);

  const handleClick = (p) => {
    if (p.requiresPassword) {
      setPending(p);
    } else {
      onSelect(p.id);
      setOpen(false);
    }
  };

  const close = () => {
    setOpen(false);
    setPending(null);
  };

  return (
    <div className="profile-badge">
      <button
        className="profile-badge__btn"
        onClick={() => (open ? close() : setOpen(true))}
      >
        <span>{profile.emoji}</span> {profile.label}
      </button>
      {open && (
        <div className="profile-badge__popover">
          {pending ? (
            <PasswordPrompt
              label={pending.label}
              onConfirm={() => {
                onSelect(pending.id);
                close();
              }}
              onCancel={() => setPending(null)}
            />
          ) : (
            <>
              <p>다른 사람으로 전환</p>
              {PROFILE_LIST.map((p) => (
                <button
                  key={p.id}
                  className={`profile-badge__option${p.id === profile.id ? ' profile-badge__option--active' : ''}`}
                  onClick={() => handleClick(p)}
                >
                  {p.emoji} {p.label}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
