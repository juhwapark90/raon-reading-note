// Character dress-up items rendered from the Liberated Pixel Cup "Universal LPC
// Spritesheet Character Generator" (https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator),
// an open-source (CC-BY-SA 3.0 / GPL 3.0 / CC0) pixel-art asset set. Each PNG
// here is a single front-facing ("Idle", south-facing) frame captured from
// that generator's own renderer - see CREDITS.md for full per-item attribution.

export const DEFAULT_FACE_ID = 'face-default';

export const CHARACTER_SLOTS = [
  { key: 'face', label: '피부/눈', emoji: '🙂' },
  { key: 'hair', label: '헤어스타일', emoji: '💇‍♀️' },
  { key: 'top', label: '상의/원피스', emoji: '👗' },
  { key: 'bottom', label: '하의', emoji: '👖' },
  { key: 'shoes', label: '신발', emoji: '👟' },
  { key: 'hat', label: '모자', emoji: '🎩' },
  { key: 'earrings', label: '액세서리', emoji: '💎' },
];

export const CHARACTER_ITEMS = [
  // face presets (skin tone + eye color combined) - the "기본" one is free
  // and always owned, since it's also the base layer under everything else.
  { id: 'face-default', slot: 'face', name: '기본', file: 'face-default.png', price: 0 },
  { id: 'face-amber-blue', slot: 'face', name: '살구빛 피부 + 파란 눈', file: 'face-amber-blue.png', price: 25 },
  { id: 'face-olive-green', slot: 'face', name: '올리브 피부 + 초록 눈', file: 'face-olive-green.png', price: 25 },
  { id: 'face-bronze-brown', slot: 'face', name: '브론즈 피부 + 갈색 눈', file: 'face-bronze-brown.png', price: 25 },
  { id: 'face-brown-brown', slot: 'face', name: '갈색 피부 + 갈색 눈', file: 'face-brown-brown.png', price: 25 },
  { id: 'face-black', slot: 'face', name: '다크 피부', file: 'face-black.png', price: 25 },
  { id: 'face-light-purple', slot: 'face', name: '밝은 피부 + 보라 눈', file: 'face-light-purple.png', price: 25 },
  { id: 'face-light-gray', slot: 'face', name: '밝은 피부 + 회색 눈', file: 'face-light-gray.png', price: 25 },

  { id: 'hair-pigtails-pink', slot: 'hair', name: '삐삐머리 (핑크)', file: 'hair-pigtails-pink.png', price: 40 },
  { id: 'hair-bunches-blonde', slot: 'hair', name: '양갈래 번치 (금발)', file: 'hair-bunches-blonde.png', price: 40 },
  { id: 'hair-bunches-pink', slot: 'hair', name: '양갈래 번치 (핑크)', file: 'hair-bunches-pink.png', price: 40 },
  { id: 'hair-ponytail-brown', slot: 'hair', name: '포니테일 (갈색)', file: 'hair-ponytail-brown.png', price: 50 },
  { id: 'hair-ponytail-red', slot: 'hair', name: '포니테일 (빨강)', file: 'hair-ponytail-red.png', price: 50 },
  { id: 'hair-long-black', slot: 'hair', name: '긴 생머리 (검정)', file: 'hair-long-black.png', price: 50 },
  { id: 'hair-long-blonde', slot: 'hair', name: '긴 생머리 (금발)', file: 'hair-long-blonde.png', price: 50 },
  { id: 'hair-bob-red', slot: 'hair', name: '단발머리 (빨강)', file: 'hair-bob-red.png', price: 40 },
  { id: 'hair-bob-black', slot: 'hair', name: '단발머리 (검정)', file: 'hair-bob-black.png', price: 40 },
  { id: 'hair-braid-platinum', slot: 'hair', name: '땋은머리 (은발)', file: 'hair-braid-platinum.png', price: 60 },
  { id: 'hair-braid-brown', slot: 'hair', name: '땋은머리 (갈색)', file: 'hair-braid-brown.png', price: 60 },
  { id: 'hair-pixie-brown', slot: 'hair', name: '픽시컷 (갈색)', file: 'hair-pixie-brown.png', price: 45 },
  { id: 'hair-curly-black', slot: 'hair', name: '긴 곱슬머리 (검정)', file: 'hair-curly-black.png', price: 55 },
  { id: 'hair-wavy-brown', slot: 'hair', name: '웨이브 머리 (갈색)', file: 'hair-wavy-brown.png', price: 55 },

  { id: 'top-bodice-pink', slot: 'top', name: '보디스 원피스 (핑크)', file: 'top-bodice-pink.png', price: 70 },
  { id: 'top-bodice-sky', slot: 'top', name: '보디스 원피스 (하늘)', file: 'top-bodice-sky.png', price: 70 },
  { id: 'top-bodice-white', slot: 'top', name: '보디스 원피스 (하양)', file: 'top-bodice-white.png', price: 70 },
  { id: 'top-sash-sky', slot: 'top', name: '새시 원피스 (하늘)', file: 'top-sash-sky.png', price: 70 },
  { id: 'top-sash-pink', slot: 'top', name: '새시 원피스 (핑크)', file: 'top-sash-pink.png', price: 70 },
  { id: 'top-slit-purple', slot: 'top', name: '슬릿 원피스 (보라)', file: 'top-slit-purple.png', price: 80 },
  { id: 'top-slit-teal', slot: 'top', name: '슬릿 원피스 (틸)', file: 'top-slit-teal.png', price: 80 },
  { id: 'top-blouse-yellow', slot: 'top', name: '블라우스 (노랑)', file: 'top-blouse-yellow.png', price: 60 },
  { id: 'top-blouse-white', slot: 'top', name: '블라우스 (하양)', file: 'top-blouse-white.png', price: 60 },
  { id: 'top-kimono-red', slot: 'top', name: '기모노 (빨강)', file: 'top-kimono-red.png', price: 75 },

  { id: 'bottom-belle-pink', slot: 'bottom', name: '벨 스커트 (핑크)', file: 'bottom-belle-pink.png', price: 50 },
  { id: 'bottom-belle-purple', slot: 'bottom', name: '벨 스커트 (보라)', file: 'bottom-belle-purple.png', price: 50 },
  { id: 'bottom-plain-red', slot: 'bottom', name: '플레인 스커트 (빨강)', file: 'bottom-plain-red.png', price: 40 },
  { id: 'bottom-plain-blue', slot: 'bottom', name: '플레인 스커트 (파랑)', file: 'bottom-plain-blue.png', price: 40 },
  { id: 'bottom-pants-navy', slot: 'bottom', name: '팬츠 (네이비)', file: 'bottom-pants-navy.png', price: 40 },
  { id: 'bottom-pants-black', slot: 'bottom', name: '팬츠 (검정)', file: 'bottom-pants-black.png', price: 40 },

  { id: 'shoes-basic-brown', slot: 'shoes', name: '기본 신발 (갈색)', file: 'shoes-basic-brown.png', price: 30 },
  { id: 'shoes-basic-black', slot: 'shoes', name: '기본 신발 (검정)', file: 'shoes-basic-black.png', price: 30 },
  { id: 'shoes-basic-white', slot: 'shoes', name: '기본 신발 (하양)', file: 'shoes-basic-white.png', price: 30 },
  { id: 'shoes-boots-brown', slot: 'shoes', name: '부츠 (갈색)', file: 'shoes-boots-brown.png', price: 35 },
  { id: 'shoes-boots-black', slot: 'shoes', name: '부츠 (검정)', file: 'shoes-boots-black.png', price: 35 },

  { id: 'hat-bonnie-pink', slot: 'hat', name: '보닛 모자 (핑크)', file: 'hat-bonnie-pink.png', price: 50 },
  { id: 'hat-bonnie-white', slot: 'hat', name: '보닛 모자 (하양)', file: 'hat-bonnie-white.png', price: 50 },
  { id: 'hat-bonnie-red', slot: 'hat', name: '보닛 모자 (빨강)', file: 'hat-bonnie-red.png', price: 50 },
  { id: 'hat-cavalier-black', slot: 'hat', name: '카발리에 모자 (검정)', file: 'hat-cavalier-black.png', price: 55 },
  { id: 'hat-cavalier-purple', slot: 'hat', name: '카발리에 모자 (보라)', file: 'hat-cavalier-purple.png', price: 55 },

  { id: 'earrings-princess-purple', slot: 'earrings', name: '프린세스 귀걸이 (보라)', file: 'earrings-princess-purple.png', price: 35 },
  { id: 'earrings-princess-red', slot: 'earrings', name: '프린세스 귀걸이 (빨강)', file: 'earrings-princess-red.png', price: 35 },
  { id: 'earrings-princess-blue', slot: 'earrings', name: '프린세스 귀걸이 (파랑)', file: 'earrings-princess-blue.png', price: 35 },
  { id: 'earrings-princess-green', slot: 'earrings', name: '프린세스 귀걸이 (초록)', file: 'earrings-princess-green.png', price: 35 },
  { id: 'earrings-stud-gold', slot: 'earrings', name: '스터드 귀걸이 (골드)', file: 'earrings-stud-gold.png', price: 35 },
  { id: 'earrings-stud-silver', slot: 'earrings', name: '스터드 귀걸이 (실버)', file: 'earrings-stud-silver.png', price: 35 },
];

export function getCharacterItem(id) {
  return CHARACTER_ITEMS.find((i) => i.id === id);
}
