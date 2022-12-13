<template>
  <div
    ref="card"
    class="card card--nft"
    :class="{
      reverse: reverse,
      'card--xs': size === 'xs',
      'card--sm': size === 'sm',
    }"
    :aria-disabled-flip="nonFlipped ? 'true' : 'false'"
    :data-item-type="`item-grade-${itemGrade}`"
    @click="flipDom"
  >
    <div class="card__inner">
      <div class="card__layer front">
        <span class="class" :class="className">{{ className }}</span>
        <dl v-if="!hideLevel" class="level">
          <dt>Level</dt>
          <dd>{{ item.lv }}</dd>
        </dl>
        <div v-if="className && itemGrade" class="wrap-character">
          <img :src="characterImgPath" width="160" />
          <strong :data-character-reinforce="item.Reinforce" class="card__character--level">+{{ item.Reinforce || '0' }}</strong>
        </div>
        <div class="wrap-name">
          <dl class="name">
            <dt>Character Name</dt>
            <dd class="item-name">{{ item.characterName }}</dd>
            <dt>Character Class</dt>
            <dd class="item-type">{{ className }}</dd>
          </dl>
          <dl class="power-score" :class="{ mirage: viewMode === 'ms' }">
            <dt>score</dt>
            <dd v-if="viewMode === 'ps'">{{ Number(item.powerScore) | currency(0) }}</dd>
            <dd v-else>{{ computedMirageScore | currency(0) }}</dd>
          </dl>
          <!--          <div class="nft-id">NFT ID {{ item.nftID || item.tokenID }}</div>-->
          <hr class="card-divider" />
          <div class="display-score">
            <template v-if="viewMode === 'ps'">
              <dt>MIRAGE Score</dt>
              <dd class="mirage">{{ computedMirageScore | currency(0) }}</dd>
            </template>
            <template v-else>
              <dt>POWER Score</dt>
              <dd class="power">{{ Number(item.powerScore) | currency(0) }}</dd>
            </template>
          </div>
        </div>
      </div>
      <div id="cardLayerBack" class="card__layer back">
        <div class="back__inner">
          <div class="wrap-property">
            <dl class="property unique-number">
              <dt>NFT ID</dt>
              <dd>{{ item.nftID || item.tokenID }}</dd>
            </dl>
            <dl class="property power-score">
              <dt>Power Score</dt>
              <dd>{{ (item.powerScore || 0) | currency(0) }}</dd>
            </dl>

            <dl v-for="(stat, statIdx) in item.stat" :key="`nft-${item.nftID || item.tokenID}-stat-${statIdx}`" class="property">
              <dt>{{ stat.statName }}</dt>
              <dd>{{ (stat.statValue || 0) | currency(0) }}</dd>
            </dl>
          </div>

          <!-- Additional Property -->
          <div v-show="false" class="wrap-property">
            <dl class="property">
              <dt>Additional Props#1</dt>
              <dd>2,501</dd>
            </dl>
            <dl class="property">
              <dt>Additional Props#2</dt>
              <dd>403</dd>
            </dl>
            <dl class="property">
              <dt>Additional Props#3</dt>
              <dd>403</dd>
            </dl>
            <dl class="property">
              <dt>Additional Props#4</dt>
              <dd>403</dd>
            </dl>
          </div>
          <dl class="source">
            <dt>{{ $t('w.nft.sealed.on') }}</dt>
            <dd>
              <p>{{ item.mintedDT | dateFormat }}</p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onBeforeMount, onMounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import BigNumber from 'bignumber.js';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import { findLowercaseKey } from '~/constants/character/character-class';

const { useState: useNftState } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftCard',
  props: {
    reverse: {
      type: Boolean,
      default: false,
    },
    nonFlipped: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default: () => ({}),
    },
    hideLevel: {
      type: Boolean,
      default: false,
    },
  },
  setup({ item }, { root }) {
    const { viewMode } = useNftState(['viewMode']);
    const card = ref(null);
    const state = reactive({
      itemGrade: 2,
      className: '',
      characterImgPath: '',
    });

    const calc = () => {
      if (item.powerScore >= 205000) {
        state.itemGrade = 5;
      } else if (item.powerScore >= 170000) {
        state.itemGrade = 4;
      } else if (item.powerScore >= 135000) {
        state.itemGrade = 3;
      } else {
        state.itemGrade = 2;
      }

      state.className = findLowercaseKey(item.class);
    };

    const setCharacterImgPath = () => {
      const host = process.env.VUE_APP_STATIC_HOST;
      const characterImgPath = `${host}/xdraco-thumb/card-nft/${state.className}-grade${state.itemGrade}.webp`;

      state.characterImgPath = characterImgPath;
    };

    const setLineBreak = (selector, isWidth, breakpoint) => {
      if (!selector || !document.querySelector(selector)) {
        return;
      }
      if (isWidth === undefined) {
        isWidth = true;
      }
      if (!breakpoint) {
        breakpoint = 200;
      }

      const properties = document.querySelectorAll(selector);
      [].map.call(properties, (obj) => {
        const targetSize = isWidth ? obj.clientWidth : obj.clientHeight;

        if (targetSize >= breakpoint) {
          obj.classList.add('line-break');
        }
      });
    };

    watch(
      () => item,
      () => {
        calc();
      },
    );

    const flipDom = () => {
      if (card.value.getAttribute('aria-disabled-flip') === 'true') {
        return;
      }
      if (!card.value.classList.contains('reverse')) {
        card.value.classList.add('reverse');
      } else {
        card.value.classList.remove('reverse');
      }
    };

    const computedMirageScore = computed(() => {
      const mirax = new BigNumber(item.MiraX || '0');
      const reinforce = new BigNumber(item.Reinforce || '0');
      return new BigNumber(item.powerScore)
        .plus(mirax.isGreaterThan(100000) ? 100000 : mirax)
        .pow(2)
        .div(100000)
        .multipliedBy(reinforce.multipliedBy(0.02).plus(1))
        .toNumber();
    });

    onBeforeMount(() => {
      calc();
      setCharacterImgPath();
    });

    onMounted(() => {
      setLineBreak('div.front .wrap-name .item-name', false, 40);
      setLineBreak('div.back .property dt', true, 140);
    });

    return {
      viewMode,
      card,
      flipDom,
      ...toRefs(state),
      computedMirageScore,
    };
  },
});
</script>


