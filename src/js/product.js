import { setLocalStorage, getLocalStorage } from './utils.mjs';
import { findProductById } from './productData.mjs';

function addProductToCart(product) {
  let cart = getLocalStorage('so-cart');

  // If cart is not an array, initialize it as an empty array
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Add the new product to the cart
  cart.push(product);

  // Save the updated cart back to local storage
  setLocalStorage('so-cart', cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
