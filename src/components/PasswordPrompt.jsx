import { useState } from 'react';
import { PARENT_PASSWORD } from '../lib/profileAuth';

export default function PasswordPrompt({ label, onConfirm, onCancel }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const submit = () => {
    if (value === PARENT_PASSWORD) {
      onConfirm();
    } else {
      setError(true);
      setValue('');
    }
  };

  return (
    <div className="password-prompt">
      <p className="password-prompt__label">{label} 비밀번호를 입력하세요</p>
      <input
        type="password"
        inputMode="numeric"
        autoFocus
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
        className={`password-prompt__input${error ? ' password-prompt__input--error' : ''}`}
      />
      {error && <p className="password-prompt__error">비밀번호가 틀렸어요</p>}
      <div className="password-prompt__actions">
        <button className="password-prompt__confirm" onClick={submit}>
          확인
        </button>
        <button className="password-prompt__cancel" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
}
