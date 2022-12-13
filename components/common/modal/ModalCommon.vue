<template>
  <v-dialog v-model="modal.open" content-class="dialog-common" max-width="480" persistent :retain-focus="false" :style="modal.permission ? 'z-index: 999999 !important' : 'z-index: 300'">
    <div class="content">
      <v-btn class="btn-close" fab plain x-small @click="onClose">
        <v-icon color="#000" size="26">mdi-close</v-icon>
      </v-btn>
      <div class="dialog-header"></div>
      <div class="wrap-notice">
        <div class="msgbox vcenter">
          <div>
            <h4 v-if="modal.title" class="title">{{ modal.title }}</h4>
            <div v-if="modal.desc" class="desc">
              {{ modal.desc }}
            </div>
            <div class="wrap-button">
              <button v-if="modal.secondary" type="button" class="btn btn-sm" @click="onClose">{{ modal.secondary }}</button>
              <button v-if="modal.primary" type="button" class="btn btn-primary btn-sm" @click="onClickPrimary">{{ modal.primary }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useActions, useState } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'ModalCommon',
  setup(props, { root }) {
    const { commonModal: modal } = useState(['commonModal']);
    const { closeModal } = useActions(['closeModal']);

    const onClickPrimary = () => {
      if (modal.value.onPrimary) {
        modal.value.onPrimary();
      }

      root.$nextTick(() => closeModal());
    };

    const onClose = () => {
      if (modal.value.onClose) {
        modal.value.onClose();
      }

      root.$nextTick(() => closeModal());
    };

    return {
      modal,
      onClickPrimary,
      onClose,
    };
  },
});
</script>
