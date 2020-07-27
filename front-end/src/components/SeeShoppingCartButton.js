import React, { useContext } from 'react';

const SeeShoppingCartButton = ({ index }) => {

  return (
    <div className="quantity-handler">
      <button
        data-testid="checkout-bottom-btn"
        // onClick={subtractOne}
        // disabled={quantity === 0}
      >
        <div>Ver carrinho</div>
      </button>
    </div>
  );
};

export default SeeShoppingCartButton;
