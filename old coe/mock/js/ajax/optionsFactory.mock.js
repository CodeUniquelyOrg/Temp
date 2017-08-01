/* globals BUILD_CONFIG: false */
/* @Mock */

const getMockJsonDataUrl = fileName => {
  const origin = BUILD_CONFIG.AER_COMMS.MOCK_ORIGIN || '';
  const mockPath = fileName.indexOf(BUILD_CONFIG.AER_COMMS.LOCAL_MOCKID) > -1 ? BUILD_CONFIG.AER_COMMS.MOCK_PATH : BUILD_CONFIG.AER_COMMS.DEFAULT_MOCK_PATH;

  return [origin, mockPath, 'testData', fileName].join('/');
};

const getFileName = (payload, outcome) => `${payload.command + (outcome ? `.${outcome}` : '')}.json`;

const deriveMockBehaviour = (state, behaviour) => {
  const originalOptions = state.options;
  let useMock = false;
  let payload = '';
  let outcome = '';

  switch (state.scheme) {
    case 'AeriandiRpc':
      const request = JSON.parse(originalOptions.data.json);
      payload = request.commands[0];
      useMock = true;
      outcome = 'Success';

      // INFO: Mock behaviour can be customised on a per request basis in this switch statement
      switch (payload.command) {
        case 'SecurePayment.FindCall':
        case 'SecureCallControl.CorrelateCall':
          const options = payload.parameters.options;
          outcome = typeof options.sipCallIdentifier === 'string' && options.sipCallIdentifier.length > 0 ||
          typeof options.externalCorrelationIdentifier === 'string' && options.externalCorrelationIdentifier.length > 0 ||
          typeof options.destinationNumber === 'string' && options.destinationNumber.length > 0 ? 'Success' : 'Manual';
          break;
      }
      break;
    case 'AeriandiSystemContext':
    case 'AeriandiUserPermissions':
    case 'AeriandiUserProfile':
      useMock = true;
      outcome = 'Success';
      payload = { command: state.scheme };
      break;
  }

  behaviour.useMock = useMock;

  if (useMock) {
    return {
      url: getMockJsonDataUrl(getFileName(payload, outcome)),
      type: 'GET',
      dataType: 'json',
      data: originalOptions.data,
      headers: originalOptions.headers,
      timeout: behaviour.getTimeout(state),
    };
  }

  return null;
};

module.exports = getOptions => (state, behaviour) => {
  const mockOptions = deriveMockBehaviour(state, behaviour);
  return mockOptions || getOptions.call(null, state, behaviour);
};
