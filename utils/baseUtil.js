export const dracoStorage = {
  set(key, value, options = {}) {
    if (process.client) {
      localStorage.setItem(key, value);
    }
  },
  get(key) {
    if (process.client) {
      return localStorage.getItem(key);
    }
    return undefined;
  },
  remove(key) {
    if (process.client) {
      localStorage.removeItem(key);
    }
  },
};
