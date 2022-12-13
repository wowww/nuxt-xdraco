<template>
  <v-dialog
    content-class="dialog-stake theme-dark"
    :value="visible"
    max-width="640"
    persistent
    :retain-focus="false"
    style="z-index: 290"
    :transition="!isDesktop ? 'dialog-bottom-transition' : ''"
  >
    <div v-if="item" class="content">
      <v-btn class="btn-close" fab plain x-small @click="$emit('close')">
        <v-icon color="#fff" size="26">mdi-close</v-icon>
      </v-btn>

      <div class="dialog-stake__header">
        <div class="info-round">
          <item-info :item="item" />
        </div>
      </div>

      <div class="card-content">
        <div class="card-content__character">
          <div v-if="exist === 1 && (item.CharacterUID === '' || item.CharacterUID === '0')" class="card-content__character--notice">
            {{ $t('s.exd.purchase.choose.character') }}
          </div>
          <div
            v-if="exist === 1 && item.CharacterUID !== '' && item.CharacterUID !== '0'"
            class="card-content__character--notice"
            v-html="$t('s.inventory.send.no-character-uid')"
          ></div>
          <div v-if="exist === 1 && (item.CharacterUID === '' || item.CharacterUID === '0')" class="card-content__character__header">
            <div v-if="worldNames.length > 0" class="card-content__character__select">
              <v-select
                class="select"
                :items="worldNames"
                :value="selectedWorldName"
                outlined
                dense
                :menu-props="{ bottom: true, offsetY: true, contentClass: 'select-menu' }"
                @change="setSelectedWorldName"
              ></v-select>
            </div>
            <div class="wrap-button">
              <button type="button" class="wrap-button__btn" @click="fetchChannelUserCharacter">
                <em>{{ $t('w.account.update.info') }}</em>
              </button>
            </div>
          </div>
          <ul class="card-content__list">
            <li v-if="accountLoading">
              <div :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '1rem auto' }">
                <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
              </div>
            </li>
            <template v-else>
              <li v-if="exist === 0" class="card-content__list--empty">
                <h4 class="empty__msg">Create a MIR4 account for full access to XDRACO services</h4>
              </li>
              <li v-if="exist === 1 && (characters.length === 0 || characters.filter((item) => item.lv >= 40).length === 0)" class="card-content__list--empty">
                <h4 class="empty__msg">{{ $t('s.account.message.no-lv40-char') }}</h4>
              </li>
              <li
                v-for="(character, idx) in characters.filter((item) => item.lv >= 40)"
                :key="`my-character-${idx}`"
                :class="{ disabled: item.CharacterUID !== '' && item.CharacterUID !== '0' && item.CharacterUID !== `${character.characterUID}` }"
              >
                <div class="card-content__list__info">
                  <character-class-thumb :character-class="character.class" :size="64" />
                  <div class="info-desc">
                    <strong class="info-desc__name">{{ character.characterName }}</strong>
                    <span class="info-desc__level">Lv.{{ character.lv }}</span>
                    <span class="info-desc__category">{{ $t(`w.rounds.item.class.${character.class}`) }}</span>
                  </div>
                </div>
                <div class="radio-box">
                  <input
                    :id="`exd-character-${character.characterUID}`"
                    type="radio"
                    class="radio-box__input"
                    :name="character.characterName"
                    :checked="selectedCharacterUID === `${character.characterUID}`"
                    :disabled="item.CharacterUID !== '' && item.CharacterUID !== '0'"
                    @change="setSelectedCharacterUID(character.characterUID)"
                  />
                  <label :for="`exd-character-${character.characterUID}`" class="radio-box__label"></label>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div class="wrap-button">
          <button type="button" class="btn btn-primary2" :disabled="!selectedCharacterUID || selectedCharacterUID === '0'" @click="selectCharacter">
            <v-progress-circular v-if="accountLoading || winLoading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate />
            <template v-else>{{ $t('w.inventory.send-item') }}</template>
          </button>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useMutations, useState } from 'vuex-composition-helpers/dist';
import CharacterClassThumb from '@/components/common/CharacterClassThumb';
import ItemInfo from '@/components/exd/common/ItemInfo';

const { useState: useExdState, useMutations: useExdMutations } = createNamespacedHelpers('exd');
const { useState: useHspState, useMutations: useHspMutations } = createNamespacedHelpers('hsp');
const {
  useState: useAccountState,
  useGetters: useAccountGetters,
  useMutations: useAccountMutations,
  useActions: useAccountActions,
} = createNamespacedHelpers('account');

