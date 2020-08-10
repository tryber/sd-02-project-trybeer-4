import React, { useState, useEffect } from 'react';
import requestAPI from '../services/backEndAPI';
import { formatDate, formatPrice } from '../utils';
import AdminSideMenu from '../components/AdminSideMenu';
import '../styles/AdminOrderDetails.css';

const AdminOrderDetails = ({ match }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user')) || {};
    const { id } = match.params;
    requestAPI('GET', `/orders/${id}`, null, token)
      .then(({ data }) => setOrder(data))
      .catch((error) => alert(error));
  }, []);

  return order && (
    <div>
      <AdminSideMenu />
      <div className="admin-order-details-body">
        <section className="admin-order-title">
          <h2 data-testid="order-number">
            {`Pedido ${order.id}-`}
          </h2>
          <h2 data-testid="order-status" className={order.status === 'pendente' ? 'status-pending' : 'status-delivered'}>
            {`${order.status}`}
          </h2>
        </section>
        <section className="order-products-body">
          <section className="admin-order-products">
            {order.products.map(({ productQuantity, productName, totalProductPrice }, index) => (
              <div>
                <div data-testid={`${index}-product-qtd`}>{productQuantity}</div>
                <div data-testid={`${index}-product-name`}>{productName}</div>
                <div data-testid={`${index}-product-total-value`}>
                  {formatPrice(totalProductPrice)}
                </div>
              </div>
            ))}
          </section>
          <section className="client-order-total-value">
            <h2 data-testid="order-total-value">
              {`Total: ${formatPrice(order.totalPrice)}`}
            </h2>
          </section>
        </section>
        <button type="button" hidden={order.status === 'entregue'}>
          Marcar como entregue
        </button>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
