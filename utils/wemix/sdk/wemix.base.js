/* eslint-disable */
const Wemix = function () {
  const _env = {};
  const _storage = {
    storage: null,
    key: '',
    getKeyValue() {
      if (this.storage == null) return null;
      return this.storage.getItem(this.key);
    },
  };

  this.storage = function () {
    return _storage;
  };
  this.env = function () {
    return _env;
  };
};

export default Wemix;
