<template>
  <div class="card-content">
    <div class="wrap-list">
      <div class="notice">{{ $t('s.rounds.message.select-character') }}</div>
      <div class="list-header">
        <div v-if="worldNames.length > 0" class="server-select">
          <v-select
            v-model="selectedWorldName"
            class="select"
            :items="worldNames"
            outlined
            dense
            :menu-props="{ bottom: true, offsetY: true, contentClass: 'select-menu' }"
            @change="changeChannel"
          ></v-select>
        </div>
        <div class="server-update">
          <button type="button" class="btn-update" @click="fetchChannelUserCharacter">
            <em>{{ $t('w.account.update.info') }}</em>
          </button>
        </div>
      </div>
      <div class="iscroll">
        <ul class="list">
          <li v-if="loading">
            <div :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
              <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
            </div>
          </li>
          <template v-else>
            <winner-character-item
              v-for="(character, idx) in characters.filter((item) => item.lv >= 40)"
              :key="`my-character-${idx}`"
              :character="character"
              :selected="character.characterUID === selectedCharacterUID"
              @select-character="selectCharacter"
            />
          </template>
        </ul>
      </div>
    </div>
    <div class="wrap-button">
      <button type="button" class="btn btn-primary2" :disabled="winLoading" @click="reward">
        <v-progress-circular v-if="winLoading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate></v-progress-circular>
        <template v-else>
          {{ $t('w.rounds.receive.item') }}
        </template>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import { createNamespacedHelpers, useMutations, useState } from 'vuex-composition-helpers/dist';

import WinnerCharacterItem from '@/components/dsp/round/modal/WinnerCharacterItem';
import { defaultRound } from '@/constants/dsp/dsp-round';
import { useWemixLogin } from '@/utils/composables/round';

const { useState: useAccountState, useGetters, useMutations: useAccountMutations, useActions } = createNamespacedHelpers('account');
const { useMutations: useDspMutations, useActions: useDspActions } = createNamespacedHelpers('dsp');

