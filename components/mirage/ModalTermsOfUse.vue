<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-mirage-termos"
    :value="openTermsOfUse"
    :width="isDesktop ? '560px' : '100%'"
    scrollable
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
    persistent
  >
    <div class="content">
      <v-btn v-show="mirageLock" class="btn-close btn-miragepop-close" fab plain x-small @click="close()" />
      <h2 class="title">XDRACO</h2>
      <p class="desc" v-html="$t('s.mirage.popup.desc1')"></p>
      <div class="link-wrap">
        <a href="/policy" class="link-service" target="_blank" v-html="$t('t.policy.main')"></a>
        <a href="https://forum.mir4global.com/policy/terms" class="link-service" target="_blank" v-html="$t('w.mirage.footer.terms')"></a>
      </div>
      <div class="checkbox-container">
        <input id="is-subscription" type="checkbox" :disabled="mirageLock" :value="agree" @click="agree = !agree" />
        <label for="is-subscription" v-html="$t('s.mirage.popup.desc2')"></label>
      </div>
      <button v-if="!mirageLock" type="button" :disabled="!agree || loading || mirageLock" class="btn btn-red-mirage" @click="sendAgree">Continue
      </button>
      <p v-if="mirageLock" class="desc">{{ $t('s.mirage.message.lockout.common') }}</p>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { useState, useMutations, useActions } from 'vuex-composition-helpers/dist';
import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'ModalTermsOfUse',
  setup(_, { root }) {
    const state = reactive({
      agree: false,
      loading: false,
    });
    const { useMirageGetters } = useMirageStore();
    const { logOut } = useActions(['logOut']);
    const { openTermsOfUse, isDesktop } = useState(['openTermsOfUse', 'isDesktop']);
    const { mirageLock } = useMirageGetters(['mirageLock']);
    const { setOpenTermsOfUse } = useMutations(['setOpenTermsOfUse']);

    const sendAgree = () => {
      state.loading = true;
      root.$dracoWebApi
        .post('/mirage/account')
        .then(({ data }) => {
          if (data.code === 200) {
            setOpenTermsOfUse(false);
          }
        })
        .finally(() => {
          state.loading = false;
        });
    };

    const close = () => {
      setOpenTermsOfUse(false);
      logOut();
    };

    return {
      ...toRefs(state),
      isDesktop,
      openTermsOfUse,
      setOpenTermsOfUse,
      mirageLock,
      sendAgree,
      close,
    };
  },
});
</script>
