<template>
  <div class="my-mirage myitem-list">
    <v-tabs v-model="currentTab" class="tab-rounds">
      <v-tab class="tab-rounds__item">{{ $t('t.mirage.my.tab.roster') }}</v-tab>
      <v-tab class="tab-rounds__item">{{ $t('t.mirage.my.tab.enhance') }}</v-tab>
      <v-tab class="tab-rounds__item">{{ $t('t.mirage.my.tab.nft') }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="currentTab" touchless>
      <v-tab-item class="my-mirage">
        <div class="my-mirage__list">
          <div class="my-mirage__list__count">
            <em>{{ rosters.length }}</em> {{ $t('w.mirage.my.tab.roster.characters') }}
          </div>
          <mirage-inventory />
        </div>

        <template v-if="rosters.length === 0">
          <div class="my-mirage__no-data">
            <p class="my-mirage__no-data__desc">
              <em>{{ $t('s.mirage.my.roster.empty') }}</em>
              <span>{{ $t('s.mirage.my.roster.empty.desc') }}</span>
            </p>
            <div>
              <button type="button" class="btn-mirage btn-primary" @click="currentTab = 2">{{ $t('s.mirage.my.roster.import') }}</button>
            </div>
          </div>
        </template>
        <ul v-else class="my-mirage__rosters">
          <li v-for="(roster, rosterIdx) in rosters" :key="`mirage-roster-${rosterIdx}`">
            <mirage-roster-character-item
              :key="`mirage-roster-${rosterIdx}-${roster.CharacterUID}-${roster.State}-${closed}`"
              :character="roster"
              :closed="mirageLock"
              :hide-mirage-score="roster.State === '3' || roster.State === '7'"
              @onSealClick="selectSealCharacter"
            />
          </li>
        </ul>
      </v-tab-item>
      <v-tab-item class="nft-enhancement">
        <div class="nft-enhancement__list">
          <mirage-inventory />
        </div>

        <ul class="nft-enhancement__seal">
          <li class="nft-enhancement__seal__item">
            <div class="nft-enhancement__seal__info">
              <span class="wrap-img">
                <img src="https://file.mir4global.com/xdraco/img/common/mirage/img-64-mirage-scroll.webp" alt="" />
                <span class="wrap-img__amount">x {{ scrollInfo && scrollInfo.ScrollAmount || '0' }}</span>
              </span>
              <span class="nft-enhancement__seal__desc">{{ $t('w.mirage.my.scroll') }}</span>
            </div>
            <button type="button" class="btn-mirage btn-primary" :disabled="Number(scrollInfo && scrollInfo.ScrollAmount) < 10" @click="seal">
              {{ $t('w.mirage.my.seal') }}
            </button>
          </li>
          <li class="nft-enhancement__seal__item">
            <div class="nft-enhancement__seal__info">
              <span class="wrap-img">
                <img
                  src="https://file.mir4global.com/xdraco/img/common/mirage-enhancement/mirage-scroll-sealing-box.webp"
                  alt=""
                />
                <span class="wrap-img__amount">x {{ scrollInfo && scrollInfo.scrollBox || '0' }}</span>
              </span>
              <span class="nft-enhancement__seal__desc">{{ $t('w.mirage.my.scrollbox') }}</span>
            </div>
            <button type="button" class="btn-mirage btn-primary" :disabled="Number(scrollInfo && scrollInfo.scrollBox) <= 0" @click="unseal">
              {{ $t('w.mirage.my.unseal') }}</button>
          </li>
        </ul>

        <mirage-enhance @openEnhance="selectEnhanceCharacter"/>

        <div class="nft-enhancement__rate">
          <h3>{{ $t('t.mirage.my.success-rate') }}</h3>
          <div class="nft-enhancement__wrap-rate">
            <table class="nft-enhancement__rate__table">
              <thead>
                <tr>
                  <th>{{ $t('w.mirage.my.success-rate.rank') }}</th>
                  <th>{{ $t('w.mirage.my.success-rate.legendary') }}</th>
                  <th>{{ $t('w.mirage.my.success-rate.epic') }}</th>
                  <th>{{ $t('w.mirage.my.success-rate.rare') }}</th>
                  <th>{{ $t('w.mirage.my.success-rate.uncommon') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{{ $t('w.mirage.my.success-rate.cost') }}</th>
                  <td class="cost"><span>8</span></td>
                  <td class="cost"><span>4</span></td>
                  <td class="cost"><span>2</span></td>
                  <td class="cost"><span>1</span></td>
                </tr>
                <tr>
                  <th>{{ $t('w.mirage.my.success-rate.rate') }}</th>
                  <td>60%</td>
                  <td>50%</td>
                  <td>40%</td>
                  <td>30%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li>{{ $t('s.mirage.my.success-rate.list1') }}</li>
            <li>{{ $t('s.mirage.my.success-rate.list2') }}</li>
            <li>{{ $t('s.mirage.my.success-rate.list3') }}</li>
            <li>{{ $t('s.mirage.my.success-rate.list4') }}</li>
          </ul>
        </div>
      </v-tab-item>
      <v-tab-item class="my-mirage">
        <div class="my-mirage__list">
          <div class="my-mirage__list__count">
            <em>{{ sealList ? sealList.length : 0 }}</em> NFTs
          </div>
        </div>
        <div v-if="sealList.length === 0" class="my-mirage__no-data">
          <p class="my-mirage__no-data__desc">
            <em>{{ $t('t.mirage.no-nft') }}</em>
            <span>{{ $t('s.mirage.no-nft') }}</span>
          </p>
        </div>
        <ul class="list-card-nft" :data-empty-message="sealList && sealList.length > 0 ? '' : $t('s.nft.empty.sales')">
          <li v-for="(item, itemIdx) in sealList" :key="`nft-list-item-${item.TokenID}`">
            <nft-card
              :item="{
                tokenID: item.TokenID,
                lv: item.CharacterLev,
                characterName: item.CharacterName,
                class: item.CharacterClass,
                powerScore: item.PowerScore,
                Reinforce: item.Reinforce,
                MiraX: item.MiraX,
              }"
              :size="isDesktop ? 'sm' : 'xs'"
              :hide-level="true"
              :non-flipped="true"
            />
            <div class="wrap-button">
              <button type="button" class="btn btn-sm btn-primary-mirage" @click="selectImportNft(itemIdx)">Send to roster</button>
            </div>
          </li>
        </ul>

        <div class="exchange-list">
          <nft-list-section-title>{{ $t('t.exd.recommended') }}</nft-list-section-title>

          <ul class="list-item" :data-empty-message="recommendedItems.list && recommendedItems.list.length > 0 ? '' : $t('s.nft.empty.sales')">
            <nft-item v-for="item in recommendedItems.list" :key="`nft-recommended-item-${item.seq || item.info.seq}`" :item="item" :size="isDesktop ? 'sm' : 'xs'" use-link />
          </ul>
        </div>
      </v-tab-item>
    </v-tabs-items>
    <modal-mirage-character-info />
    <modal-import-character :visible="openImport" :item="selectedNft" @close="closeImportNft" />
    <modal-seal-character />
    <modal-seal-mirage-scroll/>
    <modal-unseal-mirage-scroll/>
    <modal-enhancement-character/>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
  watch
} from '@vue/composition-api';
import { useNow } from '@vueuse/core';
import dayjs from 'dayjs';
import { createNamespacedHelpers, useMutations, useState } from 'vuex-composition-helpers/dist';

import MirageInventory from '@/components/mirage/common/MirageInventory';
import MirageRosterCharacterItem from '@/components/mirage/MirageRosterCharacterItem';
import ModalImportCharacter from '@/components/mirage/ModalImportCharacter';
import ModalMirageCharacterInfo from '@/components/mirage/ModalMirageCharacterInfo';
import ModalSealCharacter from '@/components/mirage/ModalSealCharacter';
import NftCard from '~/components/nft/NftCard';
import NftItem from '~/components/nft/NftItem';
import NftListSectionTitle from '~/components/nft/NftListSectionTitle';
import { useMirageStore } from '@/utils/composables/mirage';
import ModalSealMirageScroll from "~/components/mirage/ModalSealMirageScroll";
import ModalUnsealMirageScroll from "~/components/mirage/ModalUnsealMirageScroll";
import ModalEnhancementCharacter from "~/components/mirage/ModalEnhancementCharacter";
import MirageEnhance from "~/components/mirage/MirageEnhance";

const { useState: useNftState, useMutations: useNftMutations, useActions: useNftActions } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'MirageMyPage',
  components: {
    MirageEnhance,
    ModalEnhancementCharacter,
    MirageInventory,
    ModalMirageCharacterInfo,
    ModalSealCharacter,
    ModalImportCharacter,
    MirageRosterCharacterItem,
    NftItem,
    NftListSectionTitle,
    NftCard,
    ModalUnsealMirageScroll,
    ModalSealMirageScroll
  },
  layout: 'mirage',
  meta: {
    title: 'MIRAGE | XDRACO',
    hasSubNav: 'mirage',
    hasBottomSticky: 'type1',
  },
  setup(_, { root }) {
    const { $i18n, $router } = root;
    const now = useNow({ interval: 1000 });
    const state = reactive({
      currentTab: 0,
      list: [],
      selectedNft: null,
      openImport: false,
      openSeal: false,
      selectedCharacter: {},
      selectedUID: '',
    });

    const { isDesktop } = useState(['isDesktop']);

    const { setCommonModal } = useMutations(['setCommonModal']);

    const { accessToken } = useState(['accessToken']);
    const { recommendedItems } = useNftState(['recommendedItems']);
    const { fetchNftRecommendedItems } = useNftActions(['fetchNftRecommendedItems']);

    const { useMirageState, useMirageActions, useMirageGetters } = useMirageStore();
    const { valleyCapture, rosters, sealList, scrollInfo, myMirageCurrentTab } = useMirageState(['valleyCapture', 'rosters', 'sealList', 'scrollInfo', 'myMirageCurrentTab']);
    const { mirageLock } = useMirageGetters(['mirageLock']);
    const { fetchMyCharacters, fetchSealList, openModalEnhance, fetchScrollInfo, openModalSeal, openModalUnSeal , fetchSelectedEnhanceUID, fetchMyMirageCurrentTab } = useMirageActions(['fetchMyCharacters', 'fetchSealList', 'openModalEnhance', 'fetchScrollInfo', 'openModalSeal', 'openModalUnSeal', 'fetchSelectedEnhanceUID', 'fetchMyMirageCurrentTab']);

    const closedDuration = Number(process.env.VUE_APP_MIRAGE_CLOSED_DURATION);

    const startDay = computed(() => {
      if (valleyCapture.value && valleyCapture.value.schedule) {
        return dayjs.unix(valleyCapture.value.schedule.StartDT).utcOffset(8, false);
      }

      return dayjs();
    });

    const endDay = computed(() => {
      if (valleyCapture.value && valleyCapture.value.schedule) {
        return dayjs.unix(valleyCapture.value.schedule.EndDT).utcOffset(8, false);
      }

      return dayjs();
    });

    const nowDay = computed(() => {
      return dayjs(now.value).utcOffset(8, false);
    });

    const startDiff = computed(() => {
      return nowDay.value.diff(startDay.value, 'minute');
    });

    const closedDiff = computed(() => {
      return nowDay.value.diff(endDay.value, 'minute');
    });

    const closed = computed(() => {
      return Math.abs(closedDiff.value) < closedDuration || Math.abs(startDiff.value) < closedDuration;
    });

    const seal = () => {
      if (mirageLock.value) {
        setCommonModal({
          open: true,
          title: root.$t('t.mirage.harvest.lockout'),
          desc: root.$t('s.mirage.message.lockout.common'),
          primary: 'OK',
          onPrimary() {},
          onClose() {},
        });
      } else {
        openModalSeal();
      }
    };

    const unseal = () => {
      if (mirageLock.value) {
        setCommonModal({
          open: true,
          title: root.$t('t.mirage.harvest.lockout'),
          desc: root.$t('s.mirage.message.lockout.common'),
          primary: 'OK',
          onPrimary() {},
          onClose() {},
        });
      } else {
        openModalUnSeal();
      }
    };

    const selectEnhanceCharacter = () => {
      if (mirageLock.value) {
        setCommonModal({
          open: true,
          title: root.$t('t.mirage.harvest.lockout'),
          desc: root.$t('s.mirage.message.lockout.common'),
          primary: 'OK',
          onPrimary() {},
          onClose() {},
        });
      } else {
        openModalEnhance();
      }
    };

    const selectImportNft = (idx) => {
      if (closed.value) {
        setCommonModal({
          open: true,
          title: root.$t('t.mirage.harvest.lockout'),
          desc: root.$t('s.mirage.message.lockout.import'),
          primary: 'OK',
          onPrimary() {},
          onClose() {},
        });
        return;
      }

      state.selectedNft = sealList.value[idx];
      state.openImport = true;
    };

    const closeImportNft = () => {
      state.openImport = false;
      state.selectedNft = null;

      fetchMyCharacters();
      fetchSealList();
    };

    const selectSealCharacter = (tokenID) => {
      state.selectedCharacter = rosters.value.find((item) => item.tokenID === tokenID);
      state.openSeal = true;
    };

    const closeSealCharacter = () => {
      state.openSeal = false;
      state.selectedCharacter = null;

      fetchMyCharacters();
      fetchSealList();
    };

    watch(
      () => accessToken.value,
      () => {
        if (accessToken.value) {
          fetchMyCharacters();
          fetchSealList();
        } else {
          $router.replace('/mirage/dashboard');
        }
      },
    );

    watch(
      () => state.currentTab,
      () => {
        fetchMyMirageCurrentTab(state.currentTab);
        fetchSelectedEnhanceUID('');
        if (state.currentTab === 0) {
          fetchMyCharacters();
        }

        if (state.currentTab === 1) {
          fetchSealList();
        }
      },
    );

    watch(
      () => myMirageCurrentTab.value,
      () => {
        state.currentTab = myMirageCurrentTab.value;
      }
    )

    onMounted(() => {
      if (!accessToken.value) {
        $router.replace('/mirage/dashboard');
      }

      if(myMirageCurrentTab.value) {
        state.currentTab = myMirageCurrentTab.value;
      }
      fetchMyCharacters();
      fetchSealList();
      fetchNftRecommendedItems();
      fetchScrollInfo();
    });

    onUnmounted(() => {
      fetchSelectedEnhanceUID('');
      fetchMyMirageCurrentTab(0);
    });

    return {
      ...toRefs(state),
      isDesktop,
      accessToken,
      recommendedItems,
      rosters,
      sealList,
      selectEnhanceCharacter,
      myMirageCurrentTab,
      scrollInfo,
      selectImportNft,
      closeImportNft,
      selectSealCharacter,
      closeSealCharacter,
      closed,
      now,
      mirageLock,
      seal,
      unseal,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app';
@import '~@/assets/sass/components/mirage-dialog';
@import '~@/assets/sass/common/pages/mirage/mirage-list';
@import '~@/assets/sass/common/pages/mirage/nft-enhancement';
@import '~@/assets/sass/components/_list-detail';
</style>
