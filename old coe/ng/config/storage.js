//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// https://github.com/gsklee/ngStorage
// 'ngstorage' - Storage Provider
//

/* @ngInject */
export default function config($localStorageProvider, $sessionStorageProvider) {
  $localStorageProvider.setKeyPrefix('cp-');
  $sessionStorageProvider.setKeyPrefix('cp-');
}
