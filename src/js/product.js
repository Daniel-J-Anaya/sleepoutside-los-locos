import { setLocalStorage, getLocalStorage, getParam} from './utils.mjs';
import { findProductById } from './productData.mjs';
import { productDetails } from './productDetails.mjs';
import { loadAlerts } from './alert.js';

const productId = getParam('product');
productDetails(productId, '.product-detail');

function addProductToCart(product) {
  // Retrieve the existing cart from localStorage
  let cart = getLocalStorage('so-cart');

  // If cart is not an array (i.e., a single product), make it an array
  if (!Array.isArray(cart)) {
    cart = cart ? [cart] : [];
  }

  // Check if the product is already in the cart
  const existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    // Product exists in the cart, increment the quantity
    cart[existingProductIndex].quantity += product.quantity;
  } else {
    // Product is not in the cart, add it with the quantity
    cart.push(product);
  }

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
};

// add listener to Add to Cart button
setTimeout(1000, () => {document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler)});

getParam('product');

loadAlerts();
