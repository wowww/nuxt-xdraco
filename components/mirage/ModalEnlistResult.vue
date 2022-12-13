<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-mirage-play"
    :value="visibleEnlistResult"
    :width="isDesktop ? '560px' : '100%'"
    scrollable
    persistent
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
  >
    <div v-if="enlistResultResponse" class="dialog-mirage-play__contents">
      <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="setVisibleEnlistResult(false)" />
      <p
        v-if="enlistResultResponse && enlistResultResponse.isKick == '1'"
        class="dialog-mirage-play__desc"
        v-html="
          $t('s.mirage.message.assault.kick', [
            selectedCharacter.CharacterName,
            enlistResultResponse.VictimCharacterName,
            $t(`t.mirage.valley-type.${modalSelectedValley.valleyId}`),
          ])
        "
      />
      <p v-if="selectedCharacter && enlistResultResponse.isKick != '1'" class="dialog-mirage-play__desc">
        <strong>{{ selectedCharacter.CharacterName }}</strong
        ><br />
        has joined in the <strong>‘{{ $t(`t.mirage.valley-type.${modalSelectedValley.valleyId}`) }}’</strong> Hidden Valley Capture.
      </p>
      <div v-if="selectedCharacter" class="wrap-play">
        <mirage-valley-character-item :character="selectedCharacter" hide-action hide-character-name hide-mirage-score />
        <ul class="wrap-play__list">
          <li class="wrap-play__item">
            <span>MIRAGE Score</span>
            <div>
              <span class="score">{{ selectedCharacter.MirageScore | currency(0) }}</span>
              <span class="mirax">MiraX<em>{{ selectedCharacter.MiraX }}</em></span>
            </div>
          </li>
          <li class="wrap-play__item">
            <span>{{ $t('t.mirage.sanctuary') }}</span>
            <span class="stage">
              Stage
              <em>{{ selectedCharacter.SanctuaryOfHydraLevel }}</em>
            </span>
          </li>
        </ul>
      </div>
      <p v-if="enlistResultResponse.isKick === '1' && savedVigor" class="break-in">{{ $t('s.mirage.assault.base.vigor') }}</p>
      <div v-if="enlistResultResponse && enlistResultResponse.isKick === '1'" class="remain-energy type2">
        <span>{{ $t('w.mirage.used.vigor') }}</span
        ><span class="remain">{{ vigorAmount }}</span>
      </div>
      <button type="button" class="btn btn-black-mirage" @click="setVisibleEnlistResult(false)">OK</button>
    </div>
  </v-dialog>
</template>

<script>
import { computed, defineComponent, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';
import MirageValleyCharacterItem from '@/components/mirage/MirageValleyCharacterItem';

const { useState: useMirageState, useMutations: useMirageMutations } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'ModalEnlistResult',
  components: { MirageValleyCharacterItem },
  setup() {
    const { isDesktop } = useState(['isDesktop']);
    const { rosters, modalSelectedValley, visibleEnlistResult, modalSelectedCharacterUID, enlistResultResponse } = useMirageState([
      'rosters',
      'modalSelectedValley',
      'visibleEnlistResult',
      'modalSelectedCharacterUID',
      'enlistResultResponse',
    ]);
    const { setVisibleEnlistResult, setEnlistResultResponse } = useMirageMutations(['setVisibleEnlistResult', 'setEnlistResultResponse']);

    const selectedCharacter = computed(() => {
      if (modalSelectedCharacterUID.value) {
        return rosters.value.find((item) => item.CharacterUID === modalSelectedCharacterUID.value);
      }

      return null;
    });

    const savedVigor = computed(() => {
      if (enlistResultResponse.value) {
        return Number(enlistResultResponse.value.VigorAmount) < Number(enlistResultResponse.value.BetVigorAmount);
      }

      return false;
    });

    const vigorAmount = computed(() => {
      if (enlistResultResponse.value) {
        return enlistResultResponse.value.VigorAmount;
      }

      return 0;
    });

    watch(
      () => visibleEnlistResult.value,
      () => {
        if (!visibleEnlistResult.value) {
          setEnlistResultResponse(null);
        }
      },
    );

    return {
      isDesktop,
      modalSelectedValley,
      visibleEnlistResult,
      enlistResultResponse,
      setVisibleEnlistResult,
      selectedCharacter,
      savedVigor,
      vigorAmount,
    };
  },
});
</script>
