const mysqlx = require('@mysql/xdevapi');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_SCHEMA } = process.env;

const getSession = async () => (
  await mysqlx.getSession({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    schema: DB_SCHEMA,
  })
);

const getTable = async (table) => (
  await getSession()
    .then((session) => session.getSchema('trybeer'))
    .then((db) => db.getTable(table))
);

module.exports = {
  getSession,
  getTable,
};
