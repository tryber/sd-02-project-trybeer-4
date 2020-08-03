export const formatPrice = (price) => price.toLocaleString(
  'pt-BR',
  { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' },
);

// export const calculateTotalPrice = (products, quantities) =>
//   products.reduce(
//     (acc, { unitPrice }, i) => acc + (unitPrice * quantities[i]),
//     0,
//   );

export const calculateTotalPrice = (products) =>
  products.reduce(
    (acc, { unitPrice, quantity }, i) => acc + (unitPrice * quantity),
    0,
  );
