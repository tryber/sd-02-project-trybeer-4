const { getTable } = require('./connection');

const getAll = async () => (
  getTable('products')
    .then((table) =>
      table
        .select(['id', 'name', 'unit_price', 'image_url'])
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((products) => (
      products.map(([id, name, unitPrice, imageUrl]) => ({
        id,
        name,
        unitPrice,
        imageUrl,
      }))
    ))
);

const findById = async (id) => (
  getAll()
    .find((recipe) => recipe.id === id)
);

const create = async ({ name, unitPrice }) => (
  getTable('products')
    .then((table) =>
      table
        .insert(['name', 'unit_price'])
        .values(name, unitPrice)
        .execute(),
    )
    .then(({ getAutoIncrementValue }) => ({
      id: getAutoIncrementValue(),
      name,
      unitPrice,
    }))
);

const update = async ({ id, name, unitPrice }) => (
  getTable('products')
    .then((table) =>
      table
        .update()
        .where('id = :id')
        .bind('id', id)
        .set('name', name)
        .set('unit_price', unitPrice)
        .execute(),
    )
    .then(async () => findById(id))
);

const remove = async (id) => (
  getTable('products')
    .then((table) =>
      table
        .delete()
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
);

const setImageUrl = async ({ id, imageUrl }) => (
  getTable('products')
    .then((table) =>
      table
        .update()
        .where('id = :id')
        .bind('id', id)
        .set('image_url', imageUrl)
        .execute(),
    )
);

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  setImageUrl,
};
