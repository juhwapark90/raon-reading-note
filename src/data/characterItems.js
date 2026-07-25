// Character dress-up items rendered from the Liberated Pixel Cup "Universal LPC
// Spritesheet Character Generator" (https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator),
// an open-source (CC-BY-SA 3.0 / GPL 3.0) pixel-art asset set. Each PNG here is a
// single isolated frame captured from that generator's own renderer, so colors
// come from its built-in palettes - see CREDITS.md for full per-item attribution.

export const CHARACTER_SLOTS = [
  { key: 'hair', label: '헤어스타일', emoji: '💇‍♀️' },
  { key: 'top', label: '상의/원피스', emoji: '👗' },
  { key: 'bottom', label: '하의', emoji: '👖' },
  { key: 'shoes', label: '신발', emoji: '👟' },
  { key: 'hat', label: '모자', emoji: '🎩' },
  { key: 'earrings', label: '액세서리', emoji: '💎' },
];

export const CHARACTER_ITEMS = [
  { id: 'hair-pigtails-pink', slot: 'hair', name: '삐삐머리 (핑크)', file: 'hair-pigtails-pink.png', price: 40 },
  { id: 'hair-bunches-blonde', slot: 'hair', name: '양갈래 번치 (금발)', file: 'hair-bunches-blonde.png', price: 40 },
  { id: 'hair-ponytail-brown', slot: 'hair', name: '포니테일 (갈색)', file: 'hair-ponytail-brown.png', price: 50 },
  { id: 'hair-long-black', slot: 'hair', name: '긴 생머리 (검정)', file: 'hair-long-black.png', price: 50 },
  { id: 'hair-bob-red', slot: 'hair', name: '단발머리 (빨강)', file: 'hair-bob-red.png', price: 40 },
  { id: 'hair-braid-platinum', slot: 'hair', name: '땋은머리 (은발)', file: 'hair-braid-platinum.png', price: 60 },

  { id: 'top-bodice-pink', slot: 'top', name: '보디스 원피스 (핑크)', file: 'top-bodice-pink.png', price: 70 },
  { id: 'top-sash-sky', slot: 'top', name: '새시 원피스 (하늘)', file: 'top-sash-sky.png', price: 70 },
  { id: 'top-slit-purple', slot: 'top', name: '슬릿 원피스 (보라)', file: 'top-slit-purple.png', price: 80 },
  { id: 'top-blouse-yellow', slot: 'top', name: '블라우스 (노랑)', file: 'top-blouse-yellow.png', price: 60 },

  { id: 'bottom-belle-pink', slot: 'bottom', name: '벨 스커트 (핑크)', file: 'bottom-belle-pink.png', price: 50 },
  { id: 'bottom-plain-red', slot: 'bottom', name: '플레인 스커트 (빨강)', file: 'bottom-plain-red.png', price: 40 },
  { id: 'bottom-pants-navy', slot: 'bottom', name: '팬츠 (네이비)', file: 'bottom-pants-navy.png', price: 40 },

  { id: 'shoes-basic-brown', slot: 'shoes', name: '기본 신발 (갈색)', file: 'shoes-basic-brown.png', price: 30 },
  { id: 'shoes-basic-black', slot: 'shoes', name: '기본 신발 (검정)', file: 'shoes-basic-black.png', price: 30 },

  { id: 'hat-bonnie-pink', slot: 'hat', name: '보닛 모자 (핑크)', file: 'hat-bonnie-pink.png', price: 50 },
  { id: 'hat-bonnie-white', slot: 'hat', name: '보닛 모자 (하양)', file: 'hat-bonnie-white.png', price: 50 },

  { id: 'earrings-princess-purple', slot: 'earrings', name: '프린세스 귀걸이 (보라)', file: 'earrings-princess-purple.png', price: 35 },
  { id: 'earrings-princess-red', slot: 'earrings', name: '프린세스 귀걸이 (빨강)', file: 'earrings-princess-red.png', price: 35 },
  { id: 'earrings-stud-gold', slot: 'earrings', name: '스터드 귀걸이 (골드)', file: 'earrings-stud-gold.png', price: 35 },
];

export function getCharacterItem(id) {
  return CHARACTER_ITEMS.find((i) => i.id === id);
}
