/* globals process:false, BUILD_CONFIG:false, Promise: false */

import angular from 'angular';
import lodash from 'lodash';
import comms from 'aeriandi-comms-library';

const call = (() => {
  const client = comms.get({
    environment: BUILD_CONFIG.AER_COMMS.LIQUID_ENVIRONMENT,
    systemTracerUuid: false,
    sourceSystemName: false,
    behaviourOverrides: {
      mockDelay: 100
    }
  }).client;
  return payload => Promise.resolve(client.rpc(payload));
})();

function makeFmlCommand(fmlName, parameters) {
  return {
    uid: lodash.camelCase(fmlName + 'Request'),
    command: fmlName,
    parameters: parameters || {}
  };
}

function makeRuntimeCommand(runtimeName, methodName, parameters) {
  return {
    uid: lodash.camelCase(methodName + 'Request'),
    command: runtimeName + '.' + methodName,
    parameters: parameters || {}
  };
}

function cmd(root, path, params) {
  return process.env.NODE_ENV === 'development' ? makeRuntimeCommand(root, path, params) : makeFmlCommand(root + '.' + path, params);
}

const parseDataTable = table => {
  const headers = table.headers.map(header => header.columnTitle.charAt(0).toLowerCase() + header.columnTitle.slice(1));

  return table.data.map(row =>
    row.reduce((data, item, index) => {
      data[headers[index]] = item;
      return data;
    }, {})
  );
};

const parseDataSet = dataSet => dataSet.tables.reduce((data, table) => {
  data[table.name.charAt(0).toLowerCase() + table.name.slice(1)] = parseDataTable(table.dataTable);
  return data;
}, {});

const parseData = data => {
  switch (data.type) {
    case 'dataSet':
      return parseDataSet(data);

    case 'dataTable':
      return parseDataTable(data);

    default:
      return data;
  }
};

const customerSubmitResource = target => ({
  save: params => {
    const root = 'Customer';
    const path = target;
    const payload = cmd(root, path, params);

    return call(payload)
      .then(response => {
        if (response.isSuccessful) {
          return response.data[payload.uid].data;
        } else {
          throw response.exception;
        }
      })
      .then(parseData);
  }
});

const hitLog = (pageName, firstHitLogId) => {
  const params = {
    brand: BUILD_CONFIG.BRAND,
    pageName,
    hitLogId: firstHitLogId,
    oABType: 'CommercialCards',
  };

  const root = 'WebAnalytics';
  const path = 'HitLog';
  const payload = cmd(root, path, params);

  return call(payload)
    .then(response => {
      if (response.isSuccessful) {
        return response.data[payload.uid].data;
      } else {
        throw response.exception;
      }
    })
    .then(parseData);
};

class service {

  /* @ngInject */
  constructor() {
    this.customerSubmitResource = customerSubmitResource;
    this.hitLog = hitLog;
  }
}

export default angular.module('myApp.services.async', [])
.service('AsyncService', service)
  .name;
