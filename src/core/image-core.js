const log = require('../logger');
const fax = require('../fax');
const utils = require('../utils');

const image = {};

image.getLatest = function getLatestImages() {
  return fax('/api/v0/images/latest')
    .then(images => images.map(setUrlsToImage));
};

image.get = function getImageById(id) {
  return fax(`/api/v0/images/id/${id}`)
    .then(setUrlsToImage);
};


function setUrlsToImage(img) {
  img.urls = {
    thumb: utils.getImageUrl(img, 'thumb'),
    display: utils.getImageUrl(img),
    full: utils.getImageUrl(img, 'full')
  };

  return img;
}

module.exports = image;
