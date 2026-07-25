// Character customization is powered by DiceBear's "Adventurer" style
// (https://www.dicebear.com/styles/adventurer/, CC BY 4.0, created by Lisa
// Wischofsky). Each item here is a value for one independent trait (hair
// style, hair color, eyes, eyebrows, mouth, skin tone, glasses, earrings) -
// DiceBear renders the combination as a vector avatar at runtime, so there
// are no pre-made images to manage.

export const DEFAULT_TRAITS = {
  hair: 'long01',
  hairColor: '6a4e35',
  skinColor: 'f2d3b1',
  eyes: 'variant05',
  eyebrows: 'variant03',
  mouth: 'variant01',
};

export const CHARACTER_SLOTS = [
  { key: 'hair', label: '헤어스타일', emoji: '💇‍♀️' },
  { key: 'hairColor', label: '헤어 색상', emoji: '🎨' },
  { key: 'skinColor', label: '피부색', emoji: '🖐️' },
  { key: 'eyes', label: '눈', emoji: '👀' },
  { key: 'eyebrows', label: '눈썹', emoji: '〰️' },
  { key: 'mouth', label: '입', emoji: '👄' },
  { key: 'glasses', label: '안경', emoji: '🕶️' },
  { key: 'earrings', label: '귀걸이', emoji: '💎' },
];

