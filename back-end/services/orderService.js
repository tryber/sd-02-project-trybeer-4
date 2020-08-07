const models = require("../models");
const boom = require('boom');

const create = async ({ addressName, addressNumber, totalPrice, products, clientId }) => {
  const address = `${addressName}, numero: ${addressNumber}`;
  return models.order.create({ address, totalPrice, clientId, products });
};

const getByClientId = async (id) => {
  const orders = await models.order.getByClientId(id);
  return orders.map(({ products, ...ordersData }) => ordersData);
};

const findById = async (id) => {
  const { address, ...ordersData } = await models.order.findById(id);
  return ordersData;
}

const update = async ({ id, role }) => {
  if (role !== 'admin') {
    throw boom.unauthorized('Ação permitida apenas para administradores');
  }
  const { address, ...orderData } = await models.order.update(id);
  return orderData;
}

module.exports = {
  create,
  getByClientId,
  findById,
  update,
};
