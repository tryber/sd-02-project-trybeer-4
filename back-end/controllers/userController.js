const rescue = require('express-rescue');
const boom = require('boom');
const services = require('../services');

const getInvalidDataFromLogin = (email, password) => {
  const invalidData = [];

  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  if (!emailRegex.test(email)) invalidData.push('email');

  const passwordRegex = /^\d+$/;
  if (!passwordRegex.test(password) || password.length < 6) invalidData.push('password');

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

  const nameWithoutSpaces = name
    .trim()
    .split(' ')
    .filter((substr) => substr !== '')
    .join('');
  const justLettersRegex = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;
  if (!justLettersRegex.test(nameWithoutSpaces) || nameWithoutSpaces.length < 12) invalidData.push('name');

  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  if (!emailRegex.test(email)) invalidData.push('email');

  const passwordRegex = /^\d+$/;
  if (!passwordRegex.test(password) || password.length < 6) invalidData.push('password');

  if (role !== 'client' && role !== 'admin') invalidData.push('role');

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

module.exports = {
  login,
  register,
};
