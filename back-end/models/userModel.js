const { getTable } = require('./connection');

const findByEmail = async (emailParam) => (
  await getTable('users')
    .then((table) =>
      table
        .select(['id', 'name', 'email', 'password', 'role'])
        .where('email = :email')
        .bind('email', emailParam)
        .execute()
    )
    .then((results) => results.fetchAll())
    .then((users) => (
      users.map(([id, name, email, password, role]) => ({
        id,
        name,
        email,
        password,
        role,
      }))[0]
    ))
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

module.exports = {
  findByEmail,
  create,
};
