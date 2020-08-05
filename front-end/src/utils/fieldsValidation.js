export function nameValidation(name) {
  if (!name) return null;
  const nameWithoutSpaces = name
    .trim()
    .split(' ')
    .filter((substr) => substr !== '')
    .join('');

  const justLettersRegex = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;

  return justLettersRegex.test(nameWithoutSpaces) && nameWithoutSpaces.length >= 12;
}

export function emailValidation(email) {
  if (!email) return null;
  const mailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  return mailRegex.test(email);
}

export function passwordValidation(password) {
  if (!password) return null;
  const passwordRegex = /^\d+$/;
  return passwordRegex.test(password) && password.length >= 6;
}
