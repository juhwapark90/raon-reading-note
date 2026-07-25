import { useEffect, useRef, useState } from 'react';

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Builds a shareable coupon image on a canvas - no external brand imagery,
// just this app's own design (mirrors the reference app's reward-card idea).
function buildCouponImage(purchase) {
  return new Promise((resolve) => {
    const width = 500;
    const height = 560;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#fff8e1');
    grad.addColorStop(1, '#ffe9c7');
    ctx.fillStyle = grad;
    roundRectPath(ctx, 10, 10, width - 20, height - 20, 24);
    ctx.fill();
    ctx.strokeStyle = '#eda100';
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 8]);
    roundRectPath(ctx, 10, 10, width - 20, height - 20, 24);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#a15c00';
    ctx.font = '900 26px "Malgun Gothic", sans-serif';
    ctx.fillText('🎟️ 용돈 쿠폰 발급!', width / 2, 80);

    ctx.font = '900 72px "Malgun Gothic", sans-serif';
    ctx.fillStyle = '#d2691e';
    ctx.fillText(purchase.icon || '🎟️', width / 2, 200);

    ctx.font = 'bold 24px "Malgun Gothic", sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText('라온이님이', width / 2, 260);

    ctx.font = '900 40px "Malgun Gothic", sans-serif';
    ctx.fillStyle = '#0ca30c';
    ctx.fillText(`${purchase.amount.toLocaleString()}원`, width / 2, 320);

    ctx.font = '18px "Malgun Gothic", sans-serif';
    ctx.fillStyle = '#555';
    ctx.fillText(`포인트 ${purchase.price}P 사용`, width / 2, 355);
    ctx.fillText('용돈으로 바꿔주세요!', width / 2, 385);

    ctx.font = '15px "Malgun Gothic", sans-serif';
    ctx.fillStyle = '#999';
    ctx.fillText(purchase.date, width / 2, height - 60);

    ctx.font = 'bold 14px "Malgun Gothic", sans-serif';
    ctx.fillStyle = '#c49a58';
    ctx.fillText('라온이의 독서 노트', width / 2, height - 32);

    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });
}

export default function CouponPopup({ purchase, onClose, onShared }) {
  const [shared, setShared] = useState(false);
  const canvasWrapRef = useRef(null);

  useEffect(() => {
    setShared(false);
  }, [purchase]);

  if (!purchase) return null;

  async function handleShare() {
    setShared(true);
    onShared?.();

    const text = `🎟️ 용돈 쿠폰 발급!\n라온이님이 "${purchase.name}"을(를) 받았어요!\n${purchase.amount.toLocaleString()}원 용돈으로 바꿔주세요!\n(라온이의 독서 노트)`;
    let file = null;
    try {
      const blob = await buildCouponImage(purchase);
      if (blob) file = new File([blob], 'coupon.png', { type: 'image/png' });
    } catch (err) {
      console.error('쿠폰 이미지 생성 실패:', err);
    }

    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], text }).catch(() => {});
    } else if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'coupon.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
      alert('이 브라우저는 바로 공유가 안 돼서, 쿠폰 이미지를 다운로드하고 문구는 클립보드에 복사해뒀어요!');
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('공유 기능이 없는 환경이라 대신 클립보드에 복사했어요!');
      }).catch(() => alert(text));
    } else {
      alert(text);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box coupon-box" onClick={(e) => e.stopPropagation()} ref={canvasWrapRef}>
        <div className="coupon-card">
          <div className="coupon-card__badge">🎟️ 용돈 쿠폰 발급!</div>
          <div className="coupon-card__icon">{purchase.icon}</div>
          <div className="coupon-card__name">라온이님이</div>
          <div className="coupon-card__amount">{purchase.amount.toLocaleString()}원</div>
          <div className="coupon-card__msg">
            포인트 {purchase.price}P 사용 · 용돈으로 바꿔주세요!
          </div>
          <div className="coupon-card__date">{purchase.date}</div>
          <div className="coupon-card__footer">라온이의 독서 노트</div>
        </div>
        <div className="coupon-box__actions">
          <button className="home-btn" onClick={handleShare} disabled={shared}>
            {shared ? '공유 완료 ✅' : '💬 공유하기'}
          </button>
          <button className="home-btn home-btn--ghost" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
