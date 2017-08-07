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
