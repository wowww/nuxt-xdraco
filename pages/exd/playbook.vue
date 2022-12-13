<template>
  <main class="exd-playbook">
    <section class="section section-main">₩
      <div class="section__inner section-main__inner">
        <h3 class="section__headword">EXD Playbook</h3>
        <p class="section__desc">
          {{ $t('s.exd.event.playbook.desc') }}
        </p>
      </div>
    </section>

    <section v-viewer="viewerOption" class="section section-step">
      <div class="section__inner">
        <h3 class="section__headword">{{ $t('t.exd.event.listing') }}</h3>
        <div class="section__define">
          <div class="section__define__item">
            <div>
              <h4>{{ $t('t.exd.event.listing.step.1') }}</h4>
              <div class="section__define__desc">
                {{ $t('s.exd.event.listing.step.1') }}
                <ul>
                  <li>{{ $t('s.exd.event.listing.step.1.item') }}</li>
                </ul>
              </div>
            </div>
            <div class="section__define__img">
              <figure class="wrap-image by-viewer">
                <img
                  src="https://file.mir4global.com/xdraco/img/common/exd/playbook/item-listing1.webp"
                  alt="XDRACO Warehouse"
                />
                <figcaption>{{ $t('w.exd.playbook.warehouse') }}</figcaption>
              </figure>
            </div>
          </div>
          <div class="section__define__item">
            <div>
              <h4>{{ $t('t.exd.event.listing.step.2') }}</h4>
              <div class="section__define__desc">
                {{ $t('s.exd.event.listing.step.2') }}
                <ul>
                  <li>{{ $t('s.exd.event.listing.step.2.item.1') }}</li>
                  <li>
                    {{ $t('s.exd.event.listing.step.2.item.2') }}
                  </li>
                  <li>{{ $t('s.exd.event.listing.step.2.item.3') }}</li>
                </ul>
              </div>
            </div>
            <div class="section__define__img">
              <figure class="wrap-image by-viewer">
                <img
                  src="https://file.mir4global.com/xdraco/img/common/exd/playbook/item-listing2.webp"
                 :alt="$t('w.exd.event.listing')"
                />
                <figcaption>{{ $t('w.exd.event.listing') }}</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-viewer="viewerOption" class="section section-step">
      <div class="section__inner">
        <h3 class="section__headword">{{ $t('t.exd.event.purchase') }}</h3>
        <div class="section__define">
          <div class="section__define__item">
            <div>
              <h4>{{ $t('t.exd.event.purchase.step.1') }}</h4>
              <div class="section__define__desc">
                {{ $t('s.exd.event.purchase.step.1.desc') }}
                <ul>
                  <li>
                    {{ $t('s.exd.event.purchase.step.1.desc.item.1') }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="section__define__img">
              <figure class="wrap-image by-viewer">
                <img src="https://file.mir4global.com/xdraco/img/common/exd/playbook/item-purchasing1.webp" alt="Item details." />
                <figcaption>Item details.</figcaption>
              </figure>
            </div>
          </div>
          <div class="section__define__item">
            <div>
              <h4>{{ $t('t.exd.playbook.purchasing.step2') }}</h4>
              <div class="section__define__desc">
                {{ $t('s.exd.playbook.purchasing.step2') }}
                <ul>
                  <li>{{ $t('s.exd.event.purchase.step.2.desc.item.1') }}</li>
                </ul>
              </div>
            </div>
            <div class="section__define__img">
              <figure class="wrap-image by-viewer">
                <img
                  src="https://file.mir4global.com/xdraco/img/common/exd/playbook/item-purchasing2.webp"
                  alt="choose a character that will be receiving the XDRACO item"
                />
                <figcaption>{{ $t('w.exd.event.purchase') }}</figcaption>
              </figure>
            </div>
          </div>
          <div class="section__define__item">
            <div>
              <h4>{{ $t('t.exd.event.purchase.step.3') }}</h4>
              <div class="section__define__desc">
                {{ $t('s.exd.event.purchase.step.3.desc') }}
              </div>
            </div>
            <div class="section__define__img">
              <figure class="wrap-image by-viewer">
                <img
                  src="https://file.mir4global.com/xdraco/img/common/exd/playbook/item-purchasing4.webp"
                  alt="Purchase validation"
                />
                <figcaption>{{ $t('w.exd.event.purchase.validation') }}</figcaption>
              </figure>
            </div>
          </div>
          <div class="section__define__item">
            <div>
              <h4>{{ $t('t.exd.playbook.purchasing.step4') }}</h4>
              <div class="section__define__desc">
                {{ $t('s.exd.playbook.purchasing.step4') }}
                <ul>
                  <li>{{ $t('s.exd.playbook.purchasing.step4.desc1') }}</li>
                  <li>{{ $t('s.exd.event.purchase.step.4.desc.item.2') }}</li>
                </ul>
              </div>
            </div>
            <div class="section__define__img">
              <figure class="wrap-image by-viewer">
                <img
                  src="https://file.mir4global.com/xdraco/img/common/exd/playbook/item-purchasing5.webp"
                  alt="xdraco inventory"
                />
                <figcaption>{{ $t('w.exd.playbook.inventory') }}</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-youtube">
      <div class="section__inner">
        <div class="section-youtube__notice">
          <p v-html="$t('s.exd.playbook.notice-video')"></p>
        </div>
        <div class="wrap-youtube">
          <div class="inner">
            <iframe
              width="960"
              height="540"
              src="https://www.youtube.com/embed/8lAVJQZfENo"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen="allowfullscreen"
            ></iframe>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script>
import {defineComponent, onBeforeMount, onUnmounted, reactive, toRefs} from '@vue/composition-api';
import {directive as viewer} from 'v-viewer';

export default defineComponent({
  name: 'ExdGuide',
  meta: {
    title: 'EXD | XDRACO',
    hasSubNav: 'exd',
  },
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  setup(props, {root}) {
    const state = reactive({
      viewerOption: {
        toolbar: false,
        title: false,
        filter(img) {
          return img.parentNode.classList.contains('by-viewer');
        },
      },
      open: false,
      loading: false,
      check: false,
      repCharacter: 0,
      walletSync: 0,
      joinParticipant: 0,
      joinable: {
        period: 0,
        nonBlock: 0,
        nonJoin: 0,
      },
    });

    onBeforeMount(() => {
      setTimeout(() => {
        document.documentElement.classList.add('init-playbook');
      }, 300);
    });

    onUnmounted(() => {
      document.documentElement.classList.remove('init-playbook');
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/exd/_exd-playbook';
</style>
