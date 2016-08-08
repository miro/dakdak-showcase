// from https://github.com/miro/dakdak-api/tree/development/configs

const env         = process.env.DAKDAK_ENV || 'development';
const config      = require(`./envs/${env}.js`);

console.log(`Configs fetched with env "${env}"`);

config.env = env;

module.exports = config;
