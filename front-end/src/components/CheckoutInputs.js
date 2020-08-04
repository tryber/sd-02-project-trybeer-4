import React, { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';
//import '../styles/CheckoutInputs.css';

const CheckoutInputs = () => {
  const {
    addressName,
    setAddressName,
    addressNumber,
    setAddressNumber
  } = useContext(ProductsContext);

  return (
    <section>
      <h2>Endereço</h2>
      <label htmlFor="addressName">Rua:</label>
      <input
        id="addressName"
        name="addressName"
        type="text"
        required
        data-testid="checkout-street-input"
        value={addressName}
        onChange={({ target: { value } }) => setAddressName(value)}
      />
      <label htmlFor="addressNumber">Número da casa:</label>
      <input
        id="addressNumber"
        name="addressNumber"
        type="addressNumber"
        type="text"
        required
        data-testid="checkout-house-number-input"
        value={addressNumber}
        onChange={(({ target: { value } }) => setAddressNumber(value))}
      />
    </section>
  );
};

export default CheckoutInputs;
