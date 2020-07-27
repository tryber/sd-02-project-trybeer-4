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

  const token = await services.user.login({ email, password });

  return res.status(200).json({ token });
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

  const newUser = await services.user.register({
    name: goodName,
    email,
    password,
    role,
  });

  return res.status(201).json({ newUser });
});

const getInfo = async (req, res) => {
  const { name, email } = req.user;
  return res.status(200).json({ name, email });
};

const edit = rescue(async (req, res, next) => {
  const { id: idFromUrl } = req.params;
  const { id: idFromAuth } = req.user;
  const { name } = req.body;

  const nameIsValid = validateName(name);
  if (!nameIsValid) {
    return next(boom.badData());
  }

  const goodName = name
    .trim()
    .split(' ')
    .filter((substr) => substr !== '')
    .join(' ')
    .toUpperCase();

  const editedUser = await services.user.edit({
    idFromUrl: Number(idFromUrl),
    idFromAuth,
    name: goodName,
  });

  return res.status(200).json({ editedUser });
});

module.exports = {
  login,
  register,
  getInfo,
  edit,
};
