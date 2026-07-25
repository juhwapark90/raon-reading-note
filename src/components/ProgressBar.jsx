export default function ProgressBar({ total, read, color = '#2a78d6', size = 'md' }) {
  const pct = total > 0 ? Math.round((read / total) * 100) : 0;
  return (
    <div className={`progress-bar progress-bar--${size}`}>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="progress-bar__label">
        {read}/{total} · {pct}%
      </span>
    </div>
  );
}
