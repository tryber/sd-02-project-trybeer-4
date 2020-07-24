// Acredito que a maioria dessas funções não serão usadas,
// pois não está explícito um CRUD de produtos nos requisitos da aplicação.

const { getTable } = require('./connection');

const getAll = async () => (
  await getTable('products')
    .then((table) =>
      table
        .select(['id', 'name', 'unit_price', 'image_url'])
        .execute()
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

const getById = async (id) => (
  await getAll()
    .find((recipe) => recipe.id === id)
);

const create = async ({ name, unitPrice, imageUrl }) => (
  await getTable('products')
    .then((table) =>
      table
        .insert(['name', 'unit_price', 'image_url'])
        .values(name, unitPrice, imageUrl)
        .execute(),
    )
    .then(({ getAutoIncrementValue }) => ({
      id: getAutoIncrementValue(),
      name,
      unitPrice,
      imageUrl,
    }))
);

const update = async ({ id, name, unitPrice, imageUrl }) => (
  await getTable('products')
    .then((table) =>
      table
        .update()
        .where('id = :id')
        .bind('id', id)
        .set('name', name)
        .set('unit_price', unitPrice)
        .set('image_url', imageUrl)
        .execute(),
    )
    .then(() => getById(id))
);

const remove = async (id) => (
  await getTable('products')
    .then((table) =>
      table
        .delete()
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
);

const addImageUrl = ({ id, imageUrl }) => (
  await getTable('products')
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
  getById,
  create,
  update,
  remove,
  addImageUrl,
};
