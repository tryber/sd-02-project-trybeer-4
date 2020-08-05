import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ProductsContext } from '../contexts/ProductsContext';
import { calculateTotalPrice } from '../utils';
import requestAPI from '../services/backEndAPI';

const finishCheckout = async (body, setRedirect) => {
  const { token } = JSON.parse(localStorage.getItem('user')) || {};
  try {
    await requestAPI('POST', '/orders', body, token);
    alert('Compra realizada com sucesso!');
    localStorage.removeItem('products');
    return setRedirect(true);
  } catch (err) {
    return err.response
      ? alert(err.response.data.error.message)
      : alert(err);
  }
};

const CheckoutButton = () => {
  const { quantities, addressName, addressNumber } = useContext(ProductsContext);
  const [redirect, setRedirect] = useState(false);

  const productsInShoppingCart = (JSON.parse(localStorage.getItem('products')) || [])
    .map((product, i) => ({
      ...product,
      quantity: quantities[i],
    }))
    .filter(({ quantity }) => quantity > 0);

  const totalPrice = calculateTotalPrice(productsInShoppingCart);
  const disabled = !addressName || !addressNumber || !(totalPrice > 0);

  const products = productsInShoppingCart
    .map(({ id, quantity }) => ({
      productId: id,
      productQuantity: quantity,
    }));

  const body = { addressName, addressNumber, products, totalPrice };

  if (redirect) return <Redirect to="/products" />;

  return (
    <div>
      <button
        data-testid="checkout-finish-btn"
        disabled={disabled}
        onClick={() => finishCheckout(body, setRedirect)}
      >
        Finalizar Pedido
      </button>
    </div>
  );
};

export default CheckoutButton;
