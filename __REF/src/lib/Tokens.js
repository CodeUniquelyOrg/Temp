import config from 'src/config';

const storage = config.options.storageToUse === 'session' ? sessionStorage : localStorage;
const tokenName = 'wr.token';

const removeToken = () => {
  storage.removeItem(tokenName);
};

const getToken = () => {
  return storage.getItem(tokenName);
};

const setToken = (token) => {
  storage.setItem(tokenName, token);
};

const getLanguage = () => {
  return storage.getItem('locale');
};

const setLanguage = (locale) => {
  storage.setItem('locale', locale);
};

export { setToken, getToken, removeToken, setLanguage, getLanguage };