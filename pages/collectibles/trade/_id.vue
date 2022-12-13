<template>
  <main class="contents market collectibles-trade" :class="`bg-grade-${collectibleItem ? collectibleItem.item.grade : ''}`">
    <section class="section">
      <div class="section__inner">
        <div class="subnav-block"></div>
        <back-button />
        <div class="wrap-grid">
          <div class="wrap-grid__timeline">
            <div v-if="collectibleItem" class="exchange-market">
              <div class="wrap-addition">
                <!-- 디자인파트에서 원하는 기능인거 같습니다. -->
                <!-- https://renatodeleao.github.io/vue-sticky-directive/ -->
                <!-- https://codesandbox.io/s/mm4olmxkrx -->
                <div class="wrap-card">
                  <item-card :item="collectibleItem.item" collectible />
                </div>
                <div class="wrap-addition__detail">
                  <div class="wrap-item-desc">
                    <exchange-item-description :item="collectibleItem.item" />

                    <div v-if="collectibleItem.myItem == 0" class="wrap-button price-button">
                      <button type="button" class="btn btn-primary-exd" @click="openTrade">
                        <exd-hydra-price :price="collectibleItem.price" :hide-label="true" icon-size="ss" />
                      </button>
                    </div>
                    <div v-else class="wrap-credit">
                      <div class="credit-info">
                        <div class="category">{{ $t('w.exd.sales.price') }}</div>
                        <div class="info">
                          <span class="ico-hydra ico-sm add-inside"
                          >{{ formattedPrice[0] }}<small>{{ formattedPrice[1] }}</small></span
                          >
                        </div>
                      </div>
                      <div class="wrap-button">
                        <button type="button" class="btn btn-primary2" @click="openCancel">{{ $t('t.exd.sales.cancel') }}</button>
                      </div>
                    </div>
                  </div>

                  <h2 class="title">{{ $t('w.collectible.info') }}</h2>
                  <div class="wrap-collectible-info" :data-item-grade="collectibleItem.item.grade">
                    <!-- <div class="wrap-collectible-info" data-item-grade="4"> -->
                    <!-- <div class="wrap-collectible-info" data-item-grade="3"> -->
                    <div class="wrap-info">
                      <dl class="define">
                        <dt>{{ $t('w.collectible.source') }}</dt>
                        <dd>DSP Season {{ dspSeason }}</dd>
                      </dl>
                      <dl class="define">
                        <dt>{{ $t('w.exd.unique.no') }}</dt>
                        <dd>{{ collectibleItem.item.uniqueNo }}</dd>
                      </dl>
                      <dl class="define">
                        <dt>{{ $t('w.collectible.limit-no') }}</dt>
                        <dd>
                          {{
                            collectibleItem.item.limited ||
                            `#${UniqueDict[collectibleItem.item.uniqueNo].idx} / ${UniqueDict[collectibleItem.item.uniqueNo].count}`
                          }}
                        </dd>
                      </dl>
                      <dl class="define">
                        <dt>{{ $t('w.collectible.state') }}</dt>
                        <dd>XDRACO</dd>
                      </dl>
                    </div>
                    <div class="info-message">
                      <template v-if="['2', '3', '4'].includes(collectibleItem.item.itemType.split('_')[0])">
                        <p style="margin-bottom: 4px">{{ $t(`s.collectible.info.item-type.${collectibleItem.item.itemType.split('_')[0]}`) }}</p>
                      </template>
                      <p>{{ $t('s.collectible.info.mintable') }}</p>
                    </div>
                  </div>

                  <div v-if="collectibleItem.item.powerScore > 0 || collectibleItem.item.options.length > 0" class="wrap-option">
                    <h2 class="wrap-option__title">{{ collectibleItem.item.powerScore > 0 ? $t('t.exd.power.score') : $t('w.exd.options') }}</h2>
                    <div v-if="collectibleItem.item.powerScore > 0" class="wrap-option__score">
                      <span class="ico-total">{{ collectibleItem.item.powerScore | currency(0) }}</span>
                    </div>

                    <ul v-if="collectibleItem.item.options" class="wrap-option__list">
                      <item-option v-for="option in collectibleItem.item.options" :key="`option-${option.optionName}`" :option="option" />
                    </ul>
                  </div>
                  <div
                    v-if="
                      collectibleItem.item.itemType === '17_2' && collectibleItem.item.passiveOption && collectibleItem.item.passiveOption.petOrigin
                    "
                    class="wrap-option"
                  >
                    <h2 class="wrap-option__title">{{ collectibleItem.item.passiveOption.petOrigin }}</h2>
                    <ul class="wrap-option__list">
                      <item-option :option="{ optionName: collectibleItem.item.passiveOption.desc }" />
                    </ul>
                  </div>
                  <div v-if="collectibleItem.item.addOptions.length > 0" class="wrap-option">
                    <h2 class="wrap-option__title">{{ $t('t.exd.add.options') }}</h2>
                    <ul class="wrap-option__list">
                      <item-option v-for="option in collectibleItem.item.addOptions" :key="`option-${option.optionName}`" :option="option" />
                    </ul>
                  </div>

                  <div class="wrap-seller">
                    <div class="seller">
                      <div class="char-info">
                        {{ $t('w.exd.seller') }}
                        <strong>
                          <v-tooltip bottom>
                            <template #activator="{ on, attrs }">
                              <span v-bind="attrs" v-on="on">{{ collectibleItem.seller.walletAddress | truncateMiddle }}</span>
                            </template>
                            <span>{{ collectibleItem.seller.walletAddress }}</span>
                          </v-tooltip>
                        </strong>
                      </div>
                      <div class="sale">
                        {{ $t('w.exd.listed') }}
                        <strong>{{ collectibleItem.seller.saleCount }}</strong>
                      </div>
                      <div class="completed">
                        {{ $t('w.exd.tx.complete') }}
                        <strong>{{ collectibleItem.seller.soldOutCount }}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <exd-daily-avg-price-chart
                :item-id="collectibleItem.item.itemID"
                :enhance="collectibleItem.item.enhance"
                :grade="collectibleItem.item.grade"
              />
              <div v-if="suggestedTradeItems.filter((item) => item.tradeUID != collectibleItem.tradeUID).length > 0" class="wrap-suggest">
                <div class="wrap-suggest__header">
                  <h2 class="wrap-suggest__header__title">{{ $t('t.exd.similar.listings') }}</h2>
                  <div class="wrap-suggest__item">
                    <item-info :item="collectibleItem.item" hide-unique-no />
                    <div class="wrap-suggest__view-more">
                      <nuxt-link :to="`/exd/suggested?itemID=${collectibleItem.item.itemID}&enhance=${collectibleItem.item.enhance}`">
                        <span class="wrap-suggest__view-more__link">{{ $t('t.exd.view.more') }}</span>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
                <div class="wrap-suggest__contents">
                  <ul class="wrap-suggest__list">
                    <router-link
                      v-for="suggestItem in suggestedTradeItems.filter((item) => item.tradeUID != collectibleItem.tradeUID).slice(0, 5)"
                      :key="`suggested-item-${suggestItem.tradeUID}`"
                      tag="li"
                      :to="`/exd/trade/${suggestItem.tradeUID}`"
                      style="cursor: pointer"
                    >
                      <item-seller :seller="suggestItem.seller" />
                      <div class="enhance">
                        <span>{{ $t('w.common.item.enhance') }}</span
                        ><strong>+{{ suggestItem.item.enhance }}</strong>
                      </div>
                      <div class="score">
                        <span>{{ $t('t.exd.power.score') }}</span
                        ><strong>{{ suggestItem.item.PowerScore | currency(0) }}</strong>
                      </div>
                      <div class="price">
                        <span>{{ $t('w.exd.sales.price') }}</span
                        ><strong class="ico-hydra ico-ss add-inside"
                      ><span>{{ suggestItem.price | currency(0) }}</span></strong
                      >
                      </div>
                    </router-link>
                  </ul>
                </div>
              </div>
              <div class="wrap-overall">
                <div class="wrap-overall__header">
                  <h2 class="wrap-overall__title">
                    {{
                      $t('t.exd.overall.stat', [
                        `${collectibleItem.item.itemName || collectibleItem.item.name}${
                          collectibleItem.item.enhance > 0 ? '+ ' + collectibleItem.item.enhance : ''
                        }`,
                      ])
                    }}
                  </h2>
                </div>
                <div v-if="stat && Object.keys(stat).length !== 0" class="wrap-overall__list">
                  <ul>
                    <li>
                      <item-stat :title="$t('t.exd.recent.price')" :price="stat.recentPrice.price" :date="stat.recentPrice.time" />
                    </li>
                    <li>
                      <item-stat :title="$t('t.exd.highest.price')" :price="stat.maxPrice.price" :date="stat.maxPrice.time" />
                    </li>
                    <li>
                      <item-stat :title="$t('t.exd.average.price')" :price="stat.averagePrice.price" :date="stat.averagePrice.time" />
                    </li>
                    <li>
                      <item-monthly-stat :title="$t('t.exd.trade.volume')" :value="stat.totalVolume.volume" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-else-if="errorCode">Server Error : {{ errorCode }}</div>
          </div>
          <!-- Side Contents -->
          <div class="wrap-grid__side">
            <aside class="wrap-grid__side__bar">
              <account-info />
              <sidebar-contact-us />
            </aside>
          </div>
        </div>
      </div>
    </section>
    <modal-exchange />

    <div class="float-bottom collectibles">
      <div v-if="collectibleItem" class="register">
        <item-info v-if="isDesktop" :item="collectibleItem.item" />
        <div class="wrap-buy">
          <div class="price">
            <strong class="ico-hydra ico-sm add-inside"
            >{{ formattedPrice[0] }}<small>{{ formattedPrice[1] }}</small></strong
            >
            <span class="rate us-dollar"
            >{{ formattedUsd[0] }}<small>{{ formattedUsd[1] }}</small></span
            >
          </div>
          <button v-if="collectibleItem.myItem == 0" type="button" class="btn btn-primary-exd" @click="openTrade">
            {{ $t('w.exd.event.purchase') }}
          </button>
          <button v-else type="button" class="btn btn-primary" @click="openCancel">{{ $t('t.exd.sales.cancel') }}</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
  watch
} from '@vue/composition-api';
import { createNamespacedHelpers, useActions, useMutations, useState } from 'vuex-composition-helpers/dist';

