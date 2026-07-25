import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import { CHARACTER_ITEMS, DEFAULT_TRAITS } from '../data/characterItems';

function resolveValue(slot, itemId) {
  const item = CHARACTER_ITEMS.find((i) => i.id === itemId);
  return item?.value;
}

export default function CharacterView({ equipped, size = 128 }) {
  const dataUri = useMemo(() => {
    const hair = resolveValue('hair', equipped?.hair) || DEFAULT_TRAITS.hair;
    const hairColor = resolveValue('hairColor', equipped?.hairColor) || DEFAULT_TRAITS.hairColor;
    const skinColor = resolveValue('skinColor', equipped?.skinColor) || DEFAULT_TRAITS.skinColor;
    const eyes = resolveValue('eyes', equipped?.eyes) || DEFAULT_TRAITS.eyes;
    const eyebrows = resolveValue('eyebrows', equipped?.eyebrows) || DEFAULT_TRAITS.eyebrows;
    const mouth = resolveValue('mouth', equipped?.mouth) || DEFAULT_TRAITS.mouth;
    const glasses = resolveValue('glasses', equipped?.glasses);
    const earrings = resolveValue('earrings', equipped?.earrings);

    const options = {
      seed: 'raon',
      hair: [hair],
      hairColor: [hairColor],
      skinColor: [skinColor],
      eyes: [eyes],
      eyebrows: [eyebrows],
      mouth: [mouth],
      featuresProbability: 0,
      glassesProbability: glasses ? 100 : 0,
      earringsProbability: earrings ? 100 : 0,
    };
    if (glasses) options.glasses = [glasses];
    if (earrings) options.earrings = [earrings];

    return createAvatar(adventurer, options).toDataUri();
  }, [
    equipped?.hair,
    equipped?.hairColor,
    equipped?.skinColor,
    equipped?.eyes,
    equipped?.eyebrows,
    equipped?.mouth,
    equipped?.glasses,
    equipped?.earrings,
  ]);

  return (
    <img
      src={dataUri}
      alt=""
      className="character-view"
      style={{ width: size, height: size }}
    />
  );
}
