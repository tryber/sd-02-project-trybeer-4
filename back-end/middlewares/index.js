const fieldsValidator = require('./fieldsValidator');
const authentication = require('./authentication');
const boomErrorHandler = require('./boomErrorHandler');
const otherErrorsHandler = require('./otherErrorsHandler');

module.exports = {
  fieldsValidator,
  authentication,
  boomErrorHandler,
  otherErrorsHandler,
};
