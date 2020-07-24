const { getTable } = require('./connection');

const getAll = async () => (
  getTable('users')
    .then((table) =>
      table
        .select(['id', 'name', 'email', 'password', 'role'])
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((users) =>
      users.map(([id, name, email, password, role]) => ({
        id,
        name,
        email,
        password,
        role,
      }),
    ))
);

const findById = async (id) => (
  getAll()
    .find((user) => user.id === id)
);

const findByEmail = async (email) => (
  getAll()
    .find((user) => user.email === email)
);

const create = async ({ name, email, password, role = 'client' }) => (
  getTable('users')
    .then((table) =>
      table
        .insert(['name', 'email', 'password', 'role'])
        .values([name, email, password, role])
        .execute(),
    )
    .then(() => ({
      name,
      email,
      password,
      role,
    }))
);

const update = async ({ id, name }) => (
  getTable('users')
    .then((table) =>
      table
        .update()
        .where('id = :id')
        .bind('id', id)
        .set('name', name)
        .execute(),
    )
    .then(async () => findById(id))
);

const remove = async (id) => (
  getTable('users')
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
