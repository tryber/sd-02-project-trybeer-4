const models = require("../models");
const boom = require('boom');

const create = async ({ addressName, addressNumber, totalPrice, products, clientId }) => {
  const address = `${addressName}, numero: ${addressNumber}`;
  return models.order.create({ address, totalPrice, clientId, products });
};

const getAll = async ({ id, role }) => {
  let orders = [];
  if (role === 'admin') {
    const allOrders = await models.order.getAll();
    orders.push(allOrders);
  }
  if (role === 'client') {
    const allClientOrders = await models.order.getByClientId(id);
    orders.push(allClientOrders);
  }
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
  getAll,
  findById,
  update,
};
