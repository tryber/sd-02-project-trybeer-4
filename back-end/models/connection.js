const mysqlx = require('@mysql/xdevapi');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_SCHEMA } = require('dotenv');

const getSession = () => (
  mysqlx.getSession({
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_SCHEMA,
  })
);

const getSchema = () => (
  getSession()
    .then(({ getSchema }) => getSchema('trybeer'))
);

module.exports = {
  getSession,
  getSchema,
};
