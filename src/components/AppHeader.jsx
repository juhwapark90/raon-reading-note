import ProfileBadge from './ProfileBadge';
import SyncPanel from './SyncPanel';

export default function AppHeader({
  onMenuClick,
  profile,
  onSelectProfile,
  syncStatus,
  roomCode,
  onJoin,
  onLeave,
  pointBalance,
  onPointsClick,
}) {
  return (
    <div className="app-header">
      <button className="menu-btn" onClick={onMenuClick} aria-label="메뉴 열기">
        ☰
      </button>
      <h1 className="app-header__title">똑똑한 라온이의 독서공간</h1>
      <div className="app-topbar__right">
        <button className="header-point-btn" onClick={onPointsClick}>
          💰 {pointBalance}P
        </button>
        <ProfileBadge profile={profile} onSelect={onSelectProfile} />
        <SyncPanel syncStatus={syncStatus} roomCode={roomCode} onJoin={onJoin} onLeave={onLeave} />
      </div>
    </div>
  );
}
