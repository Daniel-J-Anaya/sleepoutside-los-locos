import { setLocalStorage, getLocalStorage, getParam} from './utils.mjs';
import { findProductById } from './productData.mjs';
import { productDetails } from './productDetails.mjs';

const productId = getParam('product');
productDetails(productId, '.product-detail');

function addProductToCart(product) {
  // Retrieve the existing cart from localStorage
  let cart = getLocalStorage('so-cart');

  // If cart is not an array (i.e., a single product), make it an array
  if (!Array.isArray(cart)) {
    cart = cart ? [cart] : [];
  }

  // Add the new product to the cart array
  cart.push(product);

  // Save the updated cart back to localStorage
  setLocalStorage('so-cart', cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);


getParam('product')

