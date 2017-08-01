//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Application Compile Provider
//

/* @ngInject */
export default function config($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^(https?|mailto|tel|sms|xmpp):/);

  // PRODUCTION - Speed improvement
  // disable debug info - can always be renabled by using the debug console
  // and entering angular..reloadWithDebugInfo() if you want to debug ....
  // or using the 'enable' checkbox in angular batarang's chrome extension
  // $compileProvider.debugInfoEnabled(false);
}
