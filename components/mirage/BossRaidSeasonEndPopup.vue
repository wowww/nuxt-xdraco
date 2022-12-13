<template>
  <div class="boss-raid-end-popup" :class="{'boss-raid-end-popup--open': isOpen}">
    <div class="boss-raid-end-popup__inner">
      <button class="boss-raid-end-popup__close-btn" @click="closeMessage"><img src="https://file.mir4global.com/xdraco/img/common/btn-close-dark.png" alt="close button" width="100%" height="100%" /></button>
      <h2 class="boss-raid-end-popup__title mobile">Notice on the End of Boss Raid Service</h2>
      <div class="wrap-info">
        <div class="wrap-info__image">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage/img-eunsil-40.webp" alt="eunsil" width="100%" height="100%" />
        </div>
        <div class="wrap-info__content">
          <h2 class="boss-raid-end-popup__title desktop">Notice on the End of Boss Raid Service</h2>
          <span class="wrap-info__content--desc">
            <strong>Boss raid service will end</strong> after season 3. <br />
            Thank you very much to all of you for your participation in boss raids.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, toRefs, reactive, onMounted} from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'BossRaidSeasonEndPopup',
  setup() {
    const { isDesktop } = useState(['isDesktop']);
    const state = reactive({
      isOpen: false,
    });

    const closeMessage = () => {
      if (process.env.VUE_APP_DRACO_PROFILE !== 'production') {
        sessionStorage.setItem(`boss-raid-end-notice`, true);
      } else {
        localStorage.setItem(`boss-raid-end-notice`, true);
      }
      state.isOpen = false;
    };

    onMounted(() => {
      const showMessage =
        process.env.VUE_APP_DRACO_PROFILE !== 'production'
          ? sessionStorage.getItem(`boss-raid-end-notice`)
          : localStorage.getItem(`boss-raid-end-notice`);

      if (!showMessage) {
        setTimeout(() => {
          state.isOpen = !state.isOpen;
        }, 1000);
      }
    })

    return {
      ...toRefs(state),
      isDesktop,
      closeMessage,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/mixin';

.boss-raid-season-end {
  .boss-raid-end-popup {
    display: block;
  }
}

.boss-raid-end-popup {
  display: none;
  width: 100%;
  height: 0;
  overflow: hidden;
  background: #FFED00;

  &--open {
    height: fit-content;
    animation: fadein 1.5s;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &__close-btn {
    width: 16px;
    height: 16px;
    position: absolute;
    right: 0;
    top: 0;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    margin: 24px;
    gap: 16px;
    position: relative;
  }

  &__title {
    font-size: 16px;
    font-weight: bold;

    &.mobile {
      display: block;
    }

    &.desktop {
      display: none;
    }
  }

  .wrap-info {
    display: flex;
    gap: 15px;
    align-items: center;

    &__image {
      width: 58px;
      height: 58px;
      overflow: hidden;
      aspect-ratio: 1/1;
      flex: 0 0 58px;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 4px;
      line-height: 1.2;

      &--desc {
        font-size: 14px;

        strong {
          color: #FF0000;
        }
      }
    }
  }
}

@include large-pc {
  .boss-raid-end-popup {
    padding-left: 0;
    padding-right: 0;

    &__close-btn {
      width: 24px;
      height: 24px;
    }

    &__inner {
      max-width: 1200px;
      margin: 24px auto;
    }

    &__title {
      &.desktop {
        display: block;
      }

      &.mobile {
        display: none;
      }
    }
  }
}
</style>

