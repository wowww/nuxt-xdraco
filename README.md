# xdraco

## vue-i18n → nuxt/i18n 변경 설명 및 문법 변경 사항

### i18n이란?

i18n은 소프트웨어에서 여러 나라에 대한 지원을 위한 과정 즉, internationalization(국제화)를 위한 패키지

기존에는 i18n 라이브러리를 사용했습니다. 프로젝트를 nuxtjs로 변경하며 nuxt/i18n을 사용해 다국어를 지원합니다.

[nuxt/i18n](https://i18n.nuxtjs.org/)을 사용하면 다음과 같은 장점이 있습니다.

### 장점

- 지원 언어별 페이지 라우트 자동 생성
- 검색엔진 최적화(SEO)
- 번역 문구 Lazy loading
- 리디렉션을 기반으로 한 브라우저의 언어 자동 감지
- 언어별로 도메인을 다르게 할 수 있음
- vuex를 기반으로 메세지와 언어를 선택 가능

### 자세히

Xdraco 사이트는 여러 나라에 서비스를 하다보니 i18n을 통해 다국어 지원을 하고 있었고, 기존에는 i18n과 vue-i18n을 통해서 다국어 파일에 대한 관리를 했습니다. 어떤 다국어가 선택되어있는지에 대한 상태 관리는 **vuex를 통해서 따로** 하고
있었습니다.

1. 👍 nuxt/i18n은 따로 상태관리를 할 필요 없이 내부적으로 vuex를 통해 상태관리를 함
   **별도로 상태를 관리해 줄 필요가 없음**
2. ❗️ 기존에는 모든 다국어 파일을 읽어들인 후에 vuex 상태에 따라서 언어만 변경해주는 방식이다 보니 초기 리소스 로딩에 필요한 자원이 컸음 👍 nuxt/i18n은 **lazy-loading 방식을 지원**해서 **필요한 언어의 리소스만**을 읽게 할 수 있음
3. ❗️ 기존에는 전역 변수를 사용하기 위해서 별로도 설정을 해 주고 있는 부분이나, 언어에 대한 선택 페이지를 위한 파일을 별도로 관리 대표적으로 `/src/constants/languages`에서 관리를 별도로 하고 있었는데, 👍 이 부분을
   nuxt.config.js 안에서 파일에 대한 매핑과 함께 관리를 할 수 있게 됨 nuxt 구조에 조금 더 맞는 방식이라고 생각

### 변경방법

앞의 문자를 화살표 뒤의 문자로 변경합니다.

예를 들어, 찾기로 `{t(` 을 찾고, 해당 부분을 `{$t(` 으로 변경해주면 됩니다.

전체 선택 후, 전체 변경하면 편합니다!

👇 HTML, Javascript 문자는 아래처럼 변경하면 됩니다.

### HTML(markdown)

1. `공백t(` → `공백$t(`
2. `“t(` → `“$t(`
3. `{t(` → `{$t(`

### Script

4. `root.i18t(` → `root.i18n.t(`
5. `i18n.t(` → `root.$t`

## 초기 설정

### 의존 패키지 설치
```bash
$ yarn install
```

### 로컬 환경에서 실행(http://localhost:8081)
```bash
$ yarn dev
```

### 프로덕션 환경에서 실행(http://localhost:8081)
```bash
$ yarn build
$ yarn start
```

### 베타 환경으로 빌드
```bash
$ yarn generate:beta
```

### 프로덕션 환경으로 빌드
```bash
$ yarn generate:production
```

## 배포

### Azure DevOps 접속

* [Link](https://aex.dev.azure.com/me?mkt=en-US)

### 프로젝트 빌드

* [Pipelines] 탭 선택
* 배포하려는 타겟에 따라서 빌드 파이프라인 선택
  * [베타 사이트](https://mir4global-beta-xdraco.wemade.com/) 배포 시 'build-beta' 선택
  * [라이브 사이트](https://www.xdraco.com/) 배포 시 'build-production' 선택

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want
to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your
pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts
for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router
automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue
plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to
plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
