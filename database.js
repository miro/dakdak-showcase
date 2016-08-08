// database
//  from https://github.com/miro/dakdak-api/blob/development/database.js
//
//  I'm like 99% sure there will be a day when I'll curse the decision
//  to use the same DB directly from different Heroku-app

const dbConfig            = require('./config').dbConfig;

const knex                = require('knex')(dbConfig);
const bookshelf           = require('bookshelf')(knex);
const _                   = require('lodash');


// # Define models
const models = {};

models.Image = bookshelf.Model.extend({
  tableName: 'images',
  uploader: () => this.belongsTo(models.User, 'uploaderId'),
  rider: () => this.belongsTo(models.Person, 'riderId'),
  photographer: () => this.belongsTo(models.Person, 'photographerId'),
  spot: () => this.belongsTo(models.Spot, 'spotId'),
  organisation: () =>
    this.belongsTo(models.Organisation, 'organisationId')
      .through(models.User, 'uploaderId')
});
models.Person = bookshelf.Model.extend({
  tableName: 'persons'
});
models.Spot = bookshelf.Model.extend({
  tableName: 'spots'
});
models.User = bookshelf.Model.extend({
  tableName: 'users',
  images: () => this.hasMany(models.Image, 'uploaderId')
});
models.Organisation = bookshelf.Model.extend({
  tableName: 'organisations',
  images: () => this.hasMany(models.Image, 'organisationId').through(models.User, 'uploaderId')
});
models.Rating = bookshelf.Model.extend({
  tableName: 'ratings',
  firstImage: () => this.belongsTo(models.Image, 'firstImageId'),
  secondImage: () => this.belongsTo(models.Image, 'secondImageId'),
  betterImage: () => this.belongsTo(models.Image, 'betterImageId')
});

const types = _.reduce(models, (result, item, key) => {
  result[key] = key;
  return result;
}, {});

module.exports = {
  models,
  types,

  config: dbConfig,
  knex: bookshelf.knex
};
