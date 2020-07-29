const models = require('../models');

const getAll = async () => {
  const products = await models.product.getAll();
  return products;
};

module.exports = {
  getAll,
};
