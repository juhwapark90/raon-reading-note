import { useState } from 'react';
import { PROFILE_LIST } from '../data/profiles';

export default function ProfileBadge({ profile, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="profile-badge">
      <button className="profile-badge__btn" onClick={() => setOpen((v) => !v)}>
        <span>{profile.emoji}</span> {profile.label}
      </button>
      {open && (
        <div className="profile-badge__popover">
          <p>다른 사람으로 전환</p>
          {PROFILE_LIST.map((p) => (
            <button
              key={p.id}
              className={`profile-badge__option${p.id === profile.id ? ' profile-badge__option--active' : ''}`}
              onClick={() => {
                onSelect(p.id);
                setOpen(false);
              }}
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
