import React, { useEffect, useState } from 'react';
import AdminSideMenu from '../components/AdminSideMenu';
import requestAPI from '../services/backEndAPI';
import { formatPrice } from '../utils';
import '../styles/AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user')) || {};
    requestAPI('GET', '/orders', null, token)
      .then(({ data }) => setOrders(data))
      .catch((error) => alert(error));
  }, []);

  return (
    <div className="admin-orders-page">
      <AdminSideMenu />
      <div className="admin-orders-body">
        <h1>Pedidos Pendentes</h1>
        <div className="orders-cards-admin">
          {orders.map(({ id, address, totalPrice, status }, index) => (
            <a href={`/admin/orders/${id}`} className="order-card-admin">
              <div>
                <h3 data-testid={`${index}-order-number`}>
                  {`Pedido ${id}`}
                </h3>
                <div data-testid={`${index}-order-address`}>
                  {address.replace('numero:', '')}
                </div>
              </div>
              <div data-testid={`${index}-order-total-value`} className="order-card-admin-down">
                <div className="order-card-price">
                  {formatPrice(totalPrice)}
                </div>
                <div className={status === 'pendente' ? 'status-pending' : 'status-delivered'}>
                  {status}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
