import React, { useState, useEffect } from 'react';
import requestAPI from '../services/backEndAPI';
import SideMenu from '../components/SideMenu';
import { formatDate, formatPrice } from '../utils';
import '../styles/ClientOrderDetails.css';

const ClientOrderDetails = ({ match }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user')) || {};
    const { id } = match.params;
    requestAPI('GET', `/orders/${id}`, null, token)
      .then(({ data }) => setOrder(data))
      .catch((error) => alert(error));
  }, []);

  return order ? (
    <div>
      <SideMenu />
      <div>
        <section className="client-order-title">
          <h2 data-testid="order-number">
            {`Pedido ${order.id}`}
          </h2>
          <h2 data-testid="order-date">
            {formatDate(order.date)}
          </h2>
        </section>
        <section className="client-order-products">
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
          <div data-testid="order-total-value">
            {`Total: ${formatPrice(order.totalPrice)}`}
          </div>
        </section>
      </div>
    </div>
  ) : null;
};

export default ClientOrderDetails;
