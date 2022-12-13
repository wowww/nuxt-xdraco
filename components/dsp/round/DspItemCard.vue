<template>
  <div
    class="card"
    :class="{
      'card--collectible': !!item.uniqueNo,
      reverse: reverse,
      'card--xs': smaller === 'xs',
      'card--sm': smaller === 'sm',
    }"
    :aria-disabled-flip="flipped"
    :data-item-type="`item-grade-${item.grade}`"
    @click="flipDom"
  >
    <div class="card__inner">
      <div class="card__layer front">
        <p v-if="isDevelopment && flipped" style="position: absolute; top: 0; left: 0; width: 100%; font-size: 14px">aria-disabled-flip="true"</p>

        <span class="by-what" :class="{ draco: item.uniqueNo === '', 'draco-nft': item.uniqueNo !== '' }"></span>
        <div class="wrap-item">
          <img :src="item.itemPath" class="item"  alt="" />
        </div>
        <dl v-if="item.powerScore > 0" class="power-score">
          <dt>score</dt>
          <dd>{{ item.powerScore | currency(0) }}</dd>
        </dl>
        <div v-if="item.itemType < 11" class="wrap-badge">
          <!-- [참고] 아래 Tier, Depth가 없는 케이스가 나올 수 있어 .badge에 v-if를 적용해야합니다 -->
          <dl class="badge tier">
            <dt>Tier</dt>
            <dd>{{ item.tier | roman }}</dd>
          </dl>
          <dl v-if="item.tier > 0" class="badge">
            <dt>Depth</dt>
            <dd>+{{ `${item.enhance || 0}` }}</dd>
          </dl>
        </div>
        <div class="wrap-name">
          <dl class="name">
            <dt>Item Name</dt>
            <dd class="item-name">{{ item.name }}</dd>
            <dt>Item Type</dt>
            <dd class="item-type">
              {{ $t(`w.rounds.item.type.${item.itemType}`, [item.class > 0 ? $t(`w.rounds.item.class.${item.class}`) : '']) }}
            </dd>
            <dt>Unique Number</dt>
          </dl>
          <div v-if="item.uniqueNo" class="unique-number">{{ $t('w.exd.unique.no.with-value', [item.uniqueNo || '-']) }}</div>
        </div>

        <div class="wrap-thumb">
          <div
            v-for="(classItem, classIdx) in classList"
            :key="`item-class-${classIdx}`"
            class="thumb"
            :class="[classItem && classItem.toLowerCase()]"
            :aria-enabled="checkClassAriaEnabled(item.class, classItem && classItem.toLowerCase())"
          >
            {{ classItem }}
          </div>
        </div>
      </div>
      <div id="cardLayerBack" class="card__layer back">
        <div class="back__inner">
          <p v-if="isDevelopment && flipped" style="position: absolute; top: 0; left: 0; width: 100%; font-size: 14px">aria-disabled-flip="true"</p>

          <div class="wrap-property">
            <dl v-if="item.uniqueNo" class="property unique-number">
              <dt>{{ $t('w.exd.unique.no') }}</dt>
              <dd>{{ item.uniqueNo || '-' }}</dd>
            </dl>
            <dl v-if="item.uniqueNo" class="property unique-number">
              <dt>{{ $t('w.collectible.limit-no') }}</dt>
              <dd>{{ item.limited || `#${UniqueDict[item.uniqueNo].idx} / ${UniqueDict[item.uniqueNo].count}` }}</dd>
            </dl>
            <dl v-if="item.powerScore > 0" class="property power-score">
              <dt>Power Score</dt>
              <dd>{{ item.powerScore | currency(0) }}</dd>
            </dl>
            <template v-if="itemOptionLength > 0">
              <dl
                v-for="({ optionName, optionValue }, optionIdx) in item.options.filter((item) => !!item.optionValue)"
                :key="`dsp-item-${item.name}-${optionIdx}`"
                class="property"
              >
                <dt>{{ optionName }}</dt>
                <dd>{{ optionValue }}</dd>
              </dl>
            </template>
          </div>

          <!-- Additional Property -->
          <div v-if="itemRandomOptionLength > 0" class="wrap-property">
            <dl
              v-for="({ optionName, optionValue }, optionIdx) in item.randomOptions.filter((item) => !!item.optionValue)"
              :key="`dsp-item-${item.name}-random-${optionIdx}`"
              class="property"
            >
              <dt>{{ optionName }}</dt>
              <dd>{{ optionValue }}</dd>
            </dl>
          </div>

          <div v-if="UniqueDict[item.uniqueNo] && UniqueDict[item.uniqueNo].options" class="wrap-property">
            <dl
              v-for="({ optionName, optionValue }, optionIdx) in UniqueDict[item.uniqueNo].options"
              :key="`dsp-item-${item.name}-unique-${optionIdx}`"
              class="property"
            >
              <dt>{{ $t(optionName) }}</dt>
              <dd>{{ optionValue }}</dd>
            </dl>
          </div>

          <!-- 아이템 옵션이 없는 경우 -->
          <div
            v-if="item.itemType === 11 && item.passiveOption && (item.passiveOption.name || item.passiveOption.desc || item.passiveOption.petOrigin)"
            class="wrap-property mb-6"
            :class="{ 'mt-0': itemOptionLength === 0 && itemRandomOptionLength === 0 }"
          >
            <dl class="property">
              <dt>{{ item.passiveOption.petOrigin }}</dt>
              <dd></dd>
            </dl>
          </div>

          <dl
            v-if="item.itemType === 11 && item.passiveOption && (item.passiveOption.name || item.passiveOption.desc || item.passiveOption.petOrigin)"
            class="no-options"
          >
            <dt>{{ item.passiveOption.name }}</dt>
            <dd v-html="item.passiveOption.desc"></dd>
          </dl>

          <dl v-if="item.itemType === 12 && item.itemNote" class="no-options">
            <dt></dt>
            <dd v-html="item.itemNote"></dd>
          </dl>

          <!-- 출처 -->
          <dl v-show="false" class="source">
            <dt>From</dt>
            <dd>
              <p>2021년 11월 30일</p>
              <p>DSP Season1 Round1</p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import { defaultItem } from '@/constants/dsp/dsp-round';
