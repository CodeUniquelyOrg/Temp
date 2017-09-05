// list of available languages

// need Intl polyfill, Intl not supported in Safari
import Intl from 'intl';
import areIntlLocalesSupported from 'intl-locales-supported';

// here you bring in 'intl' browser polyfill and language-specific polyfills
// (needed as safari doesn't have native intl: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
// as well as react-intl's language-specific data
// be sure to use static imports for language or else every language will be included in your build (adds ~800 kb)
import { addLocaleData } from 'react-intl';

import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/de';

import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';

import enData from './localizationData/en';
import deData from './localizationData/de';

export const enabledLanguages = [
  'en',
  'de',
];

// this object will have language-specific data added to it which will be placed in the state when that language is active
// if localization data get to big, stop importing in all languages and switch to using API requests to load upon switching languages
export const localizationData = {};

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(enabledLanguages)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and patch the constructors we need with the polyfill's.
    global.Intl.NumberFormat = Intl.NumberFormat;
    global.Intl.DateTimeFormat = Intl.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = Intl;
}

// use this to allow nested messages, taken from docs:
// https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object
function flattenMessages(nestedMessages = {}, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value; // eslint-disable-line no-param-reassign
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

// bring in intl polyfill, react-intl, and app-specific language data
addLocaleData(en);
localizationData.en = enData;
localizationData.en.messages = flattenMessages(localizationData.en.messages);

addLocaleData(de);
localizationData.de = deData;
localizationData.de.messages = flattenMessages(localizationData.de.messages);
