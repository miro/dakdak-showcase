// Originally from https://github.com/miro/kadkad-mgmt/blob/development/src/utils/utils.js

const storageUrl = require('../config').storageUrl;

const utils = {};


utils.getImageUrl = function getImageUrl(imageModel, size) {
  let baseUrl = storageUrl + imageModel.storageId;

  switch (size) {
    case 'thumb':
      return `${baseUrl}--thumb`;
    case 'full':
      return baseUrl;
    default:
      return `${baseUrl}--display`;
  }
};


if (!storageUrl) {
  throw new Error('No storageUrl configured!');
}

module.exports = utils;
