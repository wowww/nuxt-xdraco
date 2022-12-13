<template>
  <div class="block2">
    <div class="wrap-define-balance">
      <dl class="define-balance">
        <dt>{{ $t(ongoing ? 'w.rounds.total.stake' : 'w.rounds.total.pre.stake') }}</dt>
        <dd class="draco">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{ total | currency(0) }}</span>
            </template>
            <span>{{ total | currency(0) }}</span>
          </v-tooltip>
        </dd>
      </dl>
      <dl class="define-balance">
        <dt>{{ $t(ongoing ? 'w.rounds.my.stake' : 'w.rounds.my.pre.stake') }}</dt>
        <dd class="draco">
          <span>{{ my | currency(0) }}</span>
        </dd>
      </dl>
      <dl class="define-balance">
        <dt>{{ $t(ongoing ? 'w.rounds.my.odds' : 'w.rounds.my.pre.odds') }}</dt>
        <dd class="odds">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{ odds }}</span
              >%
            </template>
            <span>{{ odds | currency(6) }}</span>
          </v-tooltip>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'RoundBodyStatus',
  props: {
    total: Number,
    my: Number,
    odds: Number,
    ongoing: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
