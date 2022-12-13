const CharacterEquipmentSlot = Object.freeze({
  WEAPON: 1,
  NECKLACE: 2,
  BRACELET: 3,
  RING: 4,
  TOP: 5,
  PANTS: 6,
  GLOVES: 7,
  SHOES: 8,
  SUBWEAPON: 9,
  EARRING: 10,
});

export const findKey = (value) => {
  const [key] = Object.entries(CharacterEquipmentSlot).find(([_, v]) => v === value) || [];
  return key;
};

export const orderedSlots = [
  CharacterEquipmentSlot.WEAPON,
  CharacterEquipmentSlot.SUBWEAPON,
  CharacterEquipmentSlot.TOP,
  CharacterEquipmentSlot.PANTS,
  CharacterEquipmentSlot.GLOVES,
  CharacterEquipmentSlot.SHOES,
  CharacterEquipmentSlot.BRACELET,
  CharacterEquipmentSlot.NECKLACE,
  CharacterEquipmentSlot.RING,
  CharacterEquipmentSlot.EARRING,
];

export default CharacterEquipmentSlot;
