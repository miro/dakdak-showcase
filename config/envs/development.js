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
cfg.storageUrl = 'https://storage.googleapis.com/kajaaniskate/'; // HOX prod bucket

module.exports = cfg;
