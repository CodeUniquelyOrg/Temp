import config from 'src/config';

const storage = config.options.storageToUse === 'session' ? sessionStorage : localStorage;
const tokenName = 'wr.token';

const getToken = () => {
  return storage.getItem(tokenName);
};

const setToken = (token) => {
  storage.setItem(tokenName, token);
};

const removeToken = () => {
  storage.removeItem(tokenName);
};

export { setToken, getToken, removeToken };