<template>
  <div id="wrapFilterList" class="wrap-filter equally-child">
    <template v-if="isDesktop">
      <div class="wrap-filter__inner">
        <v-select
          class="select-filter"
          :placeholder="$t('w.common.item.class')"
          :value="value.class"
          :items="classes"
          :menu-props="{ bottom: true, offsetY: true, contentClass: 'select-filter-layer' }"
          dark
          dense
          outlined
          @click="openToggle('class')"
          @change="onChange.class"
        />

        <div class="wrap-filter__btn">
          <!-- btn-select-filter버튼 상황별 class
          클릭 후 레이어 오픈 : btn--active
          값이 설정된 후 : btn--set
           -->
          <button type="button" class="wrap-filter__btn--select" :class="{ 'btn--active': isOpen.level }"
                  @click="openToggle('level')">Level
          </button>
          <div v-if="isOpen.level" class="layer-price-range">
            <dl class="filter-status">
              <dt>Level</dt>
              <dd>
                <span>Min</span>
                <span>{{ level[0] }}</span>
                <span>~</span>
                <span>Max</span>
                <span>{{ level[1] }}</span>
              </dd>
            </dl>
            <div>
              <v-range-slider
                class="filter-range-slider"
                :value="level"
                :min="defaultLevelRange[0]"
                :max="defaultLevelRange[1]"
                track-color="#ffffff33"
                track-fill-color="#fff"
                thumb-color="#aa00ff"
                @input="onChange.level"
              >
                <template #thumb-label="props">
                  <span>{{ props.value }}</span>
                </template>
              </v-range-slider>
            </div>
            <div class="wrap-button">
              <button type="button" class="btn btn-primary2 btn-sm" @click="submitLevel(level)">Apply</button>
            </div>
          </div>
        </div>

        <div class="wrap-filter__btn">
          <button type="button" class="wrap-filter__btn--select" :class="{ 'btn--active': isOpen.power }"
                  @click="openToggle('power')">Power
          </button>
          <div v-if="isOpen.power" class="layer-price-range">
            <dl class="filter-status">
              <dt>Power</dt>
              <dd>
                <span>Min</span>
                <span>{{ power[0] | currency(0) }}</span>
                <span>~</span>
                <span>Max</span>
                <span>{{ power[1] | currency(0) }}</span>
              </dd>
            </dl>
            <div>
              <v-range-slider
                class="filter-range-slider"
                :value="power"
                :min="defaultPowerRange[0]"
                :max="defaultPowerRange[1]"
                track-color="#ffffff33"
                track-fill-color="#fff"
                thumb-color="#aa00ff"
                @input="onChange.power"
              />
            </div>
            <div class="wrap-button">
              <button type="button" class="btn btn-primary2 btn-sm" @click="submitPower(power)">Apply</button>
            </div>
          </div>
        </div>

        <div class="wrap-filter__btn" style="margin-right: 16px">
          <button type="button" class="wrap-filter__btn--select" :class="{ 'btn--active': isOpen.price }"
                  @click="openToggle('price')">Price
          </button>
          <div v-if="isOpen.price" class="layer-price-range">
            <p class="mb-3">{{ $t('s.exd.filter.price.range') }}</p>
            <div class="wrap-range">
              <v-text-field
                id="inputFrom"
                type="tel"
                class="input-range wemixcredit"
                label="From"
                prepend-inner-icon="mdi-map-marker"
                dense
                solo
                flat
                :value="price[0]"
                @input="onChange.price.min"
              />
              <v-text-field
                type="tel"
                class="input-range wemixcredit"
                label="To"
                prepend-inner-icon="mdi-map-marker"
                dense
                solo
                flat
                :value="price[1]"
                @input="onChange.price.max"
              />
            </div>
            <div class="wrap-button">
              <button class="btn btn-primary2 btn-sm" type="button" @click="submitPrice(price)">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="wrap-mobile-select">
        <swiper ref="swiperFilter" class="wrap-filter" :options="swiperFilterOptions" @click-slide="handleClickSwiperFilter">
          <swiper-slide>
            <v-select
              class="select-filter"
              :placeholder="$t('w.common.item.class')"
              :value="value.class"
              :items="classes"
              :menu-props="{ bottom: true, offsetY: true, contentClass: 'select-filter-layer' }"
              dark
              dense
              outlined
              @click="openToggle('class')"
              @change="onChange.class"
            />
          </swiper-slide>
          <swiper-slide>
            <div class="wrap-filter__btn">
              <button type="button" class="wrap-filter__btn--select" :class="{ 'btn--active': isOpen.level }" @click="openToggle('level')">Level</button>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="wrap-filter__btn">
              <button type="button" class="wrap-filter__btn--select" :class="{ 'btn--active': isOpen.power }" @click="openToggle('power')">Power</button>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="wrap-filter__btn">
              <button type="button" class="wrap-filter__btn--select" :class="{ 'btn--active': isOpen.price }" @click="openToggle('price')">Price</button>
            </div>
          </swiper-slide>
        </swiper>

        <div v-if="isOpen.level" class="layer-price-range">
          <dl class="filter-status">
            <dt>Level</dt>
            <dd>
              <span>Min</span>
              <span>{{ level[0] }}</span>
              <span>~</span>
              <span>Max</span>
              <span>{{ level[1] }}</span>
            </dd>
          </dl>
          <div>
            <v-range-slider
              class="filter-range-slider"
              :value="level"
              :min="defaultLevelRange[0]"
              :max="defaultLevelRange[1]"
              track-color="#ffffff33"
              track-fill-color="#fff"
              thumb-color="#aa00ff"
              @input="onChange.level"
            >
              <template #thumb-label="props">
                <span>{{ props.value }}</span>
              </template>
            </v-range-slider>
          </div>
          <div class="wrap-button">
            <button type="button" class="btn btn-primary2 btn-sm" @click="submitLevel(level)">Apply</button>
          </div>
        </div>

        <div v-if="isOpen.power" class="layer-price-range">
          <dl class="filter-status">
            <dt>Power</dt>
            <dd>
              <span>Min</span>
              <span>{{ power[0] | currency(0) }}</span>
              <span>~</span>
              <span>Max</span>
              <span>{{ power[1] | currency(0) }}</span>
            </dd>
          </dl>
          <div>
            <v-range-slider
              class="filter-range-slider"
              :value="power"
              :min="defaultPowerRange[0]"
              :max="defaultPowerRange[1]"
              track-color="#ffffff33"
              track-fill-color="#fff"
              thumb-color="#aa00ff"
              @input="onChange.power"
            />
          </div>
          <div class="wrap-button">
            <button type="button" class="btn btn-primary2 btn-sm" @click="submitPower(power)">Apply</button>
          </div>
        </div>

        <div v-if="isOpen.price" class="layer-price-range price">
          <p class="mb-3">{{ $t('s.exd.filter.price.range') }}</p>
          <div class="wrap-range">
            <v-text-field
              id="inputFrom"
              type="tel"
              class="input-range wemixcredit"
              label="From"
              prepend-inner-icon="mdi-map-marker"
              dense
              solo
              flat
              :value="price[0]"
              @input="onChange.price.min"
            />
            <v-text-field
              type="tel"
              class="input-range wemixcredit"
              label="To"
              prepend-inner-icon="mdi-map-marker"
              dense
              solo
              flat
              :value="price[1]"
              @input="onChange.price.max"
            />
          </div>
          <div class="wrap-button">
            <button class="btn btn-primary2 btn-sm" type="button" @click="submitPrice(price)">Apply</button>
          </div>
        </div>
      </div>
    </template>

    <div class="wrap-filter-chip">
      <div class="wrap-chips">
        <nft-list-filter-chip v-if="isChipVisible.class()" @click="reset.class">
          {{ $t(`w.rounds.item.class.${value.class}`) }}
        </nft-list-filter-chip>

        <nft-list-filter-chip v-if="isChipVisible.level()" @click="reset.level">
          {{ $t('w.rounds.class') }}: {{ value.levMin }} -{{ value.levMax }}
        </nft-list-filter-chip>

        <nft-list-filter-chip v-if="isChipVisible.power()" @click="reset.power">
          {{ $t('w.rounds.power') }}: {{ value.powerMin }} -{{ value.powerMax }}
        </nft-list-filter-chip>

        <nft-list-filter-chip v-if="isChipVisible.price()" @click="reset.price">
          {{ $t('w.common.item.price-range') }}: {{ value.priceMin }} -{{ value.priceMax }}
        </nft-list-filter-chip>

        <nft-list-filter-chip v-if="isChipVisible.order()" @click="reset.order">
          {{ $t(`w.exd.filter.order.${value.sort}`) }}
        </nft-list-filter-chip>

        <div v-if="hasFilter" class="btn-filter-reset" @click="reset.all">
          <span>Reset</span>
          <img src="https://file.mir4global.com/xdraco/img/common/btn-reset-filter.webp" width="16"/>
        </div>
      </div>
      <nft-list-order v-if="variants.includes('order')" @click="openToggle('order')"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useState } from "vuex-composition-helpers/dist";

