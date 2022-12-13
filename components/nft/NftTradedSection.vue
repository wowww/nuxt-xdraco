<template>
  <ul
    class="list-item recommended rank"
    :data-empty-message="data.list && data.list.length > 0 ? '' : $t('s.nft.empty.traded')"
    style="margin-top: 24px"
  >
    <nft-item
      v-for="(item, itemIdx) in list"
      :key="`nft-traded-item-${item.seq || item.info.seq}`"
      :badge="useBadge"
      :item="{
        ...item.info,
        seller: item.seller,
      }"
      :rank="useRank ? itemIdx + 1 : 0"
      use-link
      :size="''"
      traded
    />
  </ul>
</template>

<script>
import NftItem from '~/components/nft/NftItem';

export default {
  name: 'NftTradedSection',
  components: {
    NftItem,
  },
  computed: {
    list() {
      return this.data.list ? this.data.list.slice(0, 3) : [];
    },
  },
  props: {
    data: {
      type: Object,
    },
    useBadge: {
      type: Boolean,
      default: false,
    },
    useRank: {
      type: Boolean,
      default: false,
    },
  },
};
</script>


