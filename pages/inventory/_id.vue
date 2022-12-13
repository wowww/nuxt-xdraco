<template>
  <main class="contents market inventory-item" :class="`bg-grade-${myItem ? myItem.item.grade : ''}`">
    <section class="section">
      <div class="section__inner">
        <div class="subnav-block"></div>
        <back-button />
        <div class="wrap-grid">
          <div class="wrap-grid__timeline">
            <div v-if="myItem" class="exchange-market">
              <div class="wrap-addition">
                <div class="wrap-card">
                  <item-card :item="myItem.item" :collectible="!!myItem.item.uniqueNo" />
                </div>
                <div class="wrap-addition__detail">
                  <validation-provider ref="form" v-slot="{ errors }" tag="div" class="wrap-item-desc" :rules="{ required: true, decimal2: true }">
                    <exchange-item-description :item="myItem.item" />

                    <template v-if="isDesktop">
                      <div class="wrap-form">
                        <div class="wrap-form__header">
                          <h3 class="wrap-form__title">{{ $t('w.exd.sales.price') }}</h3>
                          <strong class="wrap-form--notice" v-html="$t('s.exd.purchase.desc.1', [5])"></strong>
                        </div>

                        <div class="fieldset editable">
                          <div>
                            <span class="ico-hydra ico-ss"><em class="hidden">DRACO</em></span>
                            <input v-model="price" type="text" :placeholder="$t('w.exd.sales.price')" maxlength="10" @keydown="inputPrice" @keyup="inputPrice"/>
                          </div>
                          <div class="in-msg">
                            <span>{{ $t('t.exd.tx.earned') }}</span>
                            <span class="ico-hydra ico-nano add-inside">{{ earned | currency(4) }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="wrap-button">
                        <button type="button" class="btn btn-primary-exd" :disabled="errors.length > 0" @click="openRegister = true">
                          {{ $t('w.exd.purchase.register') }}
                        </button>
                      </div>
                    </template>
                  </validation-provider>
                  <div v-if="myItem.item.powerScore > 0 || myItem.item.options.length > 0" class="wrap-option">
                    <h2 class="wrap-option__title">{{ myItem.item.powerScore > 0 ? $t('t.exd.power.score') : $t('w.exd.options') }}</h2>
                    <div class="wrap-option__score">
                      <span class="ico-total">{{ myItem.item.powerScore | currency(0) }}</span>
                    </div>

                    <ul v-if="myItem.item.options" class="wrap-option__list">
                      <item-option v-for="option in myItem.item.options" :key="`option-${option.optionName}`" :option="option" />
                    </ul>
                  </div>
                  <div v-if="myItem.item.itemType === '17_2' && myItem.item.passiveOption && myItem.item.passiveOption.petOrigin" class="wrap-option">
                    <h2 class="wrap-option__title">{{ myItem.item.passiveOption.petOrigin }}</h2>
                    <ul class="wrap-option__list">
                      <item-option :option="{ optionName: myItem.item.passiveOption.desc }" />
                    </ul>
                  </div>
                  <div v-if="myItem.item.addOptions.length > 0" class="wrap-option">
                    <h2 class="wrap-option__title">{{ $t('t.exd.add.options') }}</h2>
                    <ul class="wrap-option__list">
                      <item-option v-for="option in myItem.item.addOptions" :key="`option-${option.optionName}`" :option="option" />
                    </ul>
                  </div>
                  <!-- .wrap-seller -->
                </div>
              </div>

              <exd-daily-avg-price-chart :item-id="myItem.item.itemID" :enhance="myItem.item.enhance" :grade="myItem.item.grade" />

              <!-- .wrap-suggest -->
              <div class="wrap-overall">
                <div class="wrap-overall__header overall-header">
                  <h2 class="wrap-overall__title title">{{ $t('t.exd.overall.stat', [myItem.item.name]) }}</h2>
                </div>
                <div v-if="stat && Object.keys(stat).length !== 0" class="wrap-overall__list overall-list">
                  <ul>
                    <li>
                      <item-stat :title="$t('t.exd.recent.price')" :price="stat.recentPrice.price || '0'" :date="stat.recentPrice.time" />
                    </li>
                    <li>
                      <item-stat :title="$t('t.exd.highest.price')" :price="stat.maxPrice.price || '0'" :date="stat.maxPrice.time" />
                    </li>
                    <li>
                      <item-stat :title="$t('t.exd.average.price')" :price="stat.averagePrice.price || '0'" :date="stat.averagePrice.time" />
                    </li>
                    <li>
                      <item-monthly-stat :title="$t('t.exd.trade.volume')" :value="stat.totalVolume.volume" />
                    </li>
                  </ul>
                </div>
              </div>
              <v-dialog
                v-model="openRegister"
                content-class="dialog-register theme-dark"
                max-width="640"
                persistent
                :transition="!isDesktop ? 'dialog-bottom-transition' : ''"
              >
                <div class="content">
                  <v-btn class="btn-close" fab plain x-small @click="openRegister = false">
                    <v-icon color="#fff" size="26">mdi-close</v-icon>
                  </v-btn>
                  <!-- dialogTitle이 있는 경우 대비 -->
                  <div class="dialog-register__header">
                    <h2 class="dialog-register__header__title">{{ $t('w.exd.event.listing') }}</h2>
                  </div>

                  <div v-if="myItem" class="dialog-register__contents">
                    <div class="dialog-register__contents__info">
                      <div class="dialog-register__contents__info__card">
                        <item-card :item="myItem.item" :collectible="!!myItem.item.uniqueNo" />
                      </div>

                      <div class="dialog-register__contents__info__item">
                        <exchange-item-description :item="myItem.item" />

                        <div class="dialog-register__contents__info__price">
                          <span>{{ $t('w.exd.purchase.price') }}</span>
                          <strong class="ico-hydra ico-sm add-inside">{{ price | currency(2) }}</strong>
                        </div>

                        <ul class="dialog-register__contents__list">
                          <li v-html="$t('s.exd.purchase.desc.1', [5])"></li>
                          <li>{{ $t('s.exd.purchase.desc.2') }}</li>
                          <li>{{ $t('s.exd.purchase.desc.3') }}</li>
                          <li>{{ $t('s.exd.purchase.desc.4') }}</li>
                          <li>{{ $t('s.exd.purchase.desc.5', [14]) }}</li>
                        </ul>
                      </div>
                    </div>

                    <div class="wrap-button">
                      <button type="button" class="btn btn-primary2" :disabled="loading" @click="register">
                        {{ $t('w.exd.purchase.register') }}
                      </button>
                    </div>
                  </div>
                </div>
              </v-dialog>
            </div>
          </div>
          <div class="wrap-grid__side">
            <aside class="wrap-grid__side__bar">
              <account-info />
              <sidebar-contact-us />
            </aside>
          </div>
        </div>
      </div>
    </section>

    <div v-if="!isDesktop" class="float-bottom">
      <div class="register">
        <validation-provider
          ref="form" v-slot="{ errors }" tag="div" class="register__validation"
          :rules="{ required: true, decimal2: true }">
          <div class="wrap-form">
            <div class="wrap-form__header">
              <h3 class="wrap-form__title">{{ $t('w.exd.sales.price') }}</h3>
              <strong class="wrap-form--notice" v-html="$t('t.exd.tx.fee', [5])"></strong>
            </div>
            <!-- focus -->
            <div class="fieldset editable">
              <div>
                <span class="ico-hydra ico-xs"><em class="hidden">DRACO</em></span>
                <input
                  v-model="price" type="text" :placeholder="$t('w.exd.sales.price')" @keyup="inputPrice"
                  @keydown="inputPrice"/>
              </div>
            </div>
          </div>
          <div class="wrap-button">
            <button
              type="button" class="btn btn-primary-exd" :disabled="errors.length > 0"
              @click="openRegister = true">
              {{ $t('w.exd.purchase.register') }}
            </button>
          </div>
        </validation-provider>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch, onBeforeMount } from '@vue/composition-api';
