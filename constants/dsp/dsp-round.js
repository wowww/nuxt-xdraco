export const RoundState = Object.freeze({
  STAKING: 0,
  ONGOING: 1,
  UPCOMING: 2,
  CLOSED: 3,
  MY: 4,
});

export const defaultItem = () => {
  return {
    name: '',
    itemPath: '',
    grade: 1, // 1-일반, 2-고급, 3-희귀, 4-영웅, 5-전설
    tier: 1,
    enhance: 0,
    class: 1, // 1:전사, 2:술사, 3:도사, 4:석궁사, 5:무사
    itemType: 1, // 1:주무기 / 2:상의 / 3:하의 / 4:장갑 / 5:신발 / 6:목걸이 / 7:팔찌 / 8:반지 / 9:귀걸이 / 10:보조무기 / 11:정령보물 / 12 상자 - General Ring 을 표현하기위한 구분값
    powerScore: 0,
    options: [
      {
        optionName: 'HP',
        optionValue: '2501',
      },
    ],
    randomOptions: [
      {
        optionName: 'HP',
        optionValue: '2501',
      },
    ],
    passiveOption: {
      // 옵션정보가 1개도 없을경우 커스텀 내용을 출력 https://docs.google.com/presentation/d/1oF7m04XJ-G42q_lT8uElp64RBRQx8KvEfrHsUARcY28/edit#slide=id.gf3722493c0_0_16
      title: '커스텀정보',
      desc: '커스텀옵션내용',
      name: '',
    },
    itemNote: '',
  };
};

export const defaultRound = () => {
  return {
    roundNum: 0,
    roundName: '',
    minStakeAmount: 0, // 최소 스테이크 수
    totalStake: 0, // 현재 라운딩에  총 스테이크 수
    joinedParticipants: 0, // 참여자수
    odds: 0.0, // 1드레이코당 확률
    timeStamp: 0, // 현재서버시간 timestamp //시간계산하기 편하신 구조로 요청주세요. 서버에서 시간을 꼐산해서 줘도됩니다.
    preStartDate: 0, // timestamp
    startDate: 0, // timestamp
    endDate: 0, // timestamp
    fee: 1, // 수수료
    item: defaultItem(),
    winner: {
      characterName: 'draco01',
      worldName: 'ASIA123',
      class: 1, // 1:전사, 2:술사, 3:도사, 4:석궁사, 5:무사, 캐릭터이미지띄울때사용
      odds: 15.13004,
      stake: 12312, // 위너 스테이크수
    },
    myinfo: {
      stake: 100,
      odds: 0.1221,
      reward: 0.000232,
      rewarded: 0,
      state: 0,
      currentStake: 100, // 내가 현재까지 넣은 스테이크 수. 0이아니면 Stake More로 표기
      currentOdds: 0.1123, // 현재까지 넣은 금액의 확률 ///추가스테이크시 추가되는 확률은 변동해야하므로 라운드정보의 odds * 추가예치할draco로 계산해서 표기
      prevStake: 100, // 내가 직전에 넣은 스테이크 수 (Stake More에서 prevStake+최소예치금액(minStakeAmount)로 자동입력될때 필요). 계산한값보다 적게 입력시 오류표기
      prevStakeDT: 1319231200, // timestamp UTC+0 ,직전스테이크 시간(24시간이 지났으면 more 활성화)
    },
  };
};
