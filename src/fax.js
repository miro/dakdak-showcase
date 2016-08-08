// # fax
//
//  module for asking stuff from the dakdak-api.
//  Since I'm so funny guy I named this file as a "fax".
//

require('es6-promise').polyfill();
require('isomorphic-fetch');

const cfg = require('../config');
const log = require('./logger')(__filename);


module.exports = function fax(url, opts) {
  const fullUrl = `${cfg.dakdakApiUrl}${url}`;

  log.debug(`Fetching via fax from ${fullUrl}`);

  return fetch(`${fullUrl}`, opts)
    .then(checkStatus)
    .then(parseJSON)
    .catch(e => {
      log.error('Fetch failed', e);
      return {};
    });
};


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    console.log(response.status);
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}
