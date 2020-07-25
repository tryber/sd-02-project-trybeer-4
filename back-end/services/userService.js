const boom = require('boom');
const jwt = require('jsonwebtoken');
const models = require('../models');

const { JWT_SECRET } = process.env;

const login = async ({ email, password }) => {
  const user = await models.user.findByEmail(email);

  if (!user || user.password !== password) {
    throw boom.unauthorized('Verifique seu email e senha')
  }

  const { password: _, id, ...userData } = user;

  const jwtConfig = {
    expiresIn: '50m',
    algorithm: 'HS256',
    subject: String(id),
  };

  const token = jwt.sign(userData, JWT_SECRET, jwtConfig);

  return token;
};

const register = async ({ name, email, password, role }) => {
  const isNotUnique = await models.user.findByEmail(email);

  if (isNotUnique) {
    throw boom.conflict('Email já está cadastrado')
  }

  const newUser = await models.user.create({ name, email, password, role });
  return newUser;
};

module.exports = {
  login,
  register,
};
