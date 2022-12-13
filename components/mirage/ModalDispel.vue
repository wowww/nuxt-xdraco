<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-mirage-critically cursed"
    :value="visibleDispel"
    :width="isDesktop ? '560px' : '100%'"
    scrollable
    persistent
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
  >
    <div class="content">
      <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="close"></v-btn>
      <p
        class="mirage-popup-criticallydesc"
        v-html="
          $t('s.mirage.boss-raid.buff', [
            recoverCharacter ? recoverCharacter.CharacterName : '',
            $t(`w.mirage.boss-raid.buff-type-${buff ? buff.BuffType : ''}`),
            $t(`w.mirage.boss-raid.type-${buff ? buff.BuffType : ''}`),
          ])
        "
      />
      <div class="critically-info">
        <div class="char">
          <mirage-character :character="recoverCharacter" />
        </div>
        <dl v-if="buff" class="critically-count">
          <dt>
            <img v-if="isDesktop && buff.BuffType === '11'" src="https://file.mir4global.com/xdraco/img/common/mirage-popup/img-56-scissors.webp" width="56" alt="" />
            <img v-if="isDesktop && buff.BuffType === '12'" src="https://file.mir4global.com/xdraco/img/common/mirage-popup/img-56-stink.webp" width="56" alt="" />
            <span
              >Curse of <strong>‘{{ $t(`w.mirage.boss-raid.buff-type-${buff ? buff.BuffType : ''}`) }}’</strong></span
            >
          </dt>
          <dd v-if="buffRemaining">
            <vue-countdown v-slot="{ days, hours, minutes, seconds }" class="countdown" :time="buffRemaining">
              {{ days }}d {{ hours }}h {{ minutes }}m {{ seconds }}s
            </vue-countdown>
          </dd>
        </dl>
      </div>
      <mirage-vigor />
      <button type="button" class="btn btn-red-mirage" @click="confirmHeal">
        <span>Dispel</span><span class="seal">{{ consumeEnergy }}</span>
      </button>
    </div>
  </v-dialog>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown';
import { computed, defineComponent, reactive, toRefs } from '@vue/composition-api';
import { useNow } from '@vueuse/core';
import dayjs from 'dayjs';
import { useMutations, useState } from 'vuex-composition-helpers/dist';
import MirageCharacter from '@/components/mirage/common/MirageCharacter';
import MirageVigor from '@/components/mirage/MirageVigor';
import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'ModalDispel',
  components: { MirageVigor, MirageCharacter, VueCountdown },
  setup(props, { root }) {
    const { $dracoWebApi, $i18n } = root;
    const now = useNow({ interval: 1000 });
    const state = reactive({
      loading: false,
    });
    const { accessToken, isDesktop } = useState(['accessToken', 'isDesktop']);
    const { setCommonModal } = useMutations(['setCommonModal']);
    const { useMirageState, useMirageGetters, useMirageMutations, useMirageActions } = useMirageStore();
    const { accountInfo, visibleDispel, rosters, modalCharacterInfo } = useMirageState([
      'accountInfo',
      'visibleDispel',
      'rosters',
      'modalCharacterInfo',
    ]);
    const { mirageStatus } = useMirageGetters(['mirageStatus']);
    const { setVisibleDispel, setRecoverCharacterUID } = useMirageMutations(['setVisibleDispel', 'setRecoverCharacterUID']);
    const { fetchMyCharacters } = useMirageActions(['fetchMyCharacters']);

    const alertModal = (title, desc) => {
      setCommonModal({
        open: true,
        title,
        desc,
        primary: 'OK',
        onPrimary() {
          state.loading = false;
        },
        onClose() {
          state.loading = false;
        },
      });
    };

    const showErrorModal = (errorResponse) => {
      const { code: errorCode } = errorResponse;
      let errorTitle = root.$t('t.mirage.action.failed');
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        default:
          errorTitle = root.$t('t.mirage.action.failed');
          errorMessage = `${root.$t('s.xdraco.common.err.message')}${errorCode ? `(Error Code: ${errorCode})` : ''}`;
          break;
      }

      alertModal(errorTitle, errorMessage);
    };

    const recoverCharacter = computed(() => {
      if (rosters.value) {
        return rosters.value.find((roster) => roster.CharacterUID === modalCharacterInfo.value.characterUID);
      }

      return null;
    });

    const nowDay = computed(() => {
      return dayjs(now.value);
    });

    const restRemaining = computed(() => {
      if (recoverCharacter.value) {
        const now = dayjs().utcOffset(8, false);
        const restDt = dayjs.unix(recoverCharacter.value.RestDT).utcOffset(8, false);
        return restDt.diff(now);
      }
      return 0;
    });

    const buff = computed(() => {
      if (!recoverCharacter.value || !recoverCharacter.value.buff) {
        return null;
      }

      return recoverCharacter.value.buff[0];
    });

    const buffRemaining = computed(() => {
      if (!buff.value) {
        return null;
      }

      return dayjs.unix(buff.value.ExpireDT).diff(nowDay.value);
    });

    const consumeEnergy = computed(() => {
      if (buffRemaining.value) {
        return buffRemaining.value < 0 ? 0 : Math.ceil(buffRemaining.value / 60 / 360 / 1000);
      }

      return 0;
    });

    const close = () => {
      setRecoverCharacterUID('');
      setVisibleDispel(false);
      fetchMyCharacters();
    };

    const heal = () => {
      if (!accessToken.value) {
        return;
      }

      if (mirageStatus.value.valleyCaptureLocked || mirageStatus.value.raidLocked) {
        setCommonModal({
          open: true,
          title: root.$t('t.mirage.harvest.lockout'),
          desc: root.$t('s.mirage.message.lockout.vigor'),
          primary: 'OK',
          onPrimary() {},
          onClose() {},
        });
        return;
      }

      if (Number(accountInfo.value.VigorAmount) < Number(consumeEnergy.value)) {
        setCommonModal({
          open: true,
          title: root.$t('s.mirage.message.not-enough.vigor'),
          desc: root.$t('s.mirage.message.charge.vigor'),
          primary: 'OK',
          onPrimary() {
            state.loading = false;
          },
          onClose() {
            state.loading = false;
          },
        });
        return;
      }

      state.loading = true;
      $dracoWebApi
        .post('/bossraid/heal', {
          characterUID: modalCharacterInfo.value.characterUID,
          consumeEnergy: consumeEnergy.value,
          buffType: buff.value.BuffType,
        })
        .then(({ data }) => {
          if (data.code !== 200) {
            showErrorModal({ code: data.code });
            return;
          }

          close();
        })
        .finally(() => {
          state.loading = false;
        });
    };

    const confirmHeal = () => {
      setCommonModal({
        open: true,
        title: root.$t('t.mirage.message.confirm.dispel'),
        desc: '',
        primary: 'Dispel',
        secondary: root.$t('t.exd.sales.cancel'),
        onPrimary() {
          heal();
        },
        onSecondary() {
          state.loading = false;
        },
        onClose() {
          state.loading = false;
        },
      });
    };

    return {
      ...toRefs(state),
      isDesktop,
      visibleDispel,
      close,
      heal,
      confirmHeal,
      restRemaining,
      recoverCharacter,
      consumeEnergy,
      accountInfo,
      buff,
      buffRemaining,
    };
  },
});
</script>
