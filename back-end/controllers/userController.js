const rescue = require('express-rescue');
const boom = require('boom');
const services = require('../services');
const { validateName, validateEmail, validatePassword } = require('./utils');

const getInvalidDataFromLogin = (email, password) => {
  const invalidData = [];

  const emailIsValid = validateEmail(email);
  if (!emailIsValid) invalidData.push('email');

  const passwordIsValid = validatePassword(password);
  if (!passwordIsValid) invalidData.push('password');

  return invalidData;
};

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const invalidData = getInvalidDataFromLogin(email, password);

  if (invalidData.length > 0) {
    return next(boom.badData('Dados inválidos', invalidData.join(', ')));
  }

  const loginData = await services.user.login({ email, password });

  return res.status(200).json({ ...loginData });
});

const getInvalidDataFromRegister = (name, email, password, role) => {
  const invalidData = [];

  const nameIsValid = validateName(name);
  if (!nameIsValid) invalidData.push('name');

  const emailIsValid = validateEmail(email);
  if (!emailIsValid) invalidData.push('email');

  const passwordIsValid = validatePassword(password);
  if (!passwordIsValid) invalidData.push('password');

  const roleIsValid = role === 'client' || role === 'admin';
  if (!roleIsValid) invalidData.push('role');

  return invalidData;
};

const register = rescue(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const invalidData = getInvalidDataFromRegister(name, email, password, role);

  if (invalidData.length > 0) {
    return next(boom.badData('Dados inválidos', invalidData.join(', ')));
  }

  const goodName = name
    .trim()
    .split(' ')
    .filter((substr) => substr !== '')
    .join(' ')
    .toUpperCase();

  const userData = await services.user.register({
    name: goodName,
    email,
    password,
    role,
  });

  return res.status(201).json({ ...userData });
});

const getInfo = rescue(async (req, res) => {
  const { id } = req.user;
  const userData = await services.user.getInfo(id);
  return res.status(200).json({ ...userData });
});

const edit = rescue(async (req, res, next) => {
  const { id } = req.user;
  const { name } = req.body;

  const nameIsValid = validateName(name);
  if (!nameIsValid) {
    return next(boom.badData('Dados inválidos', 'name'));
  }

  const goodName = name
    .trim()
    .split(' ')
    .filter((substr) => substr !== '')
    .join(' ')
    .toUpperCase();

  const userData = await services.user.edit({
    id,
    name: goodName,
  });

  return res.status(200).json({ ...userData });
});

const confirmToken = (_req, res) => res.status(204).end();

module.exports = {
  login,
  register,
  getInfo,
  edit,
  confirmToken,
};
