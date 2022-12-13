export default function({ store }) {
  const locale = localStorage.getItem('draco-locale');
  if (locale) {
    store.$i18n.setLocale(locale).then(() => {
      // ignored
    });
  }
}
