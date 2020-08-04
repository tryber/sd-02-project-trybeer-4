export const formatPrice = (price) => price.toLocaleString(
  'pt-BR',
  { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' },
);

export const calculateTotalPrice = (products) =>
  products.reduce(
    (acc, { unitPrice, quantity }) => acc + (unitPrice * quantity),
    0,
  );
