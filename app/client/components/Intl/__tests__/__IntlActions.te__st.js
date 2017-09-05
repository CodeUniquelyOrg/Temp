import test from 'ava';
// import { actionTest } from 'redux-ava';

import {
  SWITCH_LANGUAGE,
  switchLanguage,
} from '../IntlActions';

// translations are held in intl folder
import { localizationData } from 'intl/setup';

const lang = 'en';

test('should return the correct type for switchLanguage', actionTest(
  switchLanguage,
  lang,
  { type: SWITCH_LANGUAGE, ...localizationData[lang] },
));
