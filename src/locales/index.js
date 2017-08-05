import { key as enKey, name as enName, dictionary as enDict } from './en-GB';
import { key as deKey, name as deName, dictionary as deDict } from './de-DE';

// the default language to use => 'en-GB';
const defaultLanguage = enKey;

const makeDescriptor = () => {
  return [
    { code: enKey, name: enName },
    { code: deKey, name: deName },
  ];
};

const makeDictionaries = () => {
  const dictionaries = {};
  dictionaries[enKey] = enDict;
  dictionaries[deKey] = deDict;
  return dictionaries;
};

// build the structure required for initial state
export default {

  currentLanguage: defaultLanguage,
  languages: makeDescriptor(),
  dictionaries: makeDictionaries(),
};

// const languages = [
//   {
//     code: 'ru-RU',
//     name: 'Русский'
//   },
//   {
//     code: 'en-US',
//     name: 'English (USA)'
//   }
// ]
// const dictionaries = {
//   'ru-RU': {
//     'key_1': 'Первый дефолтный ключ',
//     'key_2': [ '$Count', ' ', ['штучка','штучки','штучек']], // 1 штучка, 3 штучки, пять штучек
//   },
// };