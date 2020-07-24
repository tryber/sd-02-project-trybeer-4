const { getSession, getTable } = require('./connection');

const getOrdersWithoutProducts = async () => (
  await getTable('orders')
    .then((table) =>
      table
        .select(['id', 'address', 'total_price', 'date', 'status'])
        .execute()
    )
    .then((results) => results.fetchAll())
    .then((orders) => (
      orders.map(([id, address, totalPrice, date, status]) => ({
        id,
        address,
        totalPrice,
        date,
        status,
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

const findById = async (id) => (
  await getAll()
    .find((order) => order.id === id)
);

const create = async (saleData) => (
  connection()
    .then((db) => db.collection('sales').insertOne({ products: saleData }))
    .then((result) => ({ id: result.insertedId, products: saleData }))
);

const remove = async (id) => (
  connection()
    .then((db) => db.collection('sales').removeOne({ _id: ObjectId(id) }))
);

const update = async (id, saleData) => (
  connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { products: saleData } },
    ))
    .then(() => ({ id, products: saleData }))
);

module.exports = {
  getAll,
  findById,
};
