import { useState } from 'react';
import { COUPON_ITEMS } from '../data/shopItems';
import { walletBalance } from '../lib/progressUtils';
import { todayStr } from '../lib/progressUtils';
import CouponPopup from './CouponPopup';

export default function ShopView({ catalog, progress, onBuy, onMarkShared }) {
  const [popupPurchase, setPopupPurchase] = useState(null);
  const balance = walletBalance(catalog, progress);
  const purchases = [...(progress.purchases || [])].reverse();

  function handleBuy(item) {
    if (balance < item.price) return;
    const purchase = {
      id: `purchase-${Date.now()}`,
      itemId: item.id,
      name: item.name,
      icon: item.icon,
      amount: item.amount,
      price: item.price,
      date: todayStr(),
      shared: false,
    };
    onBuy(purchase);
    setPopupPurchase(purchase);
  }

  return (
    <section className="section-view">
      <header className="section-view__header">
        <h2>
          <span className="section-view__emoji">🛍️</span> 상점
        </h2>
        <p className="section-view__subtitle">
          책을 읽으면 1권당 <strong>10P</strong>가 쌓여요. 모은 포인트로 용돈 쿠폰을 받아보세요!
        </p>
        <div className="shop-wallet">💰 보유 포인트 <strong>{balance}P</strong></div>
      </header>

      <div className="shop-item-grid">
        {COUPON_ITEMS.map((item) => {
          const canBuy = balance >= item.price;
          return (
            <div key={item.id} className="shop-item-card">
              <div className="shop-item-card__icon">{item.icon}</div>
              <div className="shop-item-card__name">{item.name}</div>
              <button
                className="shop-item-card__btn"
                disabled={!canBuy}
                onClick={() => handleBuy(item)}
              >
                {canBuy ? `교환 (${item.price}P)` : `포인트 부족 (${item.price}P)`}
              </button>
            </div>
          );
        })}
      </div>

      {purchases.length > 0 && (
        <div className="shop-history">
          <h3>받은 쿠폰</h3>
          <div className="shop-history__list">
            {purchases.map((p) => (
              <div key={p.id} className="shop-history__item">
                <span className="shop-history__icon">{p.icon}</span>
                <span className="shop-history__name">{p.name}</span>
                <span className="shop-history__date">{p.date}</span>
                {p.shared ? (
                  <span className="shop-history__shared">공유 완료 ✅</span>
                ) : (
                  <button className="shop-history__share-btn" onClick={() => setPopupPurchase(p)}>
                    💬 공유하기
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <CouponPopup
        purchase={popupPurchase}
        onClose={() => setPopupPurchase(null)}
        onShared={() => popupPurchase && onMarkShared(popupPurchase.id)}
      />
    </section>
  );
}
