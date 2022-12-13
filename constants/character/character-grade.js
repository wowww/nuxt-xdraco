const CharacterGrade = Object.freeze({
  NONE: 0,
  COMMON: 1,
  UNCOMMON: 2,
  RARE: 3,
  EPIC: 4,
  LEGENDARY: 5,
});

export const findKey = (value) => {
  const [key] = Object.entries(CharacterGrade).find(([_, v]) => v === value) || [];
  return key;
};

const GradeRange = {
  [CharacterGrade.COMMON]: [0, 100000],
  [CharacterGrade.UNCOMMON]: [100000, 135000],
  [CharacterGrade.RARE]: [135000, 170000],
  [CharacterGrade.EPIC]: [170000, 205000],
  [CharacterGrade.LEGENDARY]: [205000, Infinity],
};

export const calcByPowerScore = (value) => {
  const [grade] =
    Object.entries(GradeRange).find(([_, [min, max]]) => {
      return min <= value && value < max;
    }) || [];
  return Number(grade || CharacterGrade.COMMON);
};

export default CharacterGrade;
