<template>
  <div v-if="item" v-show="item.tradeType === 1" class="float-bottom">
    <div class="register nft">
      <div :data-item-type="`grade-${characterGrade}`" class="item-info">
        <div class="wrap-name">
          <div class="item__layer">
            <div v-if="character && character.class && characterGrade" class="item-info__img">
              <img :src="icon" width="56" :alt="characterClass" class="item" />
            </div>
          </div>
          <div class="item-info__desc">
            <h4 class="item-info__name">{{ character && character.name }}</h4>
            <p>{{ character && character.worldName }}</p>
          </div>
        </div>
        <div class="item-manual">
          <ul class="item-manual__detail size-lg">
            <li class="classname">
              <span>{{ $t(`w.rounds.item.class.${character && character.class}`) }}</span>
              <strong>
                <character-class-thumb :character-class="character && character.class" size="28" type="icon" />
              </strong>
            </li>
            <li class="level">
              <span>{{ $t('w.rounds.level') }}</span>
              <strong>{{ character && character.level }}</strong>
            </li>
            <li class="power">
              <span>{{ $t('t.exd.power.score') }}</span>
              <strong>{{ character && character.powerScore | currency(0) }}</strong>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-buy">
        <div class="price">
          <strong class="ico-wemixcredit ico-sm add-inside">{{ item.price | currency(0) }}</strong>
          <span class="rate">${{ priceUSD | currency(0, true) }}</span>
        </div>
        <button
          type="button"
          class="btn"
          :class="{ 'btn-primary-nft': item.tradeType === 1 }"
          :disabled="item.tradeType !== 1"
          @click="purchase"
        >
          <template v-if="item.tradeType === 1">
            {{ $t('w.exd.event.purchase') }}
          </template>
          <em v-else-if="item.tradeType === 2" class="btn-message">{{ $t('t.exd.sales.cancel') }}</em>
          <em v-else-if="item.tradeType === 3" class="btn-message">{{ $t('w.exd.my-items.tab.sold-out') }}</em>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers, useState} from "vuex-composition-helpers/dist";
import CharacterClassThumb from '~/components/common/CharacterClassThumb';
import CharacterClass from '~/constants/character/character-class';

const { useMutations: useNftMutations } = createNamespacedHelpers('nft');

export default {
  name: 'NftBottomFixedBar',
  components: {
    CharacterClassThumb,
  },
  props: {
    item: {
      type: Object,
    },
    priceRate: {
      type: Object,
    },
    characterClass: {
      type: String,
    },
    characterGrade: {
      type: Number,
    },
  },
  setup(_,{ root }) {
    const { $store } = root;
    const { accessToken } = useState(['accessToken']);
    const { setOpenQR } = useNftMutations(['setOpenQR']);

    const login = () => {
      $store.dispatch('wemix/login');
    };

    const purchase = () => {
      if(accessToken.value) {
        setOpenQR(true);
      } else {
        login();
      }
    };

    return {
      purchase,
    }
  },
  computed: {
    character() {
      return this.item.character;
    },
    resources() {
      return {
        [CharacterClass.WARRIOR]: {
          2: 'https://file.mir4global.com/xdraco/img/common/card/warrior-grade2.webp',
          3: 'https://file.mir4global.com/xdraco/img/common/card/warrior-grade3.webp',
          4: 'https://file.mir4global.com/xdraco/img/common/card/warrior-grade4.webp',
          5: 'https://file.mir4global.com/xdraco/img/common/card/warrior-grade5.webp',
        },
        [CharacterClass.SORCERER]: {
          2: 'https://file.mir4global.com/xdraco/img/common/card/sorcerer-grade2.webp',
          3: 'https://file.mir4global.com/xdraco/img/common/card/sorcerer-grade3.webp',
          4: 'https://file.mir4global.com/xdraco/img/common/card/sorcerer-grade4.webp',
          5: 'https://file.mir4global.com/xdraco/img/common/card/sorcerer-grade5.webp',
        },
        [CharacterClass.TAOIST]: {
          2: 'https://file.mir4global.com/xdraco/img/common/card/taoist-grade2.webp',
          3: 'https://file.mir4global.com/xdraco/img/common/card/taoist-grade3.webp',
          4: 'https://file.mir4global.com/xdraco/img/common/card/taoist-grade4.webp',
          5: 'https://file.mir4global.com/xdraco/img/common/card/taoist-grade5.webp',
        },
        [CharacterClass.ARBALIST]: {
          2: 'https://file.mir4global.com/xdraco/img/common/card/arbalist-grade2.webp',
          3: 'https://file.mir4global.com/xdraco/img/common/card/arbalist-grade3.webp',
          4: 'https://file.mir4global.com/xdraco/img/common/card/arbalist-grade4.webp',
          5: 'https://file.mir4global.com/xdraco/img/common/card/arbalist-grade5.webp',
        },
        [CharacterClass.LANCER]: {
          2: 'https://file.mir4global.com/xdraco/img/common/card/lancer-grade2.webp',
          3: 'https://file.mir4global.com/xdraco/img/common/card/lancer-grade3.webp',
          4: 'https://file.mir4global.com/xdraco/img/common/card/lancer-grade4.webp',
          5: 'https://file.mir4global.com/xdraco/img/common/card/lancer-grade5.webp',
        },
      };
    },
    icon() {
      return this.resources[Number(this.character.class)][this.characterGrade];
    },
    priceUSD() {
      return this.item.price * Number(this.priceRate.USDWemixRate);
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/sass/common/pages/_exchange-market.scss';
</style>

