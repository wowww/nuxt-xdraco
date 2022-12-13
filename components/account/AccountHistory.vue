<template>
  <v-card class="my-activity">
    <div class="tabs-content">
      <div v-if="notifies && notifies.length === 0" class="msgbox vcenter">
        <div>
          <h4 class="title">{{ $t('s.account.history.no-activity') }}</h4>
          <div class="desc">{{ $t('s.account.history.message.participate') }}</div>
        </div>
      </div>
      <template v-else>
        <div class="list-header">
          <div class="msg-notice">{{ $t('s.account.history.90days') }}</div>
        </div>
        <div class="iscroll">
          <ul class="list">
            <li v-if="active === 2 && loading">
              <div :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
                <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
              </div>
            </li>
            <history-item v-for="(notify, notiIdx) in notifies" :key="`noti-${notiIdx}`" :history="notify" />
          </ul>
        </div>
      </template>
    </div>
  </v-card>
</template>

<script>
import { defineComponent, onMounted, watch } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import HistoryItem from '@/components/account/HistoryItem';
import { AccountTab } from '@/constants/accounts';

const { useState, useActions } = createNamespacedHelpers('account');

export default defineComponent({
  name: 'AccountHistory',
  components: { HistoryItem },
  setup() {
    const { open, active, loading, notifies } = useState(['open', 'active', 'loading', 'notifies']);
    const { fetchNotifies } = useActions(['fetchNotifies']);

    onMounted(() => {
      fetchNotifies();
    });

    watch([open, active], ([currentOpen, currentActive]) => {
      if (currentOpen && currentActive === AccountTab.HISTORY) {
        fetchNotifies();
      }
    });

    return {
      open,
      active,
      loading,
      notifies,
      fetchNotifies,
    };
  },
});
</script>
