const { getSession, getTable } = require('./connection');

const getOrdersWithoutProducts = async () => (
  await getTable('orders')
    .then((table) =>
      table
        .select(['id', 'address', 'total_price', 'date', 'status', 'client_id'])
        .execute()
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
  ids.map((id) =>
    await getSession()
      .then((session) =>
        session
          .sql(`
            SELECT
            product_id,
            product_quantity
            FROM trybeer.order_product
            WHERE order_id = ?;
          `)
          .bind(id)
          .execute()
      )
      .then((results) => results.fetchAll())
      .then((products) => products.map(([productId, productQuantity]) => ({
        productId,
        productQuantity,
      })))
  )
);

const getAll = async () => {
  const ordersWithoutProducts = await getOrdersWithoutProducts();
  const ids = ordersWithoutProducts.map(({ id }) => id);
  const productsForEachOrder = await getProductsForEachOrder(ids);

  return ordersWithoutProducts.map((order, i) => ({
    ...order,
    products: productsForEachOrder[i]
  }))
};

const getByClientId = async (clientId) => (
  await getAll()
    .filter((order) => order.clientId === clientId)
);

const findById = async (id) => (
  await getAll()
    .find((order) => order.id === id)
);

const insertInOrders = async ({ address, totalPrice, clientId }) => (
  await getTable('orders')
    .then((table) =>
      table
        .insert(['address', 'total_price', 'client_id'])
        .values(address, totalPrice, clientId)
        .execute(),
    )
    .then(({ getAutoIncrementValue }) =>
      await findById(getAutoIncrementValue())
    )
);

const insertInOrderProduct = async ({ orderId, products }) => (
  products.map(({ productId, productQuantity }) =>
    await getTable('orders')
      .then((table) =>
        table
          .insert(['order_id', 'product_id', 'product_quantity'])
          .values(orderId, productId, productQuantity)
          .execute(),
      )
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
  await getTable('orders')
    .then((table) =>
      table
        .update()
        .where('id = :id')
        .bind('id', id)
        .set('status', status)
        .execute(),
    )
    .then(() => await findById(id))
);

const remove = async (id) => (
  await getTable('orders')
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
