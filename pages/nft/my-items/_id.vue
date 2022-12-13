<template>
  <div class="myitem nft-myitem" :data-sale-type="myitemType">
    <NftItemInfo :item-category="itemCategory" :item-name="itemName"></NftItemInfo>
    <div v-if="myitemType == 'sale'" class="myitem-detail sale">
      <ul class="list">
        <li class="klass">
          <span>Class</span>
          <strong>{{ itemKlass }}</strong>
        </li>
        <li class="level">
          <span>Level</span>
          <strong>{{ itemLevel }}</strong>
        </li>
        <li class="score">
          <span>Power Score</span>
          <strong>{{ itemPower }}</strong>
        </li>
        <li class="price">
          <span>Sale Price</span>
          <strong class="ico-wemixcredit ico-xs add-inside"
          ><span>{{ itemPrice }}</span></strong
          >
        </li>
        <li class="apply">
          <button v-if="ButtonType == '판매대기중'" type="button" disabled="disabled" class="btn btn-sm">판매 대기중</button>
          <button v-if="ButtonType == '판매취소중'" type="button" disabled="disabled" class="btn btn-sm">판매 취소</button>
          <button v-if="ButtonType == '판매취소'" type="button" class="btn btn-primary2 btn-sm">판매 취소</button>
        </li>
      </ul>
    </div>
    <div v-if="myitemType == 'seal'" class="myitem-detail seal">
      <ul class="list">
        <li class="klass">
          <span>Class</span>
          <strong>{{ itemKlass }}</strong>
        </li>
        <li class="level">
          <span>Level</span>
          <strong>{{ itemLevel }}</strong>
        </li>
        <li class="enhance">
          <span>Power Score</span>
          <strong>{{ itemPower }}</strong>
        </li>
        <li class="apply">
          <button type="button" class="btn btn-primary-nft">판매하기</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import NftItemInfo from '@/components-ui/desktop/NftItemInfo';

export default defineComponent({
  name: 'NftMyItem',
  meta: {
    title: 'NFT | XDRACO',
    hasSubNav: 'nft',
  },
  components: {
    // ItemInfo,
    NftItemInfo,
  },
  props: {
    myitemType: {
      type: String,
      required: false,
      default: () => 'sale',
    },
    itemCategory: {
      type: String,
      required: false,
      default: () => '',
    },
    itemName: {
      type: String,
      required: false,
      default: () => '',
    },
    itemKlass: {
      type: String,
      required: false,
      default: () => '',
    },
    itemLevel: {
      type: String,
      required: false,
      default: () => '',
    },
    // itemCount: {
    //   type: String,
    //   required: false,
    //   default: () => '',
    // },
    // snCode: {
    //   type: String,
    //   required: false,
    //   default: () => '',
    // },
    // itemEnhance: {
    //   type: String,
    //   required: false,
    //   default: () => '',
    // },
    itemPower: {
      type: String,
      required: false,
      default: () => '',
    },
    itemPrice: {
      type: String,
      required: false,
      default: () => '',
    },
    ButtonType: {
      type: String,
      required: false,
      default: () => '',
    },
    // itemRate: {
    //   type: String,
    //   required: false,
    //   default: () => '',
    // },
    // itemSettlement: {
    //   type: String,
    //   required: false,
    //   default: () => '',
    // },
  },
  data: () => ({}),
  mounted() {},
  methods: {},
});
</script>

<style lang="scss">
@mixin ellipsis($line: 1) {
  display: block;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis !important;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-word; //break-all; 0516, update issue.
  -webkit-line-clamp: $line;
}

.myitem {
  //896 | 376, 520
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  //align-items: flex-start; //soldout

  //판매중
  &[data-sale-type='sale'],
  &[data-sale-type='0'] {
    .myitem-detail {
      flex: 0 0 520px;
    }
  }
  //판매완료
  &[data-sale-type='soldout'],
  &[data-sale-type='1'] {
    align-items: flex-start;
  }
  //봉인중
  &[data-sale-type='seal'],
  &[data-sale-type='2'] {
  }

  //구매
  &[data-sale-type='purchase'],
  &[data-sale-type='3'] {
    align-items: flex-start;
  }

  .item-info {
    flex: 0 0 376px;
  }
  .myitem-detail {
    flex: 0 0 448px;
    .list {
      display: flex;
      line-height: normal;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      li {
        font-size: 12px;
        font-weight: normal;
        color: rgba(#fff, 0.5);
        margin-left: 8px;
        &:first-of-type {
          margin-left: 0;
        }
        &.enhance {
          //flex: 0 0 154px;
          flex: 0 0 121px;
        }
        &.score {
          flex: 0 0 121px;
        }
        &.price {
          flex: 0 0 121px;
          .ico-darco {
            span {
              @include ellipsis();
            }
          }
        }
        &.apply {
          .btn {
            min-width: 125px;
            min-height: 48px;
            height: inherit;
            padding: 8px;
          }
          //판매하기 버튼, 여기서만 쓰임.
          .btn-sell {
            min-width: 125px;
            min-height: 48px;
            font-size: 16px;
            font-weight: 700;
            line-height: normal;
            color: #fff;
            padding: 0 8px;
            border-style: solid;
            border-width: 1px;
            border-image-source: linear-gradient(to bottom, #fff6a5, #897b00);
            border-image-slice: 1;
            background-image: linear-gradient(111deg, #000 0%, #323200 51%, #000 100%);
          }
        }
        strong,
        span {
          display: block;
        }
        strong {
          font-size: 16px;
          margin-top: 4px;
          color: #fff;
        }
      }
    }

    .spec {
      line-height: normal;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        font-weight: normal;
        color: #fff;
        margin-top: 16px;

        &:first-of-type {
          margin-top: 0;
        }
        &.date {
          strong {
            font-weight: normal;
          }
        }
        strong {
          font-size: 14px;
          &.negative {
            color: #f00;
          }
          &.ico-darco.ico-xs {
            font-size: 24px;
          }
        }
      }
    }
  }

  &.nft-myitem {
    .myitem-detail.seal {
      .list {
        li.klass,
        li.level,
        li.score {
          flex: 0 0 150px;
        }
      }
    }
    .myitem-detail.sale {
      .list {
        li.klass,
        li.level,
        li.score {
          flex: 0 0 108px;
        }
      }
    }
  }
}

// 버튼 폰트 사이즈 조정
.nft-myitem {
  .btn.btn-primary-nft {
    font-size: 16px;
  }
}
</style>
