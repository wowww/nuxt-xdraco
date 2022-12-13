// eslint-disable-next-line import/prefer-default-export
export const truncateMiddle = (v, len = 6) => {
  if (!v) {
    // return '';

    v = '';
  }
  return `${v.slice(0, len)}...${v.slice(-1 * len)}`;
};
