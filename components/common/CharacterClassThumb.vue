<template>
  <img :src="thumbnail" :width="size" :alt="className" />
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import CharacterClass, { findLowercaseKey } from '@/constants/character/character-class';

export default defineComponent({
  name: 'CharacterClassThumb',
  watch: {
    thumbnail(value) {
      console.log('thumbnail', value);
    },
  },
  computed: {
    classCode() {
      return Number(this.characterClass);
    },
    className() {
      return findLowercaseKey(this.classCode);
    },
    thumbnail() {
      if (Number.isNaN(this.classCode) || this.classCode === CharacterClass.ALL) {
        // if executed this scope, it means error are occurred.
        return '';
      }
      const resource = this.resource[this.type][this.classCode];
      return typeof resource === 'string' ? resource : resource[this.grade];
    },
    resource() {
      return {
        thumb: {
          [CharacterClass.WARRIOR]: 'https://file.mir4global.com/xdraco/img/common/profile/thumb-profile-warrior.webp',
          [CharacterClass.SORCERER]: 'https://file.mir4global.com/xdraco/img/common/profile/thumb-profile-sorcerer.webp',
          [CharacterClass.TAOIST]: 'https://file.mir4global.com/xdraco/img/common/profile/thumb-profile-taoist.webp',
          [CharacterClass.ARBALIST]: 'https://file.mir4global.com/xdraco/img/common/profile/thumb-profile-arbalist.webp',
          [CharacterClass.LANCER]: 'https://file.mir4global.com/xdraco/img/common/profile/thumb-profile-lancer.webp',
        },
        profile: {
          [CharacterClass.WARRIOR]: 'https://file.mir4global.com/xdraco/img/common/login-profile/profile-warrior.webp',
          [CharacterClass.SORCERER]: 'https://file.mir4global.com/xdraco/img/common/login-profile/profile-sorcerer.webp',
          [CharacterClass.TAOIST]: 'https://file.mir4global.com/xdraco/img/common/login-profile/profile-taoist.webp',
          [CharacterClass.ARBALIST]: 'https://file.mir4global.com/xdraco/img/common/login-profile/profile-arbalist.webp',
          [CharacterClass.LANCER]: 'https://file.mir4global.com/xdraco/img/common/login-profile/profile-lancer.webp',
        },
        icon: {
          [CharacterClass.WARRIOR]: 'https://file.mir4global.com/xdraco/img/common/ranking/ico_klass_warrior.webp',
          [CharacterClass.SORCERER]: 'https://file.mir4global.com/xdraco/img/common/ranking/ico_klass_sorcerer.webp',
          [CharacterClass.TAOIST]: 'https://file.mir4global.com/xdraco/img/common/ranking/ico_klass_taoist.webp',
          [CharacterClass.ARBALIST]: 'https://file.mir4global.com/xdraco/img/common/ranking/ico_klass_arbalist.webp',
          [CharacterClass.LANCER]: 'https://file.mir4global.com/xdraco/img/common/ranking/ico_klass_lancer.webp',
        },
        card: {
          [CharacterClass.WARRIOR]: {
            2: 'https://file.mir4global.com/xdraco/img/common/card/warrior-grade2.webp',
            3: 'https://file.mir4global.com/xdraco/img/common/card/warrior-grade3.webp',
            4: 'https://file.mir4global.com/xdraco/img/common/card/warrior-grade4.webp',
            5: 'https://file.mir4global.com/xdraco/img/common/card/warrior-grade5.webp',
          },
          [CharacterClass.SORCERER]: {
            2: 'https://file.mir4global.com/xdraco/img/common/card/sorcerer-grade2.webp',
            3: 'https://file.mir4global.com/xdraco/img/common/card/sorcerer-grade3.webp',
            4: 'https://file.mir4global.com/xdraco/img/common/card/sorcerer-grade4.webp',
            5: 'https://file.mir4global.com/xdraco/img/common/card/sorcerer-grade5.webp',
          },
          [CharacterClass.TAOIST]: {
            2: 'https://file.mir4global.com/xdraco/img/common/card/taoist-grade2.webp',
            3: 'https://file.mir4global.com/xdraco/img/common/card/taoist-grade3.webp',
            4: 'https://file.mir4global.com/xdraco/img/common/card/taoist-grade4.webp',
            5: 'https://file.mir4global.com/xdraco/img/common/card/taoist-grade5.webp',
          },
          [CharacterClass.ARBALIST]: {
            2: 'https://file.mir4global.com/xdraco/img/common/card/arbalist-grade2.webp',
            3: 'https://file.mir4global.com/xdraco/img/common/card/arbalist-grade3.webp',
            4: 'https://file.mir4global.com/xdraco/img/common/card/arbalist-grade4.webp',
            5: 'https://file.mir4global.com/xdraco/img/common/card/arbalist-grade5.webp',
          },
          [CharacterClass.LANCER]: {
            2: 'https://file.mir4global.com/xdraco/img/common/card/lancer-grade2.webp',
            3: 'https://file.mir4global.com/xdraco/img/common/card/lancer-grade3.webp',
            4: 'https://file.mir4global.com/xdraco/img/common/card/lancer-grade4.webp',
            5: 'https://file.mir4global.com/xdraco/img/common/card/lancer-grade5.webp',
          },
        },
        detail: {
          [CharacterClass.WARRIOR]: {
            2: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-warrior2.webp',
            3: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-warrior3.webp',
            4: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-warrior4.webp',
            5: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-warrior5.webp',
          },
          [CharacterClass.SORCERER]: {
            2: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-sorcerer2.webp',
            3: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-sorcerer3.webp',
            4: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-sorcerer4.webp',
            5: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-sorcerer5.webp',
          },
          [CharacterClass.TAOIST]: {
            2: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-taoist2.webp',
            3: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-taoist3.webp',
            4: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-taoist4.webp',
            5: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-taoist5.webp',
          },
          [CharacterClass.ARBALIST]: {
            2: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-arbalist2.webp',
            3: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-arbalist3.webp',
            4: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-arbalist4.webp',
            5: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-arbalist5.webp',
          },
          [CharacterClass.LANCER]: {
            2: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-lancer2.webp',
            3: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-lancer3.webp',
            4: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-lancer4.webp',
            5: 'https://file.mir4global.com/xdraco/img/common/nft-detail/nft-detail-lancer5.webp',
          },
        },
      };
    },
  },
  props: {
    characterClass: {
      type: [Number, String],
      required: true,
    },
    grade: {
      type: Number,
      required: false,
      default: 0,
    },
    size: {
      type: [Number, String],
      default: 64,
    },
    type: {
      type: String,
      required: false,
      default: 'profile',
    },
  },
});
</script>