import BigNumber from 'bignumber.js';
import { createNamespacedHelpers, useState, useMutations } from 'vuex-composition-helpers/dist';

import AccountInfo from '@/components/account/AccountInfo';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import BackButton from '@/components/common/BackButton';
import ItemCard from '@/components/common/item/ItemCard';
import ItemOption from '@/components/common/item/ItemOption';
import ExchangeItemDescription from '@/components/exd/common/ExchangeItemDescription';
import ExdDailyAvgPriceChart from '@/components/exd/common/ExdDailyAvgPriceChart';
import ItemMonthlyStat from '@/components/exd/common/ItemMonthkyStat';
import ItemStat from '@/components/exd/common/ItemStat';
import { MyItemTab } from '@/constants/exchange';

const { useState: useExdState, useActions: useExdActions, useMutations: useExdMutations } = createNamespacedHelpers('exd');

export default defineComponent({
  name: 'InventoryItemPage',
  components: {
    BackButton,
    ItemCard,
    ExchangeItemDescription,
    ItemOption,
    ItemStat,
    ItemMonthlyStat,
    ExdDailyAvgPriceChart,
    AccountInfo,
    SidebarContactUs,
  },
  meta: {
    title: 'Inventory | XDRACO',
    hasSubNav: 'inventory',
    auth: true,
  },
  setup(props, { root }) {
    const { $i18n, $route, $router, $dracoWebApi } = root;
    const itemUID = $route.params.id;

    if (!itemUID) {
      $router.replace('/exd/my-items');
    }

    const form = ref(null);
    const state = reactive({
      stat: null,
      openRegister: false,
      loading: false,
      price: '',
    });

    const { isDesktop } = useState(['isDesktop']);
    const { myItem } = useExdState(['myItem']);
    const { setMyItemTab } = useExdMutations(['setMyItemTab']);
    const { fetchMyItem } = useExdActions(['fetchMyItem']);

    const { setCommonModal } = useMutations(['setCommonModal']);

    const inputPrice = (v) => {
      if (state.price) {
        state.price = state.price.replace(/[^0-9.]/g, '');
      }
    };

    const earned = computed(() => {
      if (state.price && !Number.isNaN(state.price)) {
        return new BigNumber(state.price).times(0.95).toString();
      }

      return '0';
    });

    const register = async () => {
      if (state.loading) {
        return;
      }

      const { errors } = await form.value.validate();

      if (errors && errors.length > 0) {
        return;
      }

      state.loading = true;

      $dracoWebApi
        .post('/exd/item', {
          itemUID,
          price: state.price,
        })
        .then(({ data }) => {
          state.loading = false;
          if (data.code === 200) {
            setCommonModal({
              open: true,
              title: root.$t('t.exd.purchase.register.complete'),
              desc: root.$t('s.exd.purchase.register.complete', [myItem.value.item.name || myItem.value.item.itemName]),
              primary: 'OK',
              onPrimary() {
                setMyItemTab(MyItemTab.SALE);
                root.$router.push('/exd/my-items');
              },
            });
          } else {
            setCommonModal({
              open: true,
              title: root.$t('t.exd.register.failed'),
              desc: `Error Code : ${data.code}`,
              primary: 'OK',
            });
          }
        })
        .catch(() => {
          state.loading = false;
        });
    };

    onBeforeMount(() => {
      document.documentElement.classList.add('init-inventory-item');
    });

    onMounted(() => {
      fetchMyItem(itemUID);
    });

    const fetchSummary = () => {
      $dracoWebApi
        .get('/exd/sameitem/summary', {
          params: {
            itemID: myItem.value.item.itemID,
            enhance: myItem.value.item.enhance,
          },
        })
        .then(({ data }) => {
          if (data.code === 200) {
            state.stat = { ...data.data };
          }
        });
    };

    watch(
      () => myItem.value,
      () => {
        if (myItem.value) {
          if (form.value) {
            form.value.validate();
          }

          fetchSummary();
        }
      },
    );

    watch(
      () => $i18n.locale,
      () => {
        fetchMyItem(itemUID);
      },
    );

    return {
      ...toRefs(state),
      isDesktop,
      myItem,
      form,
      inputPrice,
      register,
      earned,
    };
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',

    // for layer-price-range
    showLayerPriceRange: false,

    // for nav in .list-bar
    itemsRecommend: null,
    itemsExplorer: null,
  }),
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
  destroyed() {
    document.documentElement.classList.remove("init-inventory-item");
  },
  methods: {
    toogleLayerPriceRange() {
      this.showLayerPriceRange = !this.showLayerPriceRange;

      setTimeout(() => {
        if (this.showLayerPriceRange) {
          const inputFrom = this.$el.querySelector('#inputFrom');
          inputFrom.focus();
        }
      }, 10);
    },
    emitSelectOrder() {
      if (!this.showLayerPriceRange) {
        return;
      }
      this.showLayerPriceRange = false;
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/mixin';
@import '~@/assets/sass/common/pages/popup-exchange';

.inventory-item {
  .exchange-market {
    padding: 0 20px;
    .wrap-addition {
      margin-top: 0;
    }
  }
}

@include pc {
  .contents[class*=market] {
    &.inventory-item {
      background-position-x: 45% !important;
    }
  }
  .inventory-item {
    .section {
      margin: 0;
    }

    .exchange-market {
      padding: 0;
    }
  }
  .footer {
    margin-bottom: 0;
  }
}

@include large-pc {
  .contents[class*=market] {
    &.inventory-item {
      background-position-x: 65% !important;
    }
  }
}
</style>
