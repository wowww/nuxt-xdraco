import MobileDetect from 'mobile-detect';

export const useMobile = () => {
  const isMobile = new MobileDetect(window.navigator.userAgent).mobile() !== null;

  return { isMobile };
}