export const CHARACTER_ITEMS = [
  // --- hair styles ---
  { id: 'hair-short01', slot: 'hair', name: '짧은 단발 1', value: 'short01', price: 40 },
  { id: 'hair-short05', slot: 'hair', name: '짧은 웨이브', value: 'short05', price: 40 },
  { id: 'hair-short10', slot: 'hair', name: '짧은 컬', value: 'short10', price: 40 },
  { id: 'hair-short14', slot: 'hair', name: '뾰족 단발', value: 'short14', price: 40 },
  { id: 'hair-short18', slot: 'hair', name: '양갈래 번치', value: 'short18', price: 45 },
  { id: 'hair-long01', slot: 'hair', name: '둥근 번 머리', value: 'long01', price: 45 },
  { id: 'hair-long05', slot: 'hair', name: '풍성한 웨이브', value: 'long05', price: 50 },
  { id: 'hair-long10', slot: 'hair', name: '탑 번 머리', value: 'long10', price: 45 },
  { id: 'hair-long13', slot: 'hair', name: '리본 삐삐머리', value: 'long13', price: 50 },
  { id: 'hair-long17', slot: 'hair', name: '옆으로 웨이브', value: 'long17', price: 50 },
  { id: 'hair-long20', slot: 'hair', name: '긴 웨이브', value: 'long20', price: 55 },
  { id: 'hair-long24', slot: 'hair', name: '단발 웨이브', value: 'long24', price: 50 },

  // --- hair colors ---
  { id: 'haircolor-ac6511', slot: 'hairColor', name: '오번', value: 'ac6511', price: 25 },
  { id: 'haircolor-cb6820', slot: 'hairColor', name: '오렌지', value: 'cb6820', price: 25 },
  { id: 'haircolor-ab2a18', slot: 'hairColor', name: '빨강', value: 'ab2a18', price: 25 },
  { id: 'haircolor-e5d7a3', slot: 'hairColor', name: '연한 금발', value: 'e5d7a3', price: 20 },
  { id: 'haircolor-b9a05f', slot: 'hairColor', name: '금발', value: 'b9a05f', price: 20 },
  { id: 'haircolor-796a45', slot: 'hairColor', name: '애쉬 브라운', value: '796a45', price: 20 },
  { id: 'haircolor-562306', slot: 'hairColor', name: '다크 브라운', value: '562306', price: 20 },
  { id: 'haircolor-0e0e0e', slot: 'hairColor', name: '검정', value: '0e0e0e', price: 20 },
  { id: 'haircolor-afafaf', slot: 'hairColor', name: '실버 그레이', value: 'afafaf', price: 25 },
  { id: 'haircolor-3eac2c', slot: 'hairColor', name: '초록', value: '3eac2c', price: 30 },
  { id: 'haircolor-85c2c6', slot: 'hairColor', name: '민트', value: '85c2c6', price: 30 },
  { id: 'haircolor-dba3be', slot: 'hairColor', name: '핑크', value: 'dba3be', price: 30 },
  { id: 'haircolor-592454', slot: 'hairColor', name: '보라', value: '592454', price: 30 },

  // --- skin tones ---
  { id: 'skin-ecad80', slot: 'skinColor', name: '살구빛 피부', value: 'ecad80', price: 20 },
  { id: 'skin-9e5622', slot: 'skinColor', name: '갈색 피부', value: '9e5622', price: 20 },
  { id: 'skin-763900', slot: 'skinColor', name: '다크 피부', value: '763900', price: 20 },

  // --- eyes ---
  { id: 'eyes-variant01', slot: 'eyes', name: '눈 스타일 1', value: 'variant01', price: 20 },
  { id: 'eyes-variant03', slot: 'eyes', name: '눈 스타일 2', value: 'variant03', price: 20 },
  { id: 'eyes-variant07', slot: 'eyes', name: '눈 스타일 3', value: 'variant07', price: 20 },
  { id: 'eyes-variant09', slot: 'eyes', name: '반짝이는 눈', value: 'variant09', price: 20 },
  { id: 'eyes-variant11', slot: 'eyes', name: '눈 스타일 4', value: 'variant11', price: 20 },
  { id: 'eyes-variant14', slot: 'eyes', name: '큰 눈', value: 'variant14', price: 20 },
  { id: 'eyes-variant17', slot: 'eyes', name: '눈 스타일 5', value: 'variant17', price: 20 },
  { id: 'eyes-variant20', slot: 'eyes', name: '윙크 눈', value: 'variant20', price: 20 },
  { id: 'eyes-variant24', slot: 'eyes', name: '눈 스타일 6', value: 'variant24', price: 20 },

  // --- eyebrows ---
  { id: 'eyebrows-variant01', slot: 'eyebrows', name: '눈썹 1', value: 'variant01', price: 15 },
  { id: 'eyebrows-variant05', slot: 'eyebrows', name: '눈썹 2', value: 'variant05', price: 15 },
  { id: 'eyebrows-variant07', slot: 'eyebrows', name: '눈썹 3', value: 'variant07', price: 15 },
  { id: 'eyebrows-variant09', slot: 'eyebrows', name: '눈썹 4', value: 'variant09', price: 15 },
  { id: 'eyebrows-variant12', slot: 'eyebrows', name: '눈썹 5', value: 'variant12', price: 15 },

  // --- mouth ---
  { id: 'mouth-variant04', slot: 'mouth', name: '살짝 미소', value: 'variant04', price: 20 },
  { id: 'mouth-variant05', slot: 'mouth', name: '활짝 웃음', value: 'variant05', price: 25 },
  { id: 'mouth-variant09', slot: 'mouth', name: '립스틱 미소', value: 'variant09', price: 25 },
  { id: 'mouth-variant11', slot: 'mouth', name: '놀란 입', value: 'variant11', price: 20 },
  { id: 'mouth-variant17', slot: 'mouth', name: '수줍은 미소', value: 'variant17', price: 20 },
  { id: 'mouth-variant19', slot: 'mouth', name: '차분한 입', value: 'variant19', price: 20 },
  { id: 'mouth-variant22', slot: 'mouth', name: '함박 웃음', value: 'variant22', price: 25 },
  { id: 'mouth-variant24', slot: 'mouth', name: '이빨 웃음', value: 'variant24', price: 25 },
  { id: 'mouth-variant26', slot: 'mouth', name: '방긋 웃음', value: 'variant26', price: 20 },
  { id: 'mouth-variant28', slot: 'mouth', name: '메롱', value: 'variant28', price: 25 },
  { id: 'mouth-variant30', slot: 'mouth', name: '활짝 함박웃음', value: 'variant30', price: 25 },

  // --- glasses ---
  { id: 'glasses-variant01', slot: 'glasses', name: '선글라스', value: 'variant01', price: 30 },
  { id: 'glasses-variant02', slot: 'glasses', name: '동그란 안경', value: 'variant02', price: 30 },
  { id: 'glasses-variant03', slot: 'glasses', name: '안경 스타일 3', value: 'variant03', price: 30 },
  { id: 'glasses-variant04', slot: 'glasses', name: '안경 스타일 4', value: 'variant04', price: 30 },
  { id: 'glasses-variant05', slot: 'glasses', name: '안경 스타일 5', value: 'variant05', price: 30 },

  // --- earrings ---
  { id: 'earrings-variant01', slot: 'earrings', name: '귀걸이 1', value: 'variant01', price: 25 },
  { id: 'earrings-variant02', slot: 'earrings', name: '귀걸이 2', value: 'variant02', price: 25 },
  { id: 'earrings-variant03', slot: 'earrings', name: '귀걸이 3', value: 'variant03', price: 25 },
  { id: 'earrings-variant04', slot: 'earrings', name: '귀걸이 4', value: 'variant04', price: 25 },
  { id: 'earrings-variant05', slot: 'earrings', name: '귀걸이 5', value: 'variant05', price: 25 },
  { id: 'earrings-variant06', slot: 'earrings', name: '귀걸이 6', value: 'variant06', price: 25 },
];

export function getCharacterItem(id) {
  return CHARACTER_ITEMS.find((i) => i.id === id);
}
