<template>
  <div class="mirage-my-squadron">
    <div class="mirage-my-squadron__title">
      <h2 class="section-title">
        My Squadron
        <div class="squadron-msg">
          <span v-if="isDesktop">{{ $t('s.mirage.boss-raid.bid') }}</span>
          <v-tooltip content-class="mirage-tooltip" attach=".mirage-my-squadron" max-width="320" top>
            <template #activator="{ on, attrs }">
              <v-icon v-bind="attrs" class="icon-mirage-tooltip" v-on="on">icon</v-icon>
            </template>
            <div class="mirage-tooltip-title" v-html="$t('t.mirage.boss-raid.bid.desc')"></div>
            <div class="mirage-tooltip-desc" v-html="$t('s.mirage.boss-raid.bid.desc')"></div>
          </v-tooltip>
        </div>
      </h2>
      <div class="squadron-party-boost">
        <span>Party Boost</span>
        <div class="boost-value">
          <template v-if="characters.length === 5">7%</template>
          <template v-else-if="characters.length === 4">4%</template>
          <template v-else-if="characters.length === 3">2%</template>
          <template v-else-if="characters.length === 2">1%</template>
          <template v-else>0%</template>
        </div>
      </div>
    </div>

    <ul v-if="false" class="list-system-noti">
      <li>
        <span class="noti-img">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-battle.webp" width="40" alt="" />
        </span>
        <span class="noti-desc"><em>‘Taoist-M01’</em>이 <em>400 Vigor</em>로 BOSS RAID에 참전했습니다. <em>3위</em></span>
      </li>
      <li>
        <span class="noti-img">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-vigor-refund.webp" width="40" alt="" />
        </span>
        <span class="noti-desc"
        ><em>‘도사007’</em>의 입찰 순위가 10위안에 들지 못해 <em>114 Vigor</em>가 <em>환불</em> 되었습니다. (수수료 1 Vigor 차감)</span
        >
      </li>
    </ul>
    <div v-if="bossRaidStatus.started && !bossRaidStatus.closed" class="caution-update">
      <p class="caution-txt">The bid ranking results will be open on {{ bossRaid.schedule[0].EndDT | dateFormat }}</p>
    </div>
    <ul class="char-list">
      <li v-for="(character, characterIdx) in characterClassList" :key="`mirage-boss-raid-squad-${characterIdx}`">
        <mirage-character :key="`mirage-boss-raid-squad-${characterIdx}-char`" :character="character">
          <div class="wrap-button">
            <button
              type="button"
              class="btn-mirage"
              :class="{
                'btn-bid': bossRaidStatus.started && !bossRaidStatus.closed && !character.CharacterUID && !mirageLock,
                'btn-enlisted': !!character.CharacterUID,
                'btn-disabled': mirageLock || bossRaidStatus.closed,
              }"
              :disabled="mirageLock || bossRaidStatus.closed"
              @click="openEnlist(character.Class)"
            >
              <span v-if="!!character.CharacterUID">BID PRICE</span>
              <span v-else-if="bossRaidStatus.started && !bossRaidStatus.closed && !character.CharacterUID && !mirageStatus.raidLocked">BID NOW</span>
              <span v-if="character.CharacterUID" class="volume">
                <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-energy.webp" width="20" height="20" alt="Energy" />
                <em>{{ character.TotalBidPrice | currency(0) }}</em>
              </span>
            </button>
          </div>
        </mirage-character>
      </li>
    </ul>
    <modal-mirage-boss-raid-enlist />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from '@vue/composition-api';
import { useNow } from '@vueuse/core';

import {useState} from "vuex-composition-helpers/dist";
import ModalMirageBossRaidEnlist from '@/components/mirage/boss-raid/ModalMirageBossRaidEnlist';
import MirageCharacter from '@/components/mirage/common/MirageCharacter';
import { getCharacterGrade, useMirageStore } from '@/utils/composables/mirage';
import { CharacterClassList, createCharacterInfo } from '@/constants/character/character-class';

export default defineComponent({
  name: 'MirageBossRaidSquadron',
  components: {
    MirageCharacter,
    ModalMirageBossRaidEnlist,
  },
  setup(_, { root }) {
    const now = useNow({ interval: 1000 });
    const { $dracoWebApi } = root;
    const state = reactive({
      characters: [],
      visibleEnlist: false,
    });

    const { isDesktop } = useState(['isDesktop']);
    const { useMirageState, useMirageGetters, useMirageMutations } = useMirageStore();
    const { bossRaid, modalBossRaid } = useMirageState(['bossRaid', 'modalBossRaid']);
    const { mirageStatus, bossRaidStatus, mirageLock } = useMirageGetters(['mirageStatus', 'bossRaidStatus', 'mirageLock']);
    const { setModalBossRaid } = useMirageMutations(['setModalBossRaid']);

    const fetchResult = () => {
      if (!bossRaid.value) {
        return;
      }
      $dracoWebApi
        .get('/bossraid/raidlists', {
          params: { scheduleUID: bossRaid.value.schedule[0].ScheduleUID, raidType: bossRaid.value.schedule[0].RaidType },
        })
        .then(({ data }) => {
          if (data.code !== 200) {
            throw data.code;
          }

          state.characters = data.data.raidlists || [];
        })
        .catch(() => {
          state.characters = [];
        });
    };

    const characterClassList = computed(() => {
      const classList = [];

      CharacterClassList.forEach((klass) => {
        const exist = state.characters.find((character) => `${character.Class}` === `${klass}`);

        classList.push(exist ? { ...exist, State: 1, ...getCharacterGrade(exist.CombatPoint) } : createCharacterInfo(klass));
      });

      return classList;
    });

    const openEnlist = (klass) => {
      const exist = state.characters.find((character) => `${character.Class}` === `${klass}`);

      if (exist) {
        return;
      }

      setModalBossRaid({
        visible: true,
        class: klass,
      });
    };

    watch(
      () => bossRaid.value,
      () => {
        fetchResult();
      },
    );

    watch(
      () => modalBossRaid.value.visible,
      () => {
        setTimeout(() => {
          fetchResult();
        }, 500);
      },
    );

    onMounted(() => {
      fetchResult();
    });

    return {
      bossRaid,
      isDesktop,
      ...toRefs(state),
      characterClassList,
      openEnlist,
      mirageStatus,
      bossRaidStatus,
      mirageLock,
    };
  },
  data: () => ({
    dialogBidding: null,
    vigorValue: 0,
    minVigor: 10,
    maxVigor: 150,

    // for swiper
    swiperOptions: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      resistance: true,
      resistanceRatio: 0,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      observer: true,
      observeParents: true,
    },
    swiperMobileOptions: {
      slidesPerView: 'auto',
      spaceBetween: 44,
      observer: true,
      observeParents: true,
    },
  }),
  computed: {
    isErrorBid() {
      return this.vigorValue < this.minVigor || this.vigorValue > this.maxVigor;
    },
  },
  mounted() {
    this.setMinVigor();
  },
  methods: {
    setMinVigor() {
      this.vigorValue = this.minVigor;
    },
    setMaxVigor() {
      this.vigorValue = this.maxVigor;
    },
    endCountdownUncritically() {
      this.isDisableUncritically = false;
    },
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/components/mirage-my-squadron';
</style>
