<template>
  <v-dialog
    content-class="dialog-item-buy theme-dark"
    :value="visible"
    :max-width="isDesktop ? '640px' : '100%'"
    persistent
    :retain-focus="false"
    style="z-index: 290"
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
  >
    <div class="dialog-item-buy__contents">
      <v-btn class="btn-close" fab plain x-small @click="$emit('close')">
        <v-icon color="#fff" size="26">mdi-close</v-icon>
      </v-btn>

      <div v-if="!item" class="d-flex justify-center align-center">
        <v-progress-circular v-if="loading" class="ma-5" :size="32" :width="4" color="#fff" indeterminate />
      </div>

      <div v-else class="wrap-item">
        <template v-if="item">
          <item-card :item="item" :collectible="!!item.uniqueNo" />
          <span class="wrap-item__desc">{{ $t('s.inventory.import', [item.price]) }}</span>
        </template>

        <button type="button" class="btn btn-primary2" :disabled="loading" @click="importItem">
          <template v-if="!loading">{{ $t('w.inventory.import') }}</template>
          <v-progress-circular v-else class="ma-5" :size="32" :width="4" color="#fff" indeterminate />
        </button>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useMutations, useState } from 'vuex-composition-helpers/dist';


import ItemCard from '@/components/common/item/ItemCard';

const {
  useState: useAccountState,
  useGetters: useAccountGetters,
  useMutations: useAccountMutations,
  useActions: useAccountActions,
} = createNamespacedHelpers('account');

export default defineComponent({
  name: 'ModalImport',
  components: { ItemCard },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    itemUID: {
      type: String,
      default: '',
    },
  },
  setup(props, { root, emit }) {
    const { $dracoWebApi, $i18n } = root;

    const { isDesktop } = useState(['isDesktop']);

    const state = reactive({
      loading: false,
      hash: null,
      item: null,
    });

    const {
      loading: accountLoading,
      exist,
      worldNames,
      selectedWorldName,
    } = useAccountState(['loading', 'exist', 'worldNames', 'selectedWorldName']);
    const { characters } = useAccountGetters(['characters']);
    const { setSelectedWorldName } = useAccountMutations(['setSelectedWorldName']);
    const { fetchUserCharacter, fetchChannelUserCharacter } = useAccountActions(['fetchUserCharacter', 'fetchChannelUserCharacter']);

    const { walletAddress } = useState(['walletAddress']);

    const { setCommonModal } = useMutations(['setCommonModal']);

    const alertModal = (title, desc) => {
      setCommonModal({
        open: true,
        title,
        desc,
        primary: 'OK',
        onPrimary() {
          emit('close');
        },
        onClose() {
          emit('close');
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

    const importItem = () => {
      $dracoWebApi
        .post('/warehouse/import', { itemUID: props.itemUID })
        .then(({ data }) => {
          if (data.code === 200) {
            setCommonModal({
              open: true,
              title: 'Importing to Inventory',
              desc: 'You have successfully added an item to the inventory.',
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
        .catch(() => {
          showErrorModal({ code: 500 });
        });
    };

    watch(
      () => props.visible,
      () => {
        if (props.visible) {
          state.loading = true;
          $dracoWebApi
            .get('/warehouse/item', { params: { itemUID: props.itemUID, languageCode: $i18n.locale } })
            .then(({ data }) => {
              console.log(data);
              if (data.code === 200) {
                state.item = data.data;
              }
            })
            .catch(() => {
              state.item = null;
              emit('close');
            })
            .finally(() => {
              state.loading = false;
            });
        }
        if (!props.visible) {
          state.item = null;
        }
      },
    );

    return {
      isDesktop,
      walletAddress,
      accountLoading,
      worldNames,
      selectedWorldName,
      characters,
      setSelectedWorldName,
      fetchChannelUserCharacter,
      exist,
      ...toRefs(state),
      importItem,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/common/pages/popup-exchange';
</style>
