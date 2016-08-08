const cfg = {};

cfg.dbConfig = {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    user: 'dakdak',
    port: 5432,
    password: 'dakdak',
    database: 'dakdak',
    charset: 'utf8'
  }
};

cfg.dakdakApiUrl = 'http://localhost:5000';
module.exports = cfg;
