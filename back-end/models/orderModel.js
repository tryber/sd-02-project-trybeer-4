const { getSession, getTable } = require('./connection');
const { updateTable } = require('./utils');

const getOrdersWithoutProducts = async () => (
  getTable('orders')
    .then((table) =>
      table
        .select(['id', 'address', 'total_price', 'date', 'status', 'client_id'])
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((orders) => (
      orders.map(([id, address, totalPrice, date, status, clientId]) => ({
        id,
        address,
        totalPrice,
        date,
        status,
        clientId,
      }))
    ))
);

const getProductsForEachOrder = async (ids) => (
  Promise.all(ids.map((id) =>
    getSession()
      .then((session) =>
        session
          .sql(
            `SELECT 
            op.product_id, 
            op.product_quantity, 
            (SELECT p.name FROM trybeer.products p WHERE op.product_id = p.id),
            (SELECT p.unit_price FROM trybeer.products p WHERE op.product_id = p.id),
            (SELECT p.unit_price * op.product_quantity FROM trybeer.products p WHERE op.product_id = p.id)
            FROM
            trybeer.order_product op
            WHERE
            order_id = ?;`
          )
          .bind(id)
          .execute(),
      )
      .then((results) => results.fetchAll())
      .then((products) => products.map(([
        productId,
        productQuantity,
        productName,
        unitPrice,
        totalProductPrice,
      ]) => ({
        productId,
        productQuantity,
        productName,
        unitPrice,
        totalProductPrice,
      }))),
  ))
);

const getAll = async () => {
  const ordersWithoutProducts = await getOrdersWithoutProducts();
  const ids = ordersWithoutProducts.map(({ id }) => id);
  const productsForEachOrder = await getProductsForEachOrder(ids);

  return ordersWithoutProducts.map((order, i) => ({
    ...order,
    products: productsForEachOrder[i],
  }));
};

const getByClientId = async (clientId) => (
  getAll()
    .then((orders) => orders
      .filter((order) => order.clientId === clientId),
    )
);

const findById = async (id) => (
  getAll()
    .then((orders) => orders
      .filter((order) => order.id === id),
    )
);

const insertInOrders = async ({ address, totalPrice, clientId }) => (
  getTable('orders')
    .then((table) =>
      table
        .insert(['address', 'total_price', 'client_id'])
        .values(address, totalPrice, clientId)
        .execute(),
    )
    .then(async ({ getAutoIncrementValue }) =>
      findById(getAutoIncrementValue()),
    )
);

const insertInOrderProduct = async ({ orderId, products }) => (
  products.map(async ({ productId, productQuantity }) =>
    getTable('order_product')
      .then((table) =>
        table
          .insert(['order_id', 'product_id', 'product_quantity'])
          .values(orderId, productId, productQuantity)
          .execute(),
      ),
  )
);

const create = async ({ address, totalPrice, clientId, products }) => {
  const order = await insertInOrders({ address, totalPrice, clientId });
  await insertInOrderProduct({ orderId: order.id, products });

  return {
    ...order,
    products,
  };
};

const update = async ({ id, status }) => (
  updateTable('orders', id, 'status', status)
    .then(async () => findById(id))
);

const remove = async (id) => (
  getTable('orders')
    .then((table) =>
      table
        .delete()
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
);

module.exports = {
  getAll,
  getByClientId,
  findById,
  create,
  update,
  remove,
};
