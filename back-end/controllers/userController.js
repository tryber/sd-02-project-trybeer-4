const rescue = require('express-rescue');
const boom = require('boom');
const services = require('../services');

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const emailRegex = /[a-z-]+@[a-z-]+/;
  const passwordRegex = /^\d+$/;

  const invalidData = [];

  if (!emailRegex.test(email)) invalidData.push('email');
  if (!passwordRegex.test(password) || password.length < 6) invalidData.push('password');

  if (invalidData.length > 0) {
    return next(boom.badData('Dados inválidos', invalidData.join(', ')));
  }

  const token = await services.user.login(email, password);

  return res.status(200).json({ token });
});

module.exports = {
  login,
};
