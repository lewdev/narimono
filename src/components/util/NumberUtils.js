

export const roundPrice = (num) => {
  return Math.round(num * 100) / 100;
};

export const formatPrice = (price) => {
  return "$" + roundPrice(price).toFixed(2);
};

export default formatPrice;