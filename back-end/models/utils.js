const { getTable } = require('./connection');

const updateTable = async (tableName, id, newPropName, newPropValue) => (
  getTable(tableName)
    .then((table) =>
      table
        .update()
        .where('id = :id')
        .bind('id', id)
        .set(newPropName, newPropValue)
        .execute(),
    )
);

module.exports = {
  updateTable,
};
