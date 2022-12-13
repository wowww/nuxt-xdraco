const CharacterClass = Object.freeze({
  // 전체
  ALL: 0,

  // 전사
  WARRIOR: 1,

  // 술사
  SORCERER: 2,

  // 도사
  TAOIST: 3,

  // 석궁사
  ARBALIST: 4,

  // 무사
  LANCER: 5,
});

export const CharacterClassList = Object.freeze([
  CharacterClass.WARRIOR,
  CharacterClass.SORCERER,
  CharacterClass.TAOIST,
  CharacterClass.LANCER,
  CharacterClass.ARBALIST,
]);

export const findKey = (value) => {
  const [key] = Object.entries(CharacterClass).find(([_, v]) => v === Number(value)) || [];
  return key;
};

export const findLowercaseKey = (value) => {
  const key = findKey(value);
  return key ? key.toLowerCase() : key;
};

export const createCharacterInfo = (klass) => {
  return {
    grade: 1,
    tokenID: '',
    CharacterUID: '',
    CharacterName: '',
    Class: klass,
    CombatPoint: '0',
    MirageScore: '',
    MiraX: '0',
    Reinforce: '0',
    SanctuaryOfHydraLevel: '0',
    ContentType: '0',
    WorldUID: '0',
    DetailType: '0',
    BuffType: '',
    State: -1, // 0: Ready, 1: Stake,  3: 경상, 7 : 중상, 14: 치명상
    CreatedDT: 0,
    RestDT: 0,
    ExpireDT: 0,
  };
};

export default CharacterClass;
