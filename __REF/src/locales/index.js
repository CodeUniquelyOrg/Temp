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

// some sort of run around the folder looking for files
// anything that is not "index.js" should be required
// and added to the array for processing, all the items
// are in the array at the end (filename = locale - key)
// then process the array
//
// NEVER need to know wat languages are supported - auto

// build the structure required for initial state
export default {
  currentLanguage: defaultLanguage,
  languages: makeDescriptor(),
  dictionaries: makeDictionaries(),
};

// {
//   "en-GB": {
//     application: {
//       title: 'Awesome app with i18n!',
//       hello: 'Hello, %{name}!'
//     },
//     date: {
//       long: 'MMMM Do, YYYY'
//     },
//     export: 'Export %{count} items',
//     export_0: 'Nothing to export',
//     export_1: 'Export %{count} item',
//     two_lines: 'Line 1<br />Line 2'
//   },
//   "de-DE": {
//     application: {
//       title: 'Awesome app with i18n!',
//       hello: 'Hello, %{name}!'
//     },
//     date: {
//       long: 'MMMM Do, YYYY'
//     },
//     export: 'Export %{count} items',
//     export_0: 'Nothing to export',
//     export_1: 'Export %{count} item',
//     two_lines: 'Line 1<br />Line 2'
//   },
// }