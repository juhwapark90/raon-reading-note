import { useState } from 'react';
import { CHARACTER_SLOTS, CHARACTER_ITEMS } from '../data/characterItems';
import { isCharacterItemOwned, walletBalance } from '../lib/progressUtils';
import CharacterView from './CharacterView';

export default function CharacterShopView({ catalog, progress, isChild, onBuy, onEquip, onUnequip }) {
  const [activeSlot, setActiveSlot] = useState(CHARACTER_SLOTS[0].key);
  const balance = walletBalance(catalog, progress);
  const equipped = progress.character?.equipped || {};

  const items = CHARACTER_ITEMS.filter((i) => i.slot === activeSlot);

  return (
    <section className="section-view">
      <header className="section-view__header">
        <h2>
          <span className="section-view__emoji">✨</span> 캐릭터 꾸미기
        </h2>
        <p className="section-view__subtitle">포인트로 라온이 캐릭터를 꾸며보세요!</p>
        <div className="shop-wallet">
          💰 보유 포인트 <strong>{balance}P</strong>
        </div>
      </header>

      <div className="character-shop__preview">
        <CharacterView equipped={equipped} size={160} />
      </div>

      <div className="section-view__filters character-shop__tabs">
        {CHARACTER_SLOTS.map((slot) => (
          <button
            key={slot.key}
            className={`chip${activeSlot === slot.key ? ' chip--active' : ''}`}
            onClick={() => setActiveSlot(slot.key)}
          >
            {slot.emoji} {slot.label}
          </button>
        ))}
      </div>

      {equipped[activeSlot] && (
        <button className="character-shop__unequip" onClick={() => onUnequip(activeSlot)}>
          기본으로 되돌리기
        </button>
      )}

      <div className="shop-item-grid">
        {items.map((item) => {
          const owned = isCharacterItemOwned(progress, item.id);
          const isEquipped = equipped[activeSlot] === item.id;
          const canBuy = isChild && balance >= item.price;

          let label = `구매 (${item.price}P)`;
          let disabled = false;
          let action = () => onBuy(item);

          if (isEquipped) {
            label = '장착 중';
            disabled = true;
          } else if (owned) {
            label = '장착하기';
            action = () => onEquip(item);
          } else if (!isChild) {
            label = '라온이만 구매할 수 있어요';
            disabled = true;
          } else if (!canBuy) {
            label = `포인트 부족 (${item.price}P)`;
            disabled = true;
          }

          return (
            <div key={item.id} className={`shop-item-card${isEquipped ? ' shop-item-card--equipped' : ''}`}>
              <div className="character-item-preview">
                <CharacterView equipped={{ ...equipped, [activeSlot]: item.id }} size={72} />
              </div>
              <div className="shop-item-card__name">{item.name}</div>
              <button className="shop-item-card__btn" disabled={disabled} onClick={action}>
                {label}
              </button>
            </div>
          );
        })}
      </div>

      <p className="character-shop__credit">
        캐릭터 아트: DiceBear "Adventurer" 스타일 (CC BY 4.0, ⓒ Lisa Wischofsky) ·{' '}
        <a href="https://www.dicebear.com/styles/adventurer/" target="_blank" rel="noreferrer">
          dicebear.com
        </a>
      </p>
    </section>
  );
}
