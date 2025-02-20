import { renderHeaderFooter, renderCheckoutForm, getLocalStorage}  from './utils.mjs';

const cartItems = getLocalStorage('so-cart');
console.log(cartItems)

renderHeaderFooter();

renderCheckoutForm();