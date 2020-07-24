const { getTable } = require('./connection');

const getAll = async () => (
  await getTable('users')
    .then((table) =>
      table
        .select(['id', 'name', 'email', 'password', 'role'])
        .execute()
    )
    .then((results) => results.fetchAll())
    .then((users) =>
      users.map(([id, name, email, password, role]) => ({
        id,
        name,
        email,
        password,
        role,
      })
    ))
);

const findById = async (id) => (
  await getAll()
    .find((user) => user.id === id)
);

const findByEmail = async (email) => (
  await getAll()
    .find((user) => user.email === email)
);

const create = async ({ name, email, password, role = 'client' }) => (
  await getTable('users')
    .then((table) =>
      table
        .insert(['name', 'email', 'password', 'role'])
        .values([name, email, password, role])
        .execute()
    )
    .then(() => ({
      name,
      email,
      password,
      role,
    }))
);

const update = async ({ id, name }) => (
  await getTable('users')
    .then((table) =>
      table
        .update()
        .where('id = :id')
        .bind('id', id)
        .set('name', name)
        .execute(),
    )
    .then(async () => await findById(id))
);

const remove = async (id) => (
  await getTable('users')
    .then((table) =>
      table
        .delete()
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
);

module.exports = {
  getAll,
  findById,
  findByEmail,
  create,
  update,
  remove,
};
