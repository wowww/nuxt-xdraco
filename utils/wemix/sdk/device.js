/* eslint-disable */
const Device = {
  isMobile() {
    const UserAgent = navigator.userAgent;
    if (
      UserAgent.match(
        /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i,
      ) != null ||
      UserAgent.match(/LG|SAMSUNG|Samsung/) != null
    ) {
      return true;
    }
    return false;
  },
  isPc() {
    const desktop = 'win16|win32|win64|mac|macintel';
    if (desktop.indexOf(navigator.platform.toLowerCase()) > -1) return true;
    return false;
  },
};

export default Device;
