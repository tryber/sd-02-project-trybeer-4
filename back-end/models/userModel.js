const { getTable } = require('./connection');
const { updateTable } = require('./utils');

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
    .then((users) => users
      .find((user) => user.id === id)
    )
);

const findByEmail = async (email) => (
  getAll()
    .then((users) => users
      .find((user) => user.email === email)
    )
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
  updateTable('users', id, 'name', name)
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
