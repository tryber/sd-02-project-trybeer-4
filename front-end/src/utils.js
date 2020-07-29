export const formatPrice = (price) => price.toLocaleString(
  'pt-BR',
  { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' },
);