export default defineComponent({
  name: 'WinnerCharacterSelector',
  components: { WinnerCharacterItem },
  props: {
    round: {
      type: Object,
      default: () => defaultRound(),
    },
  },
  setup({ round }, { root }) {
    const { $wemix, $store } = root;
    const { wemixLogin } = useWemixLogin(root);
    const winLoading = ref(false);
    const selectedCharacterUID = ref();
    const { accessToken } = useState(['accessToken']);

    const { open, active, loading, worldNames, selectedWorldName } = useAccountState([
      'open',
      'active',
      'loading',
      'worldNames',
      'selectedWorldName',
    ]);
    const { characters } = useGetters(['characters']);
    const { setCommonModal } = useMutations(['setCommonModal']);
    const { setSelectedWorldName } = useAccountMutations(['setSelectedWorldName', 'setCommonModal']);
    const { fetchUserCharacter, fetchChannelUserCharacter } = useActions(['fetchUserCharacter', 'fetchChannelUserCharacter']);
    const { fetchRounds } = useDspActions(['fetchRounds']);

    const { setOpenWinner } = useDspMutations(['setOpenWinner']);

    const changeChannel = (value) => {
      setSelectedWorldName(value);
    };

    const selectCharacter = (uid) => {
      selectedCharacterUID.value = uid;
    };

    const alertModal = (title, desc) => {
      setCommonModal({
        open: true,
        title,
        desc,
        primary: 'OK',
      });
    };

    const showErrorModal = (errorResponse) => {
      console.log(errorResponse);
      /**
       * errorCode
       * - 500 : Network Error
       * - 60421 : 월렛 미연동
       * - 60422 : 라운드 조회 실패
       * - 60423 : 라운드 시간 오류
       * - 60424 : 당첨자 아님
       * - 60425 : 캐릭터 검색 안됨
       * - 60426 : 캐릭터 정보 미일치
       * - 60427 : 보상 라운드 조회 실패
       * - 60428 : 지급 실패
       *
       * - 60411 : Send Error
       * - 60412 : Cache Error
       * - 60413 : TX Registration Error
       * - 60621 : DB Error
       */
      const { code: errorCode } = errorResponse;
      const errorTitle = root.$t('t.dsp.reward.failed');
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        case 60421:
          errorMessage = root.$t('s.rounds.event.message.not-linked');
          break;
        default:
          errorMessage = `${root.$t('s.xdraco.common.err.message')}${errorCode ? `(Error Code: ${errorCode})` : ''}`;
          break;
      }

      alertModal(errorTitle, errorMessage);
    };

    const reward = () => {
      if (winLoading.value) {
        return;
      }

      if (!accessToken.value) {
        wemixLogin();
        return;
      }

      if (!selectedCharacterUID.value) return;
      const to = '0x19b750c24a5f2112ffc7fa5d4dbe362b70f33c01'; // wemix().contractAddress("tornado","Mir4DSP")
      const draco = root.$wemix.token('DRACO').address;
      winLoading.value = true;
      $wemix
        .makeUnsignedTx(49, 'tornado', to, draco, 0, 'reward', [`${round.dspID}`, `${selectedCharacterUID.value}`])
        .then((data) => {
          if (data.code !== 200) {
            showErrorModal(data);
            winLoading.value = false;
            return;
          }

          const hashes = data.data.hash;
          const messages = $wemix.requestSignature(hashes);

          $store.dispatch('wemix/sendTransaction', {
            request: messages,
            onSuccess: () => {
              setCommonModal({
                open: true,
                title: root.$t('s.rounds.reward.complete'),
                desc: root.$t('s.rounds.reward.complete.desc'),
                primary: root.$t('w.dsp.common.close'),
                onPrimary() {
                  winLoading.value = false;
                  fetchRounds();
                  setOpenWinner(false);
                },
                onClose() {
                  winLoading.value = false;
                  fetchRounds();
                  setOpenWinner(false);
                },
              });
            },
          });

          // $wemix.openQR(
          //   'sign',
          //   req,
          //   (success) => {
          //     console.log(success);
          //     console.log('트랜젝션이 처리 되었습니다');
          //     setCommonModal({
          //       open: true,
          //       title: root.$t('s.rounds.reward.complete'),
          //       desc: root.$t('s.rounds.reward.complete.desc'),
          //       primary: root.$t('w.dsp.common.close'),
          //       onPrimary() {
          //         winLoading.value = false;
          //         fetchRounds();
          //         setOpenWinner(false);
          //       },
          //       onClose() {
          //         winLoading.value = false;
          //         fetchRounds();
          //         setOpenWinner(false);
          //       },
          //     });
          //   },
          //   (fail) => {
          //     console.log(fail);
          //     // eslint-disable-next-line no-alert
          //     // alert('트랜젝션 수행 중 오류가 발생 하였습니다. ');
          //
          //     setCommonModal({
          //       open: true,
          //       title: 'Failed to send item.',
          //       desc: '',
          //       primary: root.$t('w.dsp.common.close'),
          //       onPrimary() {
          //         winLoading.value = false;
          //         fetchRounds();
          //         setOpenWinner(false);
          //       },
          //       onClose() {
          //         winLoading.value = false;
          //         fetchRounds();
          //         setOpenWinner(false);
          //       },
          //     });
          //   },
          //   () => {
          //     winLoading.value = false;
          //   },
          // );
        })
        .catch((error) => {
          winLoading.value = false;
          console.log('인증 이후 사용 가능 합니다.', error);
        });
    };

    return {
      active,
      loading,
      winLoading,
      changeChannel,
      worldNames,
      selectedWorldName,
      characters,
      setSelectedWorldName,
      fetchChannelUserCharacter,
      selectedCharacterUID,
      selectCharacter,
      reward,
    };
  },
});
</script>
