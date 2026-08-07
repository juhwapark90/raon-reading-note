// Point -> allowance conversion tiers. Higher tiers give a better won/point
// rate, same "save up for a better deal" shape as the reference app's
// physical-reward shop.
export const COUPON_ITEMS = [
  { id: 'coupon-1000', name: '용돈 1,000원 쿠폰', icon: '🎟️', price: 100, amount: 1000 },
  { id: 'coupon-5000', name: '용돈 5,000원 쿠폰', icon: '🎫', price: 400, amount: 5000 },
  { id: 'coupon-8000', name: '용돈 8,000원 쿠폰', icon: '💵', price: 600, amount: 8000 },
  { id: 'coupon-10000', name: '용돈 10,000원 쿠폰', icon: '💰', price: 750, amount: 10000 },
];
