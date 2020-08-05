const models = require("../models");

const create = async ({ addressName, addressNumber, totalPrice, products, clientId }) => {
  const address = `${addressName}, numero: ${addressNumber}`;
  return models.order.create({ address, totalPrice, clientId, products });
};

const getByClientId = async (id) => {
  const orders = await models.order.getByClientId(id);
  return orders.map(({address, status, clientId, ...ordersData}) => ordersData)
};

module.exports = {
  create,
  getByClientId,
};
