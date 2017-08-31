import {
  SET_CURRENT_LANGUAGE,
  SET_LANGUAGES,
  SET_DICTIONARIES,
  ADD_DICTIONARY
} from './types';

// import { I18n } from './index';

// export const SET_LOCALE = '@@i18n/SET_LOCALE';
// export const LOAD_TRANSLATIONS = '@@i18n/LOAD_TRANSLATIONS';

// export const loadTranslations = translations => dispatch => {
//   dispatch({
//     type: LOAD_TRANSLATIONS,
//     translations,
//   });
//   I18n.forceComponentsUpdate();
// };

// export const setLocale = locale => dispatch => {
//   dispatch({
//     type: SET_LOCALE,
//     locale,
//   });
//   I18n.forceComponentsUpdate();
// };

export const setCurrentLanguage = (languageCode) => ({
  type: SET_CURRENT_LANGUAGE, data: languageCode
});

export const setLanguages = (languageCode) => ({
  type: SET_LANGUAGES, data: languageCode
});

export const addDictionary = (languageCode, dictionary) => ({
  type: ADD_DICTIONARY, data: { languageCode, dictionary }
});

export const setDictionaries = (dictionaries ) => ({
  type: SET_DICTIONARIES, data: dictionaries
});