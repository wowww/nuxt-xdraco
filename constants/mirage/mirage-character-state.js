const MirageCharacterState = Object.freeze({
  EMPTY_SLOT: -1, // 슬롯이 비어있음
  READY: 0, // 대기
  ENLISTED: 1, // 출전
  INJURED_SLIGHTLY: 3, // 경상
  INJURED_SERIOUSLY: 7, // 중상
  INJURED_CRITICALLY: 14, // 치명상
});

export const stateTitle = Object.freeze({
  [MirageCharacterState.ENLISTED]: 'Roster',
  [MirageCharacterState.INJURED_SLIGHTLY]: 'Slightly Injured',
  [MirageCharacterState.INJURED_SERIOUSLY]: 'Seriously Injured',
  [MirageCharacterState.INJURED_CRITICALLY]: 'Critically Injured',
});

export default MirageCharacterState;
