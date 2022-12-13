<template>
  <div ref="section">
    <h3 class="title-sub-detail">{{ $t('t.nft.skill') }}</h3>
    <div v-if="loading" :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
      <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
    </div>
    <div v-else-if="!loading && skills" class="skill">
      <!--
        기본: <div class="badge-wrap"> , <div class="badge-wrap badge-big">
        활성: <div class="badge-wrap on"> , <div class="badge-wrap badge-big on">
        비활성: <div class="badge-wrap disabled"> , <div class="badge-wrap badge-big disabled">
        비활성 상태일 경우 <span class="sm-tier">7</span> 제거
       -->
      <div class="character-skill" :data-character-class="item.character.class">
        <div
          v-for="(skill, skillIdx) in skills"
          :key="`nft-skill-${skillIdx}`"
          class="badge-wrap"
          :class="{ 'badge-big': skillIdx === 0, disabled: Number(skill.skillLevel) === 0, on: skill.skillLevel > 7 }"
        >
          <div class="badge" :data-character-skill="skillIdx"></div>
          <span v-if="skill.skillLevel > 0" :class="{ 'big-tier': skillIdx === 0, 'sm-tier': skillIdx !== 0 }">
            <template v-if="skillIdx === 0">Tier</template>
            {{ skill.skillLevel }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onUnmounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { useIntersectionObserver } from '@vueuse/core';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

const { useState: useNftState, useGetters: useNftGetters } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftCharacterSkill',
  setup(props, { root }) {
    const { $i18n, $dracoWebApi } = root;
    const { item } = useNftState(['item']);
    const section = ref(null);
    const state = reactive({
      loading: false,
      skills: [],
    });

    const fetchApi = () => {
      state.loading = true;
      $dracoWebApi
        .get('/nft/character/skills', {
          params: { transportID: item.value.character.transportID, class: item.value.character.class, languageCode: $i18n.locale },
        })
        .then(({ data }) => {
          if (data.code === 200) {
            state.skills = data.data;
          } else if (process.env.VUE_APP_DRACO_PROFILE === 'local') {
            state.skills = [
              {
                skillLevel: '7',
                skillName: 'Dragon Flame',
              },
              {
                skillLevel: '8',
                skillName: 'Berserk',
              },
              {
                skillLevel: '8',
                skillName: 'Void Slash',
              },
              {
                skillLevel: '8',
                skillName: 'Barbaric Charge',
              },
              {
                skillLevel: '7',
                skillName: 'Splitting Slash',
              },
              {
                skillLevel: '8',
                skillName: 'Iron Shackle',
              },
              {
                skillLevel: '7',
                skillName: 'Riposte',
              },
              {
                skillLevel: '8',
                skillName: 'Lion\'s Roar',
              },
              {
                skillLevel: '7',
                skillName: 'Body Check',
              },
              {
                skillLevel: '7',
                skillName: 'Ground Smash',
              },
              {
                skillLevel: '7',
                skillName: 'Gale Slash',
              },
              {
                skillLevel: '7',
                skillName: 'Unbreakable Stance',
              },
              {
                skillLevel: '7',
                skillName: 'Crescent Strike',
              },
            ];
          }
        })
        .catch((e) => {
          if (process.env.VUE_APP_DRACO_PROFILE === 'local') {
            state.skills = [
              {
                skillLevel: '7',
                skillName: 'Dragon Flame',
              },
              {
                skillLevel: '8',
                skillName: 'Berserk',
              },
              {
                skillLevel: '8',
                skillName: 'Void Slash',
              },
              {
                skillLevel: '8',
                skillName: 'Barbaric Charge',
              },
              {
                skillLevel: '7',
                skillName: 'Splitting Slash',
              },
              {
                skillLevel: '8',
                skillName: 'Iron Shackle',
              },
              {
                skillLevel: '7',
                skillName: 'Riposte',
              },
              {
                skillLevel: '8',
                skillName: 'Lion\'s Roar',
              },
              {
                skillLevel: '7',
                skillName: 'Body Check',
              },
              {
                skillLevel: '7',
                skillName: 'Ground Smash',
              },
              {
                skillLevel: '7',
                skillName: 'Gale Slash',
              },
              {
                skillLevel: '7',
                skillName: 'Unbreakable Stance',
              },
              {
                skillLevel: '7',
                skillName: 'Crescent Strike',
              },
            ];
          }
        })
        .finally(() => {
          state.loading = false;
        });
    };
    const { stop } = useIntersectionObserver(section, ([{ isIntersecting }]) => {
      if (isIntersecting && item.value && item.value.character.transportID && (!state.skills || state.skills.length === 0)) {
        fetchApi();
      }
    });

    watch(
      () => $i18n.locale,
      () => {
        fetchApi();
      },
    );

    onUnmounted(() => {
      stop();
    });

    return {
      section,
      ...toRefs(state),
      item,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
