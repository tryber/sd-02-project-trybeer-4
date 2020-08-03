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

const validateAddress = (addressName, addressNumber) => {
  return typeof addressName === 'string' && typeof addressNumber === 'number';
};

const validatePrice = (price) => {
  return typeof price === 'number';
};

const validateProducts = (products) => {
  if (Array.isArray(products)) {
    return products.every(({ productQuantity, productId }) => (
      (productQuantity && typeof productQuantity === 'number')
      &&
      (productId && typeof productId === 'number')
    ))
  }
  return false;
}

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateAddress,
  validatePrice,
  validateProducts,
};