export default defineComponent({
  name: 'ModalSend',
  components: { CharacterClassThumb, ItemInfo },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { root, emit }) {
    const { $dracoWebApi, $i18n, $nextTick, $router } = root;

    const state = reactive({
      winLoading: false,
      selectedCharacterUID: '',
      hash: '',
    });

    const {
      loading: accountLoading,
      exist,
      worldNames,
      selectedWorldName,
      represent,
      characters,
    } = useAccountState(['loading', 'exist', 'worldNames', 'selectedWorldName', 'represent', 'characters']);
    const { setSelectedWorldName } = useAccountMutations(['setSelectedWorldName']);
    const { fetchUserCharacter, fetchChannelUserCharacter } = useAccountActions(['fetchUserCharacter', 'fetchChannelUserCharacter']);

    const { walletAddress, isDesktop } = useState(['walletAddress', 'isDesktop']);
    const { price } = useExdState(['price']);
    const { price: hydraPrice } = useHspState(['price']);

    const { setCommonModal } = useMutations(['setCommonModal']);

    watch(
      () => props.visible,
      () => {
        if (!props.visible) {
          // nothing to do
        } else {
          state.hash = null;
          state.winLoading = false;
          if (props.item.CharacterUID !== '' && props.item.CharacterUID !== '0') {
            state.selectedCharacterUID = props.item.CharacterUID;
            fetchUserCharacter(props.item.CharacterUID);
          } else if (represent.value) {
            setSelectedWorldName([represent.value.worldName]);
            state.selectedCharacterUID = `${represent.value.characterUID}`;
          }

          $nextTick(() => {
            fetchChannelUserCharacter();
          });
        }
      },
    );

    watch(
      () => characters.value,
      () => {
        $nextTick(() => {
          console.log(represent.value);
          if (props.item && props.item.CharacterUID !== '' && props.item.CharacterUID !== '0') {
            state.selectedCharacterUID = props.item.CharacterUID || represent.value.characterUID || '';
          } else {
            state.selectedCharacterUID = `${represent.value ? represent.value.characterUID : ''}`;
          }
        });
      },
    );

    watch(
      () => selectedWorldName.value,
      () => fetchChannelUserCharacter(),
    );

    const alertModal = (title, desc) => {
      if (props.visible) {
        emit('close');
      }

      setCommonModal({
        open: true,
        title,
        desc,
        primary: 'OK',
        onPrimary() {
          $router.replace('/exd/list');
        },
        onClose() {
          $router.replace('/exd/list');
        },
      });
    };

    const showErrorModal = (errorResponse) => {
      /**
       * errorCode
       * - 500 : Network Error
       * - 60617 : Sold Out
       * - 60618 : In-progress
       *
       * - 60621 : DB Error
       */
      const { code: errorCode } = errorResponse;
      let errorTitle = root.$t('t.exd.purchase.failed');
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        case 60606:
        case 60609:
          errorMessage = root.$t('s.exd.purchase.choose.character.not-enough.inventory');
          break;
        case 60617:
          errorTitle = root.$t('t.exd.purchase.sold-out');
          errorMessage = root.$t('s.exd.purchase.sold-out');
          break;
        case 60618:
          errorTitle = root.$t('t.exd.purchase.processing');
          errorMessage = root.$t('s.exd.purchase.processing');
          break;
        default:
          errorTitle = root.$t('t.exd.purchase.failed');
          errorMessage = `${root.$t('s.xdraco.common.err.message')}${errorCode ? `(Error Code: ${errorCode})` : ''}`;
          break;
      }

      alertModal(errorTitle, errorMessage);
    };

    const setSelectedCharacterUID = (id) => {
      console.log(id);
      state.selectedCharacterUID = `${id}`;
    };

    const sendItem = () => {
      state.winLoading = true;
      $dracoWebApi
        .post('/warehouse/send', { characterUID: state.selectedCharacterUID, itemUID: props.item.itemUID })
        .then(({ data }) => {
          console.log('send item', data);
          if (data.code !== 200) {
            showErrorModal(data);
          }

          if (data.code === 200) {
            setCommonModal({
              open: true,
              title: 'Send to Warehouse',
              desc: 'You have successfully added an item to the warehouse.',
              primary: 'OK',
              onPrimary() {
                emit('success');
              },
              onClose() {
                emit('success');
              },
            });

            emit('close');
          }
        })
        .catch((e) => {
          showErrorModal({ code: 500 });
        })
        .finally(() => {
          state.winLoading = false;
        });
    };

    const selectCharacter = () => {
      if (!state.selectedCharacterUID) {
        return;
      }

      state.winLoading = true;
      $dracoWebApi
        .get('/warehouse/tradable', { params: { characterUID: state.selectedCharacterUID, itemUID: props.item.itemUID } })
        .then(({ data }) => {
          console.log('select character', data);
          if (data.code !== 200) {
            showErrorModal(data);
            return;
          }

          const { itemCount, tradable } = data.data;

          if (itemCount >= 30) {
            showErrorModal({ code: 60609 });
            return;
          }

          if (tradable === 0) {
            showErrorModal({ code: 60609 });
            return;
          }

          if (tradable === 2) {
            showErrorModal({ code: 60618 });
            return;
          }

          if (tradable === 3) {
            showErrorModal({ code: 60617 });
          }

          sendItem();
        })
        .catch((e) => {
          showErrorModal({ code: 500 });
        })
        .finally(() => {
          state.winLoading = false;
        });
    };

    return {
      isDesktop,
      walletAddress,
      price,
      hydraPrice,
      accountLoading,
      worldNames,
      selectedWorldName,
      characters,
      setSelectedWorldName,
      fetchChannelUserCharacter,
      selectCharacter,
      setSelectedCharacterUID,
      exist,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/pages/popup-rounds';
@import '~@/assets/sass/common/pages/_round-title';
</style>
