const validateName = (name) => {
  const nameWithoutSpaces = name
    .trim()
    .split(' ')
    .filter((substr) => substr !== '')
    .join('');

  const justLettersRegex = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;

  return justLettersRegex.test(nameWithoutSpaces) && nameWithoutSpaces.length >= 12;
};

const validateEmail = (email) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^\d+$/;
  return passwordRegex.test(password) && password.length >= 6;
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