import AccountInfo from '@/components/account/AccountInfo';
import { useWemixLogin } from '@/utils/composables/round';
import { useFormattedRefNumber } from '@/utils/composables/common';
import BackButton from '@/components/common/BackButton';
import { UniqueDict } from '@/constants/exchange';
import ExdDailyAvgPriceChart from '@/components/exd/common/ExdDailyAvgPriceChart';
import ItemCard from '@/components/common/item/ItemCard';
import ItemOption from '@/components/common/item/ItemOption';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import ExchangeItemDescription from '@/components/exd/common/ExchangeItemDescription';
import ExdHydraPrice from '@/components/exd/common/ExdHydraPrice';
import ItemInfo from '@/components/exd/common/ItemInfo';
import ItemMonthlyStat from '@/components/exd/common/ItemMonthkyStat';
import ItemSeller from '@/components/exd/common/ItemSeller';
import ItemStat from '@/components/exd/common/ItemStat';
import ModalExchange from '@/components/exd/common/modal/ModalExchange';
import { useHydraToUsd } from '@/utils/composables/exchange';

const { useState: useAccountState } = createNamespacedHelpers('account');
const {
  useState: useCollectibleState,
  useActions: useCollectibleActions,
  useMutations: useCollectibleMutations,
} = createNamespacedHelpers('collectible');

