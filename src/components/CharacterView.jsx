import { useEffect, useRef } from 'react';
import { CHARACTER_ITEMS, DEFAULT_FACE_ID } from '../data/characterItems';

const ASSET_MODULES = import.meta.glob('../assets/character/*.png', { eager: true, import: 'default' });

function assetUrl(file) {
  const match = Object.entries(ASSET_MODULES).find(([path]) => path.endsWith('/' + file));
  return match ? match[1] : null;
}

// "face" is the base layer (skin tone + eyes); the rest stack on top of it
// in this order, later layers drawing over earlier ones.
const LAYER_ORDER = ['face', 'bottom', 'shoes', 'top', 'earrings', 'hair', 'hat'];

async function loadImage(src) {
  const img = new Image();
  img.src = src;
  await img.decode();
  return img;
}

export default function CharacterView({ equipped, size = 128 }) {
  const canvasRef = useRef(null);

  const layerSrcs = LAYER_ORDER.map((slot) => (slot === 'face' ? equipped?.face || DEFAULT_FACE_ID : equipped?.[slot]))
    .filter(Boolean)
    .map((itemId) => CHARACTER_ITEMS.find((i) => i.id === itemId))
    .filter(Boolean)
    .map((item) => assetUrl(item.file));

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    Promise.all(layerSrcs.map(loadImage)).then((imgs) => {
      if (cancelled) return;
      ctx.clearRect(0, 0, 64, 64);
      for (const img of imgs) {
        ctx.drawImage(img, 0, 0, 64, 64);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [layerSrcs.join('|')]);

  return (
    <canvas
      ref={canvasRef}
      width={64}
      height={64}
      className="character-view"
      style={{ width: size, height: size }}
    />
  );
}
