/* eslint-disable */
import langEn from './en.json';
import langKo from './ko.json';
import langCn from './cn.json';
import langTw from './tw.json';
const resources = {
  en: {
    translation: langEn,
  },
  ko: {
    translation: langKo,
  },
  zh: {
    translation: langCn,
  },
  tw: {
    translation: langTw,
  },
};
let lang = process.client ? navigator.language || navigator.userLanguage : '';
if (lang.indexOf('-') !== -1) lang = lang.substring(0, lang.indexOf('-'));

export const i18n = {
  t(code) {
    let resource = resources[lang];
    if (resource == null) resource = resources['en'];

    return resource.translation[code];
  },
  setLocale(locale) {
    lang = locale;
  },
}

export default i18n;