const { useState: useExdState, useActions: useExdActions, useMutations: useExdMutations } = createNamespacedHelpers('exd');
const { useState: useHspState, useActions: useHspActions, useMutations: useHspMutations } = createNamespacedHelpers('hsp');

export default defineComponent({
  name: 'CollectibleItem',
  meta: {
    title: 'COLLECTIBLES | XDRACO',
    hasSubNav: 'collectibles',
    hasBottomSticky: 'type1',
  },
  components: {
    ExdHydraPrice,
    ExdDailyAvgPriceChart,
    BackButton,
    ItemStat,
    ItemMonthlyStat,
    ModalExchange,
    AccountInfo,
    ItemSeller,
    ItemOption,
    ExchangeItemDescription,
    ItemCard,
    ItemInfo,
    SidebarContactUs,
  },
  setup(props, { root }) {
    const { $i18n, $route, $router, $store } = root;
    const tradeUID = $route.params.id;

    if (!tradeUID) {
      return $router.replace('/collectibles');
    }

    const state = reactive({
      stat: null,
      suggestedTradeItems: [],
      suggestedTradeItemsMore: false,
    });

    const { wemixLogin } = useWemixLogin(root);

    const { loading, item: collectibleItem, errorCode } = useCollectibleState(['loading', 'item', 'errorCode']);
    const { fetchCollectibleItem } = useCollectibleActions(['fetchCollectibleItem']);
    const { setOpenExchange, setExchangeItem } = useExdMutations(['setOpenExchange', 'setExchangeItem']);

    const { accessToken, balance, isDesktop } = useState(['dracoAccessToken', 'balance', 'isDesktop']);
    const { setCommonModal, setOpenDracoLogin } = useMutations(['setCommonModal', 'setOpenDracoLogin']);
    const { closeModal } = useActions(['closeModal']);

    const { exist } = useAccountState(['exist']);

    const dspSeason = computed(() => {
      if (collectibleItem.value) {
        if (collectibleItem.value.item.uniqueNo && collectibleItem.value.item.uniqueNo.match(/^[S02](.+){4,}/)) {
          return 2;
        }
      }

      return 1;
    });

    const formattedPrice = useFormattedRefNumber(collectibleItem);
    const { formattedUsd } = useHydraToUsd(collectibleItem, 'price');

    const openTrade = () => {
      const { dracoAccessToken } = $store.state;
      if (!dracoAccessToken) {
        wemixLogin();
        return;
      }

      if (exist.value === 0) {
        setCommonModal({
          open: true,
          title: 'MIR4 account',
          desc: 'Create a MIR4 account for full access to XDRACO services',
          primary: 'OK',
        });
        return;
      }

      if (balance.value.HYDRA < collectibleItem.value.price) {
        setCommonModal({
          open: true,
          title: root.$t('t.exd.purchase.draco.not-enough'),
          desc: root.$t('s.exd.purchase.draco.not-enough'),
          primary: 'OK',
        });
        return;
      }

      setExchangeItem(collectibleItem.value);
      setOpenExchange(true);
    };

    const openCancel = function() {
      setCommonModal({
        open: true,
        title: root.$t('s.exd.cancel.item', [collectibleItem.value.item.itemName]),
        primary: 'Ok',
        secondary: 'Cancel',
        onPrimary() {
          root.$dracoWebApi.delete('/exd/tradeitem', { params: { tradeUID } }).then(({ data }) => {
            if (data.code === 200) {
              root.$router.replace(`/exd/my-items`);
            }
          });
        },
        onSecondary: () => {
          closeModal();
        },
      });
    };

    const fetchSummary = () => {
      root.$dracoWebApi
        .get('/exd/sameitem/summary', { params: { itemID: collectibleItem.value.item.itemID, enhance: collectibleItem.value.item.enhance } })
        .then(({ data }) => {
          if (data.code === 200) {
            state.stat = { ...data.data };
          }
        });
    };

    watch(
      () => tradeUID,
      (from, to) => {
        fetchCollectibleItem(from);
      },
    );

    watch(
      () => collectibleItem.value,
      () => {
        if (collectibleItem.value) {
          // fetchOtherTrades();
          fetchSummary();
        }
      },
    );

    watch(
      () => $i18n.locale,
      () => {
        fetchCollectibleItem(tradeUID);
      },
    );

    onBeforeMount(() => {
      document.documentElement.classList.add("init-collectibles-item");
    });

    onMounted(function() {
      if (collectibleItem.value && collectibleItem.value.tradeUID !== tradeUID) {
        setExchangeItem(null);
      }
      fetchCollectibleItem(tradeUID);
    });

    onUnmounted(() => {
      setExchangeItem(null);
    });

    return {
      ...toRefs(state),
      isDesktop,
      collectibleItem,
      errorCode,
      loading,
      openTrade,
      openCancel,
      UniqueDict,
      formattedPrice,
      formattedUsd,
      dspSeason,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
  destroyed() {
    document.documentElement.classList.remove("init-collectibles-item");
  }
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';

.collectibles-trade {
  .exchange-market {
    padding: 0 16px;

    .wrap-addition {
      margin-top: 0;
    }
  }
}

@include pc {
  .collectibles-trade {
    .exchange-market {
      padding: 0;
    }

    .float-bottom {
      .register {
        .item-info {
          width: 100%;
        }
      }
    }
  }
}
</style>
