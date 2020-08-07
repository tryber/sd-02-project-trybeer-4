import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import requestAPI from '../services/backEndAPI';
import { formatPrice, formatDate } from '../utils';
import '../styles/MyOrdersPage.css';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user')) || {};
    requestAPI('GET', '/orders', null, token)
      .then(({ data }) => setOrders(data.reverse()))
      .catch((error) => alert(error));
  }, []);

  return (
    <div>
      <Header title="Meus Pedidos" />
      {orders.map(({ id, date, totalPrice }, index) => (
        <a href={`/orders/${id}`} className="order-card-client">
          <div className="order-card-client-up">
            <h3 data-testid={`${index}-order-number`}>
              {`Pedido ${id}`}
            </h3>
            <div data-testid={`${index}-order-date`}>
              {formatDate(date)}
            </div>
          </div>
          <div data-testid={`${index}-order-total-value`} className="order-card-client-down">
            {formatPrice(totalPrice)}
          </div>
        </a>
      ))}
    </div>
  );
};

export default MyOrdersPage;
