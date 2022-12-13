<template>
  <main class="contents nft-playbook">
    <section class="section section2">
      <div class="section__inner">
        <div class="nft-headline">
          <h3 class="headword">{{ $t('s.nft.playbook.title') }}</h3>
          <strong class="sub-headword">{{ $t('s.nft.playbook.subtitle') }}{{ $t('s.nft.playbook.subtitle') }}</strong>
          <p class="text-desc">
            {{ $t('s.nft.playbook.desc') }}
          </p>
        </div>
      </div>
    </section>

    <section class="section section3">
      <div class="section__inner">
        <div class="nft-youtube">
          <div class="wrap-youtube">
            <div class="inner">
              <iframe
                width="640"
                height="360"
                src="https://www.youtube.com/embed/tUgCLeXRAgw"
                title="introducing Character NFT"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section4">
      <div class="section__inner">
        <div v-viewer="viewerOption" class="nft-item">
          <h3 class="hidden">{{ $t('s.nft.playbook.section4.title') }}</h3>
          <div class="wrap-define">
            <dl class="define minting">
              <dt>{{ $t('s.nft.playbook.section4.title') }}</dt>
              <dd>
                <div class="desc">
                  {{ $t('s.nft.playbook.section4.desc') }}
                  <ul>
                    <li>Minting requires 4,000 Gold.</li>
                  </ul>
                </div>
                <div class="wrap-img">
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img src="https://file.mir4global.com/xdraco/img/common/nft-playbook/nft-minting.webp" alt="nft-minting" />
                    </figure>
                    <figcaption>{{ $t('s.nft.playbook.section4.title') }}</figcaption>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <section class="section section5">
      <div class="section__inner">
        <div v-viewer="viewerOption" class="nft-item">
          <h3 class="headword">{{ $t('s.nft.playbook.section5.title') }}</h3>
          <div class="wrap-define">
            <dl class="define sealing">
              <dt>{{ $t('s.nft.playbook.section5.step1.title') }}</dt>
              <dd>
                <div class="desc">
                  {{ $t('s.nft.playbook.section5.step1.desc') }}
                  <ul>
                    <li>{{ $t('s.nft.playbook.section5.step1.notice1') }}</li>
                    <li>{{ $t('s.nft.playbook.section5.step1.notice2') }}</li>
                  </ul>
                </div>
                <div class="wrap-img">
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img src="https://file.mir4global.com/xdraco/img/common/nft-playbook/step1-sealing.webp" alt="Global Map: Character Transfer Menu" />
                    </figure>
                    <figcaption>{{ $t('s.nft.playbook.section5.step1.caption') }}</figcaption>
                  </div>
                </div>
              </dd>
            </dl>
            <dl class="define registration">
              <dt>{{ $t('s.nft.playbook.section5.step2.title') }}</dt>
              <dd>
                <div class="desc">
                  {{ $t('s.nft.playbook.section5.step2.desc') }}
                  <ul>
                    <li>{{ $t('s.nft.playbook.section5.step2.notice1') }}</li>
                    <li>{{ $t('s.nft.playbook.section5.step2.notice2') }}</li>
                  </ul>
                </div>
                <div class="wrap-img">
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img src="https://file.mir4global.com/xdraco/img/common/nft-playbook/step2-registration.webp" alt="WEMIX Wallet / WEMIX NFT Marketplace" />
                    </figure>
                    <figcaption>{{ $t('s.nft.playbook.section5.step2.caption') }}</figcaption>
                  </div>
                </div>
              </dd>
            </dl>
            <dl class="define listing">
              <dt>{{ $t('s.nft.playbook.section5.step3.title') }}</dt>
              <dd>
                <div class="desc">
                  {{ $t('s.nft.playbook.section5.step3.desc') }}
                  <ul>
                    <li>{{ $t('s.nft.playbook.section5.step3.notice1') }}</li>
                    <li>{{ $t('s.nft.playbook.section5.step3.notice2') }}</li>
                  </ul>
                </div>
                <div class="wrap-img">
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img src="https://file.mir4global.com/xdraco/img/common/nft-playbook/step3-listing.webp" alt="XDRACO Character NFT / WEMIX Wallet" />
                    </figure>
                    <figcaption>{{ $t('s.nft.playbook.section5.step3.caption') }}</figcaption>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <section class="section section6">
      <div class="section__inner">
        <div v-viewer="viewerOption" class="nft-item">
          <h3 class="headword">{{ $t('s.nft.playbook.section6.title') }}</h3>
          <div class="wrap-define">
            <dl class="define searching">
              <dt>{{ $t('s.nft.playbook.section6.step1.title') }}</dt>
              <dd>
                <div class="desc">
                  {{ $t('s.nft.playbook.section6.step1.desc') }}
                </div>
                <div class="wrap-img">
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img src="https://file.mir4global.com/xdraco/img/common/nft-playbook/step1-searching.webp" alt="XDRACO Character NFT" />
                    </figure>
                    <figcaption>{{ $t('s.nft.playbook.section6.step1.caption') }}</figcaption>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
          <div class="wrap-define">
            <dl class="define purchasing">
              <dt>{{ $t('s.nft.playbook.section6.step2.title') }}</dt>
              <dd>
                <div class="desc">
                  {{ $t('s.nft.playbook.section6.step2.desc') }}
                </div>
                <div class="wrap-img">
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img src="https://file.mir4global.com/xdraco/img/common/nft-playbook/step2-purchasing.webp" alt="Purchase Validation QR Code" />
                    </figure>
                    <figcaption>{{ $t('s.nft.playbook.section6.step2.caption') }}</figcaption>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
          <div class="wrap-define">
            <dl class="define playing">
              <dt>{{ $t('s.nft.playbook.section6.step3.title') }}</dt>
              <dd>
                <div class="desc">
                  {{ $t('s.nft.playbook.section6.step3.desc') }}
                  <ul>
                    <li>{{ $t('s.nft.playbook.section6.step3.notice1') }}</li>
                    <li>{{ $t('s.nft.playbook.section6.step3.notice2') }}</li>
                    <li>{{ $t('s.nft.playbook.section6.step3.notice3') }}</li>
                  </ul>
                </div>
                <div class="wrap-img">
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img src="https://file.mir4global.com/xdraco/img/common/nft-playbook/step3-playing.webp" alt="Character NFT List" />
                    </figure>
                    <figcaption>{{ $t('s.nft.playbook.section6.step3.caption') }}</figcaption>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <section class="section remark">
      <div class="section__inner">
        <strong class="txt-remark">{{ $t('s.nft.playbook.phrase') }}</strong>
      </div>
    </section>

  </main>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { directive as viewer } from 'v-viewer';

export default defineComponent({
  name: 'NftPlaybook',
  meta: {
    title: 'NFT | XDRACO',
    hasSubNav: 'nft',
  },
  components: {

  },
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  setup(props, { root }) {
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

    return {
      ...toRefs(state),
    };
  }
});
</script>
<style lang="scss">
@import '~@/assets/sass/common/pages/nft/_nft-playbook.scss';
</style>
