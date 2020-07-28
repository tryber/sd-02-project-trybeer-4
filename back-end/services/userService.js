const boom = require('boom');
const jwt = require('jsonwebtoken');
const models = require('../models');

const { JWT_SECRET } = process.env;

const login = async ({ email, password }) => {
  const user = await models.user.findByEmail(email);

  if (!user || user.password !== password) {
    throw boom.unauthorized('Verifique seu email e senha');
  }

  const { password: _, id, ...userData } = user;

  const jwtConfig = {
    expiresIn: '50m',
    algorithm: 'HS256',
    subject: String(id),
  };

  const token = jwt.sign(userData, JWT_SECRET, jwtConfig);

  return { ...userData, token };
};

const register = async ({ name, email, password, role }) => {
  const isNotUnique = await models.user.findByEmail(email);

  if (isNotUnique) {
    throw boom.conflict('Email já está cadastrado');
  }

  const { id, password: _, ...userData } = await models.user.create({
    name,
    email,
    password,
    role,
  });

  return userData;
};

const getInfo = async (id) => {
  const { id: _, password, ...userData } = await models.user.findById(id);
  return userData;
};

const edit = async ({ id, name }) => {
  const { id: _, password, ...userData } = await models.user.update({ id, name });
  return userData;
};

module.exports = {
  login,
  register,
  getInfo,
  edit,
};