import 'swiper/css/swiper.css';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import NftListFilterChip from '~/components/nft/NftListFilterChip';
import NftListOrder from '~/components/nft/NftListOrder';
import CharacterClass from '~/constants/character/character-class';

const NOT_SELECTED = 0;

export default defineComponent({
  name: 'NftListFilter',
  components: {
    NftListOrder,
    NftListFilterChip,
    Swiper,
    SwiperSlide,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    variants: {
      type: String,
      default: 'class level power price chip order',
    },
    defaultClass: {
      type: Number,
      default: CharacterClass.ALL,
    },
    defaultLevelRange: {
      type: Array,
      default: () => [60, 170],
    },
    defaultPowerRange: {
      type: Array,
      default: () => [100000, 350000],
    },
    defaultPriceRange: {
      type: Array,
      default: () => [0, 100000],
    },
    defaultOrder: {
      type: String,
      default: 'latest',
    },
  },
  setup() {
    const { isDesktop } = useState(['isDesktop']);

    return {
      isDesktop,
    };
  },
  data() {
    return {
      isOpen: {
        class: false,
        level: false,
        power: false,
        price: false,
        order: false,
      },
      characterClass: this.defaultClass,
      level: this.defaultLevelRange,
      power: this.defaultPowerRange,
      price: [undefined, undefined],
      swiperFilterOptions: {
        freeMode: true,
        slidesPerView: 'auto',
        spaceBetween: 8,
        slidesOffsetBefore: 16,
        slidesOffsetAfter: 16,
      },
    };
  },
  computed: {
    classes() {
      return [
        {text: `${this.$t('w.common.item.class')} (${this.$t('w.common.all')})`, value: 0},
        {text: this.$t('w.rounds.item.class.1'), value: 1},
        {text: this.$t('w.rounds.item.class.2'), value: 2},
        {text: this.$t('w.rounds.item.class.3'), value: 3},
        {text: this.$t('w.rounds.item.class.5'), value: 5},
        {text: this.$t('w.rounds.item.class.4'), value: 4},
      ];
    },
    onChange() {
      return {
        class: (value) => {
          // 변경 즉시 요청
          this.submitClass(value);
        },
        level: (value) => {
          // Apply 까지 임시 저장
          this.level = value;
        },
        power: (value) => {
          // Apply 까지 임시 저장
          this.power = value;
        },
        price: {
          min: (value) => {
            // Apply 까지 임시 저장
            this.price = [value, this.price[1]];
          },
          max: (value) => {
            // Apply 까지 임시 저장
            this.price = [this.price[0], value];
          },
        },
        order: () => {
          // 변경 즉시 요청
          this.submitOrder(this.defaultOrder);
        },
      };
    },
    reset() {
      return {
        all: () => {
          this.allLayerKeys.forEach((key) => {
            this.isOpen[key] = false;
          });
          this.submit({
            class: this.defaultClass,
            levMin: NOT_SELECTED,
            levMax: NOT_SELECTED,
            powerMin: NOT_SELECTED,
            powerMax: NOT_SELECTED,
            priceMin: NOT_SELECTED,
            priceMax: NOT_SELECTED,
            sort: this.defaultOrder,
          });
        },
        class: () => {
          this.submitClass(this.defaultClass);
        },
        level: () => {
          this.submitLevel([NOT_SELECTED, NOT_SELECTED]);
        },
        power: () => {
          this.submitPower([NOT_SELECTED, NOT_SELECTED]);
        },
        price: () => {
          this.submitPrice([NOT_SELECTED, NOT_SELECTED]);
        },
        order: () => {
          this.submitOrder(this.defaultOrder);
        },
      };
    },
    allLayerKeys() {
      return Object.keys(this.isOpen);
    },
    allLayers() {
      return Object.entries(this.isOpen);
    },
    isChipVisible() {
      return {
        class: () => {
          return this.value.class !== this.defaultClass;
        },
        level: () => {
          const isMinDefault = this.value.levMin === NOT_SELECTED || this.value.levMin === this.defaultLevelRange[0];
          const isMaxDefault = this.value.levMax === NOT_SELECTED || this.value.levMax === this.defaultLevelRange[1];
          return !(isMinDefault && isMaxDefault);
        },
        power: () => {
          const isMinDefault = this.value.powerMin === NOT_SELECTED || this.value.powerMin === this.defaultPowerRange[0];
          const isMaxDefault = this.value.powerMax === NOT_SELECTED || this.value.powerMax === this.defaultPowerRange[1];
          return !(isMinDefault && isMaxDefault);
        },
        price: () => {
          const isMinDefault =
            this.value.priceMin === undefined || this.value.priceMin === NOT_SELECTED || this.value.priceMin === this.defaultPriceRange[0];
          const isMaxDefault =
            this.value.priceMax === undefined || this.value.priceMax === NOT_SELECTED || this.value.priceMax === this.defaultPriceRange[1];
          return !(isMinDefault && isMaxDefault);
        },
        order: () => {
          return this.value.sort !== undefined && this.value.sort !== this.defaultOrder;
        },
      };
    },
    isDisabledPrice() {
      if (!this.price[0] || !this.price[1]) {
        return true;
      }
      return this.price[1] < this.price[0];
    },
    hasFilter() {
      return Object.values(this.isChipVisible).some((it) => it());
    },
    swiperFilter() {
      return this.$refs.swiperFilter.$swiper;
    },
  },
  methods: {
    submit(value) {
      this.$emit('change', value);
    },
    submitClass(value) {
      const hasAnyChanged = () => this.value.class !== value;
      if (hasAnyChanged()) {
        this.submit({...this.value, class: value});
      }
      this.isOpen.class = false;
    },
    submitLevel(range) {
      const isParamValid = range && range.length >= 2;
      // Lazy evaluation 위해서 함수로 선언
      const hasAnyChanged = () => range[0] !== this.value.levMin || range[1] !== this.value.levMax;
      if (isParamValid && hasAnyChanged()) {
        this.submit({...this.value, levMin: range[0], levMax: range[1]});
      }
      this.isOpen.level = false;
    },
    submitPower(range) {
      const isParamValid = range && range.length >= 2;
      // Lazy evaluation 위해서 함수로 선언
      const hasAnyChanged = () => range[0] !== this.value.powerMin || range[1] !== this.value.powerMax;
      if (isParamValid && hasAnyChanged()) {
        this.submit({...this.value, powerMin: range[0], powerMax: range[1]});
      }
      this.isOpen.power = false;
    },
    submitPrice(range) {
      const isParamValid = range && range.length >= 2;
      const hasAnyChanged = () => range[0] !== this.value.minDraco || range[1] !== this.value.maxDraco;
      if (isParamValid && hasAnyChanged()) {
        this.submit({...this.value, priceMin: range[0], priceMax: range[1]});
      }
      this.isOpen.price = false;
    },
    submitOrder(value) {
      this.submit({...this.value, sort: value});
      this.isOpen.order = false;
    },
    openToggle(value) {
      this.allLayerKeys.forEach((key) => {
        this.isOpen[key] = key === value ? !this.isOpen[value] : false;
      });
    },
    handleClickSwiperFilter(index) {
      this.swiperFilter.slideTo(index);
    },
  },
});
</script>
