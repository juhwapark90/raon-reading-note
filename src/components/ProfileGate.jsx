import { PROFILE_LIST } from '../data/profiles';

export default function ProfileGate({ onSelect }) {
  return (
    <div className="profile-gate">
      <div className="profile-gate__box">
        <div className="profile-gate__title">📚 누가 들어왔나요?</div>
        <div className="profile-gate__list">
          {PROFILE_LIST.map((p) => (
            <button key={p.id} className="profile-gate__btn" onClick={() => onSelect(p.id)}>
              <span className="profile-gate__emoji">{p.emoji}</span>
              <span className="profile-gate__label">{p.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
