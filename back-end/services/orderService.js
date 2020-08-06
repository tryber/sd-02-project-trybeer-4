const models = require("../models");

const create = async ({ addressName, addressNumber, totalPrice, products, clientId }) => {
  const address = `${addressName}, numero: ${addressNumber}`;
  return models.order.create({ address, totalPrice, clientId, products });
};

const getByClientId = async (id) => {
  const orders = await models.order.getByClientId(id);
  return orders.map(({ products, ...ordersData }) => ordersData);
};

const findById = async (id) => {
  const order = await models.order.findById(id);
  return order.map(({ address, ...ordersData }) => ordersData);
}

module.exports = {
  create,
  getByClientId,
  findById,
};
