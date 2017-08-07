import {
  SET_CURRENT_LANGUAGE,
  SET_LANGUAGES,
  SET_DICTIONARIES,
  ADD_DICTIONARY
} from 'actions/translate';

// import initialState from './initialState';
import INITIAL_STATE from 'src/locales';

// export default i18n = (state, action) => {
export default function (state = INITIAL_STATE, action) {

  switch ( action.type ) {

    case SET_CURRENT_LANGUAGE: {
      let newState = Object.assign( {}, state );
      newState.currentLanguage = action.data;
      return newState;
    }

    case SET_LANGUAGES: {
      let newState = Object.assign( {}, state );
      newState.languages = action.data;
      return newState;
    }

    case SET_DICTIONARIES: {
      let newState = Object.assign( {}, state );
      newState.dictionaries = action.data;
      return newState;
    }

    case ADD_DICTIONARY: {
      if ( action.data && action.data.languageCode && action.data.dictionary ) {
        let newState = Object.assign( {}, state );
        newState.dictionaries[ action.data.languageCode ] = action.data.dictionary;
        return newState;
      } else {
        return state;
      }
    }

    default:
      return state || initialState;
  }
}

// export default i18n;
