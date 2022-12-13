<template>
  <div v-if="represent" class="char-info">
    <div class="char">
      <character-class-thumb :character-class="represent.class" :size="96" />
      <div class="wrap-nick">
        <strong class="nick">{{ represent.characterName }}</strong>
        <span class="server">{{ represent.worldName }}</span>
      </div>
    </div>
    <div v-if="showBalance && balance" class="amount">
      <dl class="balance">
        <dt>{{ $t('w.rounds.stake.draco.balance') }}</dt>
        <dd>
          <span class="ico-darco ico-xs add-inside">{{ balance.DRACO | currency(0) }}</span>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import CharacterClassThumb from '@/components/common/CharacterClassThumb';

const { useState: useAccountState, useMutations: useAccountMutations, useGetters: useAccountGetters } = createNamespacedHelpers('account');

export default defineComponent({
  name: 'MyPresentCharacter',
  components: {
    CharacterClassThumb,
  },
  props: {
    showBalance: {
      type: Boolean,
      default: false,
    }
  },
  setup() {
    const { balance } = useState(['balance']);
    const { represent } = useAccountState(['represent']);

    return {
      represent,
      balance,
    };
  },
});
</script>
