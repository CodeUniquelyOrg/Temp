const key = 'de-DE';
const name = 'Deutsche';

/* eslint-disable camelcase */
const dictionary = {

  email:          'Email',
  password:       'Passwort',
  login:          'Anmeldung',
  retype:         'Passwort erneut eingeben',
  register:       'Neu registrieren',

  createAccount:  'ein Konto erstellen',
  forgotPassword: 'Haben Sie Ihr Passwort vergessen',
  backToLogin:    'zurück zur Anmeldung',

  // navigation
  home:           'Anfang',
  settings:       'Einstellungen',
  results:        'Ergebnisse',
  help:           'Hilfe',

  // terms
  termsAndConditions: 'Geschäftsbedingungen',
  iAcceptTheTerms: 'Ich akzeptiere die allgemeinen Geschäftsbedingungen',

  // settings
  myAccount:      'Mein Konto',
  preferences:    'Präferenzen',
  greeting:       'Bevorzugter Gruß',
  forename:       'Vorname',
  surname:        'Familienname',
  pressureUnits:  'Druckeinheiten',
  depthUnits:     'Tiefeneinheiten',
  personal:       'Persönliche',
  registrations:  'Meine Fahrzeuge',

  // errors
  'errorEmail' : 'Bitte geben Sie eine E-mail-Adresse ein',
  'errorPassword' : 'Bitte Passwort eingeben',

  'key_1': 'First default key',
  'key_2': [ '$Count', ' ', [ 'thing', 'things' ] ], // 1 thing, 2 things, 153 things
};
/* eslint-enable camelcase */

export {
  key,
  name,
  dictionary
};