import { UniqueDict } from '@/constants/exchange';

export default defineComponent({
  name: 'DspItemCard',
  props: {
    item: {
      type: Object,
      required: true,
      default: defaultItem(),
    },
    flipped: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    reverse: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    smaller: {
      type: String,
      required: false,
    },
  },
  setup() {
    const classList = ['Warrior', 'Sorcerer', 'Taoist', 'Lancer', 'Arbalist']; // 1,2,3,5,4

    return {
      classList,
      UniqueDict,
    };
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
  }),
  computed: {
    itemOptionLength() {
      if (!this.item || !this.item.options) {
        return 0;
      }
      return this.item.options.length;
    },
    itemRandomOptionLength() {
      if (!this.item || !this.item.randomOptions) {
        return 0;
      }
      return this.item.randomOptions.length;
    },
  },
  mounted() {
    // setLineBreak(DomSelector, Boolean(width or height), Breakpoint);
    this.setLineBreak('div.front .wrap-name .item-name', false, 40);
    this.setLineBreak('div.back .property dt', true, 140);
  },
  updated() {
    // setLineBreak(DomSelector, Boolean(width or height), Breakpoint);
    this.setLineBreak('div.front .wrap-name .item-name', false, 40);
    this.setLineBreak('div.back .property dt', true, 140);
  },
  methods: {
    checkClassAriaEnabled(itemClass, className) {
      switch (itemClass) {
        case 0:
          return true;
        case 1:
          return className === 'warrior';
        case 2:
          return className === 'sorcerer';
        case 3:
          return className === 'taoist';
        case 5:
          return className === 'lancer';
        case 4:
          return className === 'arbalist';
        default:
          return false;
      }
    },
    flipDom() {
      if (this.$el.getAttribute('aria-disabled-flip') === 'true') {
        return;
      }
      if (!this.$el.classList.contains('reverse')) {
        this.$el.classList.add('reverse');
      } else {
        this.$el.classList.remove('reverse');
      }
    },
    setLineBreak(selector, isWidth, breakpoint) {
      if (!this.$el || !this.$el.querySelector) {
        return
      }
      if (!selector || !this.$el.querySelector(selector)) {
        return;
      }
      if (isWidth === undefined) {
        isWidth = true;
      }
      if (!breakpoint) {
        breakpoint = 200;
      }

      const properties = this.$el.querySelectorAll(selector);
      [].map.call(properties, (obj) => {
        const targetSize = isWidth ? obj.clientWidth : obj.clientHeight;

        if (targetSize >= breakpoint) {
          obj.classList.add('line-break');
        }
      });
    },
  },
});
</script>


