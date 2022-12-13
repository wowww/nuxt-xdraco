<template>
  <div id="contents" class="contents mirage-playbook">
    <div class="banner">
      <div class="banner__wrapper top-inner">
        <h1 class="banner--title">MIRAGE MULTIVERSE OF MIR4</h1>
        <p class="banner--description" v-html="$t('s.mirage-playbook.top.desc01')"></p>
        <p class="banner--description" v-html="$t('s.mirage-playbook.top.desc02')"></p>
      </div>
    </div>

    <section class="section section-video">
      <div class="section__inner">
        <div class="wrap-video" :class="{ 'wrap-video--open': isOpenVideo }">
          <iframe
            src="https://www.youtube.com/embed/DXYSD09JEcI"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>

    <section class="section section1">
      <div class="section__inner">
        <h2 class="section--title" v-html="$t('t.mirage-playbook.sec1')"></h2>
        <p v-html="$t('s.mirage-playbook.sec1.desc01')"></p>
        <p v-html="$t('s.mirage-playbook.sec1.desc02')"></p>
      </div>
    </section>

    <section class="section section2">
      <div class="section__inner">
        <h2 class="section--title" v-html="$t('t.mirage-playbook.sec2')"></h2>
        <div class="wrap-define">
          <dl class="define roster">
            <dt v-html="$t('t.mirage-playbook.sec2.part1')"></dt>
            <dd>
              <div class="desc">
                <p v-html="$t('s.mirage-playbook.sec2.part1.desc01')"></p>
                <p v-html="$t('s.mirage-playbook.sec2.part1.desc02')"></p>
              </div>
              <div class="wrap-img">
                <div class="area">
                  <figure class="wrap-image">
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/feature-roster.webp" alt="mirage roster" />
                  </figure>
                </div>
              </div>
            </dd>
          </dl>
          <dl class="define score">
            <dt v-html="$t('t.mirage-playbook.sec2.part2')"></dt>
            <dd>
              <div class="desc">
                <p v-html="$t('s.mirage-playbook.sec2.part2.desc01')"></p>
              </div>
              <div class="wrap-img">
                <div class="area">
                  <figure class="wrap-image">
                    <figcaption v-html="$t('w.mirage-playbook.sec2.part2.caption')"></figcaption>
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/mirage-score-formula.webp"
                         :alt="$t('w.mirage-playbook.sec2.part2.caption')" />
                  </figure>
                </div>
              </div>
            </dd>
          </dl>
          <dl class="define enlisting">
            <dt v-html="$t('t.mirage-playbook.sec2.part3')"></dt>
            <dd>
              <div class="desc">
                <p v-html="$t('s.mirage-playbook.sec2.part3.desc01')"></p>
                <p v-html="$t('s.mirage-playbook.sec2.part3.desc02')"></p>
              </div>
              <div class="wrap-img">
                <div class="area">
                  <figure class="wrap-image">
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/feature-enlisting.webp"
                         :alt="$t('t.mirage-playbook.sec2.part3')" />
                  </figure>
                </div>
              </div>
            </dd>
          </dl>
          <dl class="define vigor">
            <dt v-html="$t('t.mirage-playbook.sec2.part4')"></dt>
            <dd>
              <div class="desc">
                <p v-html="$t('s.mirage-playbook.sec2.part4.desc01')"></p>
                <p v-html="$t('s.mirage-playbook.sec2.part4.desc02')"></p>
              </div>
              <div class="wrap-img">
                <div class="area">
                  <figure class="wrap-image">
                    <img class="desktop-show" src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/feature-vigor.webp"
                         :alt="$t('t.mirage-playbook.sec2.part4')" />
                  </figure>
                </div>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </section>

    <section class="section section3">
      <div class="section__inner">
        <h3 class="section--title" v-html="$t('t.mirage.playbook.lockout-schedule')"></h3>
        <p class="desc" v-html="$t('s.mirage.playbook.lockout-schedule.desc1')"></p>
        <ul class="list-caution">
          <li v-html="$t('s.mirage.playbook.lockout-schedule.caution1')"></li>
        </ul>
      </div>
    </section>

    <section ref="tabs" class="section section-tabs tab-hidden-valley">
      <div class="section__inner">
        <section class="section section4">
          <div class="section__inner">
            <h2 class="section--title" v-html="$t('t.mirage-playbook.hidden-valley-capture')"></h2>
            <div class="desc">
              <p v-html="$t('s.mirage-playbook.sec3.desc01')"></p>
              <p v-html="$t('s.mirage-playbook.sec3.desc02')"></p>
            </div>

            <table class="table desktop-show">
              <caption v-html="$t('t.mirage-playbook.hidden-valley-capture')"></caption>
              <thead>
                <tr>
                  <th scope="col" v-html="$t('t.mirage-playbook.sec3.part1.heading01')"></th>
                  <th scope="col" v-html="$t('t.mirage-playbook.sec3.part1.heading02')"></th>
                  <th scope="col" v-html="$t('t.mirage-playbook.sec3.part1.heading03')"></th>
                  <th scope="col" v-html="$t('t.mirage-playbook.sec3.part1.heading04')"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <em class="server" v-html="$t('w.mirage-playbook.sec3.part1.redmoon')"></em>
                  </td>
                  <td>
                    <span class="value">
                      <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                      {{ $t('w.mirage-playbook.ds.mined-total') }}
                    </span>
                  </td>
                  <td>
                    <span class="value">
                      <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                      <span class="txt-sm" v-html="$t('w.mirage-playbook.ds.mined.redmoon')"></span>
                    </span>
                  </td>
                  <td>
                    <span class="value">
                      <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/ico-mirage.webp" width="20" alt="mirage" />
                      {{ $t('w.mirage-playbook.max-node.redmoon') }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <em class="server" v-html="$t('w.mirage-playbook.sec3.part1.snake')"></em>
                  </td>
                  <td>
                    <span class="value">
                      <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                      {{ $t('w.mirage-playbook.ds.mined-total') }}
                    </span>
                  </td>
                  <td>
                    <span class="value">
                      <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                      <span class="txt-sm" v-html="$t('w.mirage-playbook.ds.mined.snake')"></span>
                    </span>
                  </td>
                  <td>
                    <span class="value">
                      <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/ico-mirage.webp" width="20" alt="mirage" />
                      {{ $t('w.mirage-playbook.max-node.snake') }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <em class="server" v-html="$t('w.mirage-playbook.sec3.part1.bicheon')"></em>
                  </td>
                  <td>
                    <span class="value">
                      <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                      {{ $t('w.mirage-playbook.ds.mined-total') }}
                    </span>
                  </td>
                  <td>
                    <span class="value">
                      <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                      <span class="txt-sm" v-html="$t('w.mirage-playbook.ds.mined.bicheon')"></span>
                    </span>
                  </td>
                  <td>
                    <span class="value">
                      <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/ico-mirage.webp" width="20" alt="mirage" />
                      {{ $t('w.mirage-playbook.max-node.bicheon') }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="wrap-ds-info mobile-show">
              <h3 class="title-table" v-html="$t('t.mirage-playbook.hidden-valley-capture')"></h3>
              <ul class="list-ds-info">
                <li>
                  <strong class="info-title" v-html="$t('w.mirage-playbook.sec3.part1.redmoon')"></strong>
                  <ul class="list-sub-info">
                    <li>
                      <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading02')"></span>
                      <span class="value">
                        <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                        {{ $t('w.mirage-playbook.ds.mined-total') }}
                      </span>
                    </li>
                    <li>
                      <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading03')"></span>
                      <span class="value">
                        <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                        <span class="txt-sm" v-html="$t('w.mirage-playbook.ds.mined.redmoon')"></span>
                      </span>
                    </li>
                    <li>
                      <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading04')"></span>
                      <span class="value mirage">
                        <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/ico-mirage.webp" width="20" alt="mirage" />
                        {{ $t('w.mirage-playbook.max-node.redmoon') }}
                      </span>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong class="info-title" v-html="$t('w.mirage-playbook.sec3.part1.snake')"></strong>
                  <ul class="list-sub-info">
                    <li>
                      <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading02')"></span>
                      <span class="value">
                        <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                        {{ $t('w.mirage-playbook.ds.mined-total') }}
                      </span>
                    </li>
                    <li>
                      <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading03')"></span>
                      <span class="value">
                        <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                        <span class="txt-sm" v-html="$t('w.mirage-playbook.ds.mined.snake')"></span>
                      </span>
                    </li>
                    <li>
                      <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading04')"></span>
                      <span class="value mirage">
                        <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/ico-mirage.webp" width="20" alt="mirage" />
                        {{ $t('w.mirage-playbook.max-node.snake') }}
                      </span>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong class="info-title" v-html="$t('w.mirage-playbook.sec3.part1.bicheon')"></strong>
                  <ul class="list-sub-info">
                    <li>
                      <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading02')"></span>
                      <span class="value">
                        <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                        {{ $t('w.mirage-playbook.ds.mined-total') }}
                      </span>
                    </li>
                    <li>
                      <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading03')"></span>
                      <span class="value">
                        <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-darksteel.webp" width="20" alt="darksteel" />
                        <span class="txt-sm" v-html="$t('w.mirage-playbook.ds.mined.bicheon')"></span>
                      </span>
                    </li>
                    <li>
                      <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part1.heading04')"></span>
                      <span class="value mirage">
                        <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/ico-mirage.webp" width="20" alt="mirage" />
                        {{ $t('w.mirage-playbook.max-node.bicheon') }}
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <ul class="list-caution">
              <li v-html="$t('s.mirage-playbook.sec3.part1.caution01')"></li>
              <li v-html="$t('s.mirage-playbook.sec3.part1.caution02')"></li>
              <li v-html="$t('s.mirage-playbook.sec3.part1.caution03')"></li>
            </ul>
            <table class="table desktop-show">
              <caption v-html="$t('t.mirage-playbook.sec3.part2')"></caption>
              <colgroup>
                <col style="width: 240px" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" v-html="$t('t.mirage-playbook.sec3.part1.heading01')"></th>
                  <th scope="col" v-html="$t('t.mirage-playbook.sec3.part2.heading02')"></th>
                  <th scope="col" v-html="$t('t.mirage-playbook.sec3.part2.heading03')"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <em class="server" v-html="$t('w.mirage-playbook.sec3.part1.redmoon')"></em>
                  </td>
                  <td>
                    <span class="value-txt" v-html="$t('w.mirage-playbook.sec3.part2.epic')"></span>
                    <span class="value-ps">(PS 170,000~)</span>
                  </td>
                  <td>
                    <span class="value-txt" v-html="$t('w.mirage-playbook.sec3.part2.heading03')"></span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <em class="server" v-html="$t('w.mirage-playbook.sec3.part1.snake')"></em>
                  </td>
                  <td>
                    <span class="value-txt" v-html="$t('w.mirage-playbook.sec3.part2.rare')"></span>
                    <span class="value-ps">(PS 135,000~)</span>
                  </td>
                  <td>
                    <span class="value-txt" v-html="$t('w.mirage-playbook.sec3.part2.heading03')"></span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <em class="server" v-html="$t('w.mirage-playbook.sec3.part1.bicheon')"></em>
                  </td>
                  <td>
                    <span class="value-txt" v-html="$t('w.mirage-playbook.sec3.part2.uncommon')"></span>
                    <span class="value-ps">(PS 100,000~)</span>
                  </td>
                  <td>
                    <span class="value-txt" v-html="$t('w.mirage-playbook.sec3.part2.heading03')"></span>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table type-schedule desktop-show">
              <caption v-html="$t('t.mirage-playbook.sec3.part3')"></caption>
              <thead>
                <tr>
                  <th scope="col">
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/ico-32-darksteel.webp" width="32" alt="darksteel" />{{
                      $t('w.mirage-playbook.darksteels')
                    }}
                  </th>
                  <th scope="col">
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/ico-32-septaria.webp" width="32"
                         alt="septaria" />{{ $t('w.mirage.septaria') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="wrap-schedule">
                      <div class="item">
                        <dl class="schedule">
                          <dt v-html="$t('t.mirage-playbook.sec3.part3.1st')"></dt>
                          <dd v-html="$t('s.mirage-playbook.sec3.part3.date01')"></dd>
                        </dl>
                      </div>
                      <div class="item">
                        <dl class="schedule">
                          <dt v-html="$t('t.mirage-playbook.sec3.part3.2nd')"></dt>
                          <dd v-html="$t('s.mirage-playbook.sec3.part3.date02')"></dd>
                        </dl>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p v-html="$t('s.mirage-playbook.sec3.part3.date03')"></p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="mobile-show wrap-ds-info">
              <h3 class="title-table" v-html="$t('t.mirage-playbook.sec3.part3')"></h3>
              <ul class="list-ds-info">
                <li>
                  <strong class="info-title">
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/ico-24-darksteel.webp" width="24" alt="darksteel" />{{
                      $t('w.mirage-playbook.darksteels')
                    }}
                  </strong>
                  <ul class="list-sub-info type-schedule">
                    <li>
                      <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part3.1st')"></span>
                      <p v-html="$t('s.mirage-playbook.sec3.part3.date01')"></p>
                    </li>
                    <li>
                      <span class="sub-title" v-html="$t('t.mirage-playbook.sec3.part3.1st')"></span>
                      <p v-html="$t('s.mirage-playbook.sec3.part3.date02')"></p>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong class="info-title">
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/ico-20-septaria.webp" width="20"
                         alt="septaria" />{{ $t('w.mirage.septaria') }}
                  </strong>
                  <ul class="list-sub-info type-schedule">
                    <li class="wide">
                      <p v-html="$t('s.mirage-playbook.sec3.part3.date03')"></p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section class="section section5">
          <div class="section__inner">
            <h2 class="section--title" v-html="$t('t.mirage-playbook.sec4')"></h2>
            <ol class="list-process">
              <li>
                <strong v-html="$t('t.mirage-playbook.sec4.part1')"></strong>
                <p v-html="$t('s.mirage-playbook.sec4.part1')"></p>
                <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/battle-process01.webp" alt="" />
              </li>
              <li>
                <strong v-html="$t('t.mirage-playbook.sec4.part2')"></strong>
                <p v-html="$t('s.mirage-playbook.sec4.part2')"></p>
                <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/battle-process02.webp" alt="" />
              </li>
              <li>
                <strong v-html="$t('t.mirage-playbook.sec4.part3')"></strong>
                <p v-html="$t('w.mirage-playbook.sec4.part3')"></p>
                <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/battle-process03.webp" alt="" />
              </li>
              <li>
                <strong v-html="$t('t.mirage-playbook.sec4.part4')"></strong>
                <p v-html="$t('w.mirage-playbook.sec4.part4')"></p>
                <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/battle-process04.webp" alt="" />
              </li>
            </ol>
          </div>
        </section>
        <section class="section section6">
          <div class="section__inner">
            <h2 class="section--title" v-html="$t('t.mirage-playbook.sec5')"></h2>
            <p class="desc" v-html="$t('w.mirage-playbook.sec5.desc01')"></p>
            <ul class="list-caution mobile-show">
              <li v-html="$t('s.mirage-playbook.sec5.caution01')"></li>
            </ul>
            <ul class="list-requirement">
              <li>
                <div class="heading">
                  <h3 v-html="$t('w.mirage-playbook.sec5.enlist')"></h3>
                  <p v-html="$t('s.mirage-playbook.sec5.part1.word01')"></p>
                </div>
                <ul class="list-vigor">
                  <li>
                    <div class="vigor-title">
                      <span v-html="$t('s.mirage-playbook.sec5.part1.word02')"></span>
                    </div>
                    <div>
                      <span class="vigor">8 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                    </div>
                  </li>
                  <li>
                    <div class="vigor-title">
                      <span v-html="$t('s.mirage-playbook.sec5.part1.word03')"></span>
                    </div>
                    <div>
                      <span class="vigor">4 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                    </div>
                  </li>
                  <li>
                    <div class="vigor-title">
                      <span v-html="$t('s.mirage-playbook.sec5.part1.word04')"></span>
                    </div>
                    <div>
                      <span class="vigor">2 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <div class="heading">
                  <h3 v-html="$t('w.mirage-playbook.sec5.assault')"></h3>
                  <p v-html="$t('s.mirage-playbook.sec5.part2.word01')"></p>
                </div>
                <ul class="list-vigor">
                  <li>
                    <div class="vigor-title">
                      <span v-html="$t('s.mirage-playbook.sec5.part1.word02')"></span>
                    </div>
                    <div>
                      <span class="vigor">16 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                    </div>
                  </li>
                  <li>
                    <div class="vigor-title">
                      <span v-html="$t('s.mirage-playbook.sec5.part1.word03')"></span>
                    </div>
                    <div>
                      <span class="vigor">8 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                    </div>
                  </li>
                  <li>
                    <div class="vigor-title">
                      <span v-html="$t('s.mirage-playbook.sec5.part1.word04')"></span>
                    </div>
                    <div>
                      <span class="vigor">4 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <div class="heading">
                  <h3 v-html="$t('w.mirage-playbook.sec5.wound-recovery')"></h3>
                  <p v-html="$t('s.mirage-playbook.sec5.part3.word01')"></p>
                </div>
                <ul class="list-vigor">
                  <li>
                    <div class="vigor-title">
                      <span v-html="$t('s.mirage-playbook.sec5.part3.word02')"></span>
                    </div>
                    <div>
                      <span class="vigor">12 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                    </div>
                  </li>
                  <li>
                    <div class="vigor-title">
                      <span v-html="$t('s.mirage-playbook.sec5.part3.word03')"></span>
                    </div>
                    <div>
                      <span class="vigor">28 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                    </div>
                  </li>
                  <li>
                    <div class="vigor-title">
                      <span v-html="$t('s.mirage-playbook.sec5.part3.word04')"></span>
                    </div>
                    <div>
                      <span class="vigor">56 {{ $t('w.mirage-playbook.sec5.vigor') }}</span>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <ul class="list-caution desktop-show">
              <li v-html="$t('s.mirage-playbook.sec5.caution01')"></li>
            </ul>
          </div>
        </section>
        <section class="section section7">
          <div class="section__inner">
            <h2 class="section--title" v-html="$t('t.mirage-playbook.sec6')"></h2>
            <p class="desc" v-html="$t('s.mirage-playbook.sec6.desc01')"></p>
            <p class="desc" v-html="$t('s.mirage-playbook.sec6.desc02')"></p>
            <dl class="list-battle">
              <div class="enlist">
                <dt v-html="$t('w.mirage-playbook.sec5.enlist')"></dt>
                <dd>
                  <p v-html="$t('s.mirage-playbook.sec6.desc03')"></p>
                </dd>
              </div>
              <div class="assault">
                <dt v-html="$t('w.mirage-playbook.sec5.assault')"></dt>
                <dd>
                  <p v-html="$t('s.mirage-playbook.sec6.desc04')"></p>
                </dd>
              </div>
              <div class="recover">
                <dt v-html="$t('w.mirage-playbook.sec7.recover')"></dt>
                <dd>
                  <p v-html="$t('s.mirage-playbook.sec6.desc05')"></p>
                </dd>
              </div>
              <div class="retreat">
                <dt v-html="$t('w.mirage-playbook.sec6.retreat')"></dt>
                <dd>
                  <p v-html="$t('s.mirage-playbook.sec6.desc06')"></p>
                </dd>
              </div>
            </dl>
          </div>
        </section>
        <section class="section section8">
          <div class="section__inner">
            <div class="wrap-system">
              <div class="item">
                <h2 class="section--title" v-html="$t('t.mirage-playbook.sec7')"></h2>
                <p class="desc" v-html="$t('s.mirage-playbook.sec7.desc01')"></p>
                <p class="desc" v-html="$t('s.mirage-playbook.sec7.desc02')"></p>
              </div>
              <div class="item">
                <ul class="list-wound">
                  <li class="normal">
                    <div class="wrap-bg mobile-show"></div>
                    <dl class="define-state">
                      <dt v-html="$t('w.mirage-playbook.sec7.wounded')"></dt>
                      <dd>
                        <ul class="list-desc">
                          <li>
                            <span class="desc-title" v-html="$t('w.mirage-playbook.sec7.chance')"></span>
                            <span class="desc-cont" v-html="$t('w.mirage-playbook.sec7.defeat01')"></span>
                          </li>
                          <li>
                            <span class="desc-title" v-html="$t('w.mirage-playbook.sec7.duration')"></span>
                            <span class="desc-cont" v-html="$t('w.mirage-playbook.sec7.hours01')" />
                          </li>
                        </ul>
                      </dd>
                    </dl>
                  </li>
                  <li class="serious">
                    <div class="wrap-bg mobile-show"></div>
                    <dl class="define-state">
                      <dt v-html="$t('w.mirage-playbook.sec7.serious')"></dt>
                      <dd>
                        <ul class="list-desc">
                          <li>
                            <span class="desc-title" v-html="$t('w.mirage-playbook.sec7.chance')"></span>
                            <span class="desc-cont" v-html="$t('w.mirage-playbook.sec7.defeat02')"></span>
                          </li>
                          <li>
                            <span class="desc-title" v-html="$t('w.mirage-playbook.sec7.duration')"></span>
                            <span class="desc-cont" v-html="$t('w.mirage-playbook.sec7.hours02')"></span>
                          </li>
                        </ul>
                      </dd>
                    </dl>
                  </li>
                  <li class="critical">
                    <div class="wrap-bg mobile-show"></div>
                    <dl class="define-state">
                      <dt v-html="$t('w.mirage-playbook.sec7.critical')"></dt>
                      <dd>
                        <ul class="list-desc">
                          <li>
                            <span class="desc-title" v-html="$t('w.mirage-playbook.sec7.chance')"></span>
                            <span class="desc-cont" v-html="$t('w.mirage-playbook.sec7.defeat03')"></span>
                          </li>
                          <li>
                            <span class="desc-title" v-html="$t('w.mirage-playbook.sec7.duration')"></span>
                            <span class="desc-cont" v-html="$t('w.mirage-playbook.sec7.hours03')"></span>
                          </li>
                        </ul>
                      </dd>
                    </dl>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section class="section section9">
          <div class="section__inner">
            <h2 class="section--title" v-html="$t('t.mirage-playbook.sec8')"></h2>
            <p class="desc" v-html="$t('s.mirage-playbook.sec8.desc01')"></p>
            <p class="desc" v-html="$t('s.mirage-playbook.sec8.desc02')"></p>
          </div>
        </section>
        <section class="section section10">
          <div class="section__inner">
            <h2 class="section--title" v-html="$t('t.mirage-playbook.sec9')"></h2>
            <p class="desc" v-html="$t('s.mirage-playbook.sec9.desc01')"></p>
            <p class="desc" v-html="$t('s.mirage-playbook.sec9.desc02')"></p>
            <div class="wrap-img">
              <div class="item">
                <div class="define-bonus">
                  <span v-html="$t('w.mirage-playbook.sec9.character01')"></span>
                  <span class="tobe">{{ $t('s.mirage-playbook.sec9.score-bonus') }} <em>0%</em> </span>
                </div>
                <img class="mobile-show" src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/party-character01-m.webp" width="315"
                     alt="1character" />
                <img class="desktop-show" src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/party-character01.webp"
                     alt="1character" />
              </div>
              <div class="item">
                <div class="define-bonus">
                  <span v-html="$t('w.mirage-playbook.sec9.character05')"></span>
                  <span class="tobe">{{ $t('s.mirage-playbook.sec9.score-bonus') }} <em>7%</em> </span>
                </div>
                <img class="mobile-show" src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/party-character02-m.webp" width="315"
                     alt="5characters" />
                <img class="desktop-show" src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/party-character02.webp"
                     alt="5characters" />
              </div>
            </div>
            <div class="wrap-bonus">
              <div class="item">
                <p class="desc" v-html="$t('s.mirage-playbook.sec9.desc03')"></p>
              </div>
              <div class="item">
                <span class="subject" v-html="$t('w.mirage-playbook.sec9.party-bonus')"></span>
                <ul class="list-bonus">
                  <li>
                    <div class="define-title">
                      <span v-html="$t('w.mirage-playbook.sec9.party-size')"></span>
                      <span class="txt-character" v-html="$t('w.mirage-playbook.sec9.character05')"></span>
                    </div>
                    <span class="tobe">{{ $t('s.mirage-playbook.sec9.score-bonus') }} <em>7%</em> </span>
                  </li>
                  <li>
                    <div class="define-title">
                      <span v-html="$t('w.mirage-playbook.sec9.party-size')"></span>
                      <span class="txt-character" v-html="$t('w.mirage-playbook.sec9.character04')"></span>
                    </div>
                    <span class="tobe">{{ $t('s.mirage-playbook.sec9.score-bonus') }} <em>4%</em> </span>
                  </li>
                  <li>
                    <div class="define-title">
                      <span v-html="$t('w.mirage-playbook.sec9.party-size')"></span>
                      <span class="txt-character" v-html="$t('w.mirage-playbook.sec9.character03')"></span>
                    </div>
                    <span class="tobe">{{ $t('s.mirage-playbook.sec9.score-bonus') }} <em>2%</em> </span>
                  </li>
                  <li>
                    <div class="define-title">
                      <span v-html="$t('w.mirage-playbook.sec9.party-size')"></span>
                      <span class="txt-character" v-html="$t('w.mirage-playbook.sec9.character02')"></span>
                    </div>
                    <span class="tobe">{{ $t('s.mirage-playbook.sec9.score-bonus') }} <em>1%</em> </span>
                  </li>
                  <li>
                    <div class="define-title">
                      <span v-html="$t('w.mirage-playbook.sec9.party-size')"></span>
                      <span class="txt-character" v-html="$t('w.mirage-playbook.sec9.character01')"></span>
                    </div>
                    <span class="tobe">{{ $t('s.mirage-playbook.sec9.score-bonus') }} <em>0%</em> </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section class="section section18">
            <div class="section__inner">
              <h2 class="section__inner--title">{{ $t('t.mirage.playbook.enhancement') }}</h2>
              <div class="section__inner__contents">
                <div>
                  <h3 class="section__inner__contents--title">step 1.</h3>
                  <p>{{ $t('s.mirage.playbook.enhancement.step1.desc') }}</p>
                  <ul>
                    <li>{{ $t('s.mirage.my.success-rate.list1') }}</li>
                    <li>{{ $t('s.mirage.my.success-rate.list3') }}</li>
                  </ul>
                </div>
                <div v-viewer="viewerOption">
                  <div class="reward-item by-viewer enhance1">
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/img-nft-enhancement-01-origin.webp"
                         alt="nft-enhancement">
                  </div>
                </div>
              </div>
              <div class="section__inner__contents">
                <div>
                  <h3 class="section__inner__contents--title">step 2.</h3>
                  <p>{{ $t('s.mirage.playbook.enhancement.step2.desc') }}</p>
                  <ul>
                    <li>{{ $t('s.mirage.my.success-rate.list2') }}</li>
                    <li>{{ $t('s.mirage.my.success-rate.list4') }}</li>
                  </ul>
                </div>
                <div v-viewer="viewerOption">
                  <div class="reward-item by-viewer enhance2">
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/img-nft-enhancement-02-origin.webp"
                         alt="nft-enhancement">
                  </div>
                </div>
              </div>
              <div class="enhancement-info">
                <h3>{{ $t('t.mirage.my.success-rate') }}</h3>
                <div class="enhancement-info-wrap">
                  <table class="success-rate">
                    <thead>
                      <tr>
                        <th>{{ $t('w.mirage.my.success-rate.rank') }}</th>
                        <th>{{ $t('w.mirage.my.success-rate.legendary') }}</th>
                        <th>{{ $t('w.mirage.my.success-rate.epic') }}</th>
                        <th>{{ $t('w.mirage.my.success-rate.rare') }}</th>
                        <th>{{ $t('w.mirage.my.success-rate.uncommon') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{{ $t('w.mirage.my.success-rate.cost') }}</th>
                        <td class="cost"><span>8</span></td>
                        <td class="cost"><span>4</span></td>
                        <td class="cost"><span>2</span></td>
                        <td class="cost"><span>1</span></td>
                      </tr>
                      <tr>
                        <th>{{ $t('w.mirage.my.success-rate.rate') }}</th>
                        <td>60%</td>
                        <td>50%</td>
                        <td>40%</td>
                        <td>30%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from '@vue/composition-api';
import { directive as viewer } from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import smoothScroll from 'smoothscroll-polyfill';

smoothScroll.polyfill();

export default defineComponent({
  name: 'MiragePlaybook',
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  meta: {
    title: 'MIRAGE | XDRACO',
    hasSubNav: 'mirage',
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
    });

    return {
      ...toRefs(state),
    };
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    contentTab: 0,
    isOpenVideo: false,
  }),
  mounted() {
    setTimeout(() => {
      this.isOpenVideo = !this.isOpenVideo;
    }, 400);
  },
  methods: {
    anchoring(e) {
      const tabElement = this.$refs.tabs;
      const elementPosition = tabElement.getBoundingClientRect().top + window.scrollY;

      e.preventDefault();
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      this.contentTab = e.target.dataset.tabIndex * 1;
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app';
@import '~@/assets/sass/mirage-playbook';
</style>
