

export const roundPrice = (num) => {
  return Math.round(num * 100) / 100;
};

export const formatPrice = (price) => {
  return "$" + addCommas(roundPrice(price).toFixed(2));
};

export const addCommas = (num) => {
  return num.toLocaleString('en-IN', { maximumSignificantDigits: 3 });
}

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

export const getRandomBool  = () => {
  return Math.random() >= 0.5;
}

export default formatPrice;