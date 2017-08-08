const key = 'en-GB';
const name = 'English';

/* eslint-disable camelcase */
const dictionary = {

  email:          'Email',
  password:       'Password',
  login:          'Login',
  retype:         'Retype Password',
  register:       'Register',
  createAccount:  'create an account',
  forgotPassword: 'forgot your password',
  backToLogin:    'back to login',

  // navigation
  home:           'home',
  settings:       'settings',
  results:        'results',
  help:           'help',

  // terms
  termsAndConditions: 'Terms and Conditions',
  iAcceptTheTerms: 'I Accept the terms and conditions',

  // settings
  myAccount:      'My Account',
  preferences:    'Preferences',
  greeting:       'Preferred Greeting',
  forename:       'First Name',
  surname:        'Surname',
  pressureUnits:  'Pressure Units',
  depthUnits:     'Depth Units',
  personal:       'Personal Stuff',
  registrations:  'My Vehicles',

  // errors
  errorEmail:     'Please enter an email address',
  errorPassword:  'Please enter a password',

  // experimental
  key_1:          'First default key',
  key_2:          [ '$Count', ' ', [ 'thing', 'things' ] ], // 1 thing, 2 things, 153 things
  export:         'Export %{count} items',
  export_0:       'Nothing to export',
  export_1:       'Export %{count} item',
};
/* eslint-enable camelcase */

export {
  key,
  name,
  dictionary
};
