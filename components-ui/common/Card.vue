<template>
  <div
    class="card"
    :class="{
      reverse: reverse,
      'card--xs': smaller === 'xs',
      'card--sm': smaller === 'sm',
    }"
    :aria-disabled-flip="flipped"
    :data-item-type="itemType"
    @click="flipDom"
  >
    <div class="card__inner">
      <div class="card__layer front">
        <!-- <p v-if="isDevelopment && flipped" style="position: absolute; top: 0; left: 0; width: 100%; font-size: 14px">aria-disabled-flip="true"</p> -->

        <span class="by-what draco"></span>
        <div class="wrap-item">
          <!-- <img src="https://file.mir4global.com/xdraco/img/desktop/card/@item-rare.webp" class="item" width="140" alt="" /> -->
          <!-- [참고] 아래 :src에 itemType을 처리한 부분은 UI를 위한 임시 조치일뿐이며 실제 개발 처리시 data에서 받아온 파일명을 지정해야합니다 -->
          <img :src="require('@' + '/assets/img/common/card/@item-' + itemType + '.webp')" class="item" width="140" alt="" />
        </div>
        <dl class="power-score">
          <dt>score</dt>
          <dd>12,032</dd>
        </dl>
        <div class="wrap-badge">
          <!-- [참고] 아래 Tier, Depth가 없는 케이스가 나올 수 있어 .badge에 v-if를 적용해야합니다 -->
          <dl class="badge tier">
            <dt>Tier</dt>
            <dd>IV</dd>
          </dl>
          <dl class="badge">
            <dt>Depth</dt>
            <dd>+10</dd>
          </dl>
        </div>
        <div class="wrap-name">
          <dl class="name">
            <dt>Item Name</dt>
            <dd class="item-name">Shineworld Dragon Gloves</dd>
            <dt>Item Type</dt>
            <dd class="item-type">General Ring</dd>
          </dl>
          <div class="unique-number">Unique No. #12345</div>
        </div>

        <div class="wrap-thumb">
          <!-- [참고] 사용가능한 직업에 aria-enabled="true"를 지정해주세요 -->
          <div class="thumb warrior">Warrior</div>
          <!-- <div class="thumb warrior" aria-enabled="true">Warrior</div> -->
          <!-- <div class="thumb sorcerer">Sorcerer</div> -->
          <div class="thumb sorcerer" aria-enabled="true">Sorcerer</div>
          <div class="thumb taoist">Taoist</div>
          <!-- <div class="thumb taoist" aria-enabled="true">Taoist</div> -->
          <!-- <div class="thumb lancer">Lancer</div> -->
          <div class="thumb lancer" aria-enabled="true">Lancer</div>
          <div class="thumb arbalist">Arbalist</div>
          <!-- <div class="thumb arbalist" aria-enabled="true">Arbalist</div> -->
        </div>
      </div>
      <div id="cardLayerBack" class="card__layer back">
        <div class="back__inner">
          <p v-if="isDevelopment && flipped" style="position: absolute; top: 0; left: 0; width: 100%; font-size: 14px">aria-disabled-flip="true"</p>

          <!-- <dl class="power-score">
            <dt>Power Score</dt>
            <dd>87,760</dd>
          </dl> -->
          <div class="wrap-property">
            <dl class="property unique-number">
              <dt>Unique No.</dt>
              <dd>#12345</dd>
            </dl>
            <dl class="property unique-number">
              <dt>Limited</dt>
              <dd>#1/1</dd>
            </dl>
            <dl class="property power-score">
              <dt>Power Score</dt>
              <dd>87,760</dd>
            </dl>
          </div>

          <div class="wrap-property">
            <h3 class="title-property">Options</h3>
            <dl class="property">
              <dt>HP</dt>
              <dd>358,501</dd>
            </dl>
            <dl class="property">
              <dt>Accuracy</dt>
              <dd>403</dd>
            </dl>
            <dl class="property">
              <dt>ABCDEFGHIJABCDEFGHIJABCDE</dt>
              <dd>55.2%</dd>
            </dl>
            <dl class="property">
              <dt>가나다라마바사아자차가나다라마바사아자차가나다라마</dt>
              <dd>12%</dd>
            </dl>
            <dl class="property">
              <dt>Property</dt>
              <dd>Value</dd>
            </dl>
          </div>

          <!-- Additional Property -->
          <div class="wrap-property">
            <h3 class="title-property">Additional Options</h3>
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

          <!-- 아이템 옵션이 없는 경우 -->
          <dl class="no-options">
            <dt>Custom Info Title</dt>
            <dd>
              Legend has it that this staff can deceive the entire world. This staff’s power is too great that only mages who have mastered all spells
              can wield it.
            </dd>
          </dl>

          <!-- 출처 -->
          <dl class="source">
            <dt>From</dt>
            <dd>
              <p>2021년 11월 30일</p>
              <p>DSP Season1 Round1</p>
            </dd>
          </dl>

          <div class="wrap-button">
            <nuxt-link class="button" to="/viewmore">VIEW MORE</nuxt-link>
            <!-- <button type="button" class="button" to="/viewmore">VIEW MORE</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
    itemType: {
      type: String,
      required: true,
    },
    smaller: {
      type: String,
      required: false,
      default: '',
    },
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
  }),
  mounted() {
    this.setLineBreak('div.front .wrap-name .item-name', false, 40);
    this.setLineBreak('div.back .property dt', true, 140);
  },
  methods: {
    flipDom() {
      if (!this.$el) {
        return;
      }
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
};
</script>
