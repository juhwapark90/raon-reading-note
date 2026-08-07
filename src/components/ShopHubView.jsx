import { useState } from 'react';
import ShopView from './ShopView';
import CharacterShopView from './CharacterShopView';

export default function ShopHubView({
  catalog,
  progress,
  isChild,
  onBuyCoupon,
  onMarkShared,
  onRefundCoupon,
  onBuyCharacter,
  onEquipCharacter,
  onUnequipCharacter,
}) {
  const [tab, setTab] = useState('coupon');

  return (
    <div>
      <div className="section-view__filters shop-hub__tabs">
        <button
          className={`chip${tab === 'coupon' ? ' chip--active' : ''}`}
          onClick={() => setTab('coupon')}
        >
          🎟️ 용돈 쿠폰
        </button>
        <button
          className={`chip${tab === 'character' ? ' chip--active' : ''}`}
          onClick={() => setTab('character')}
        >
          ✨ 캐릭터 꾸미기
        </button>
      </div>

      {tab === 'coupon' ? (
        <ShopView
          catalog={catalog}
          progress={progress}
          isChild={isChild}
          onBuy={onBuyCoupon}
          onMarkShared={onMarkShared}
          onRefund={onRefundCoupon}
        />
      ) : (
        <CharacterShopView
          catalog={catalog}
          progress={progress}
          isChild={isChild}
          onBuy={onBuyCharacter}
          onEquip={onEquipCharacter}
          onUnequip={onUnequipCharacter}
        />
      )}
    </div>
  );
}
