<template>
  <main class="contents nft">
    <section class="section">
      <div class="section__inner">
        <div class="subnav-block"></div>
        <div class="wrap-grid">
          <div class="wrap-grid__timeline">
            <div class="myitem-list">
              <v-tabs v-model="selectedTab" class="tab-rounds">
                <v-tab class="tab-rounds__item">
                  <span>{{ $t('w.exd.my-items.tab.seal') }}</span>
                </v-tab>
                <v-tab class="tab-rounds__item">
                  <span>{{ $t('w.exd.my-items.tab.sale') }}</span>
                </v-tab>
              </v-tabs>

              <div class="wrap-list">
                <!-- v-tabs-items 안에 들어가면 sticky disabled. -->

                <v-tabs-items v-model="selectedTab">
                  <v-tab-item class="tab-seal">
                    <!-- 업데이트 예정: 봉인 캐릭터 업데이트 예정 -->
                    <div class="continued">
                      <dl>
                        <dt>{{ $t('s.nft.sealed.character.updated.soon') }}</dt>
                        <dd>{{ $t('s.nft.check.wallet.sealed') }}</dd>
                      </dl>
                    </div>
                  </v-tab-item>
                  <v-tab-item class="tab-sale">
                    <!-- 업데이트 예정: 판매 캐릭터 목록 업데이트 예정 -->
                    <div class="continued">
                      <dl>
                        <dt>{{ $t('s.nft.active.character.updated.soon') }}</dt>
                        <dd>{{ $t('s.nft.check.wallet.nft.menu') }}</dd>
                      </dl>
                    </div>
                  </v-tab-item>
                </v-tabs-items>
              </div>
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

  </main>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api';

import AccountInfo from '@/components/account/AccountInfo';
import SidebarContactUs from '@/components/common/SidebarContactUs';

export default defineComponent({
  name: 'NftMyItemList',
  meta: {
    title: 'NFT | XDRACO',
    hasSubNav: 'nft',
  },
  components: {
    AccountInfo,
    SidebarContactUs
  },
  setup() {
    const state = reactive({
      selectedTab: 0,
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';

.continued {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 25px;
  height: 400px;
  box-sizing: content-box;
  text-align: center;
  dl {
    dt {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
    dd {
      font-size: 14px;
      color: rgba($color: #fff, $alpha: 0.6);
    }
  }
}
</style>
