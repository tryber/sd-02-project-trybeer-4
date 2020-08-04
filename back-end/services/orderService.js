const models = require("../models");

const create = async ({ addressName, addressNumber, totalPrice, products, clientId }) => {
  const address = `${addressName}, numero: ${addressNumber}`;
  return models.order.create({ address, totalPrice, clientId, products });
};

module.exports = {
  create,
};
