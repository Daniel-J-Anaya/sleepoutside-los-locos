import { getLocalStorage, setLocalStorage } from './utils.mjs';
import { findProductById } from './productData.mjs';
import { cartState } from './components/state.svelte';

// let product = {};

export async function productDetails(productId, selector) {
    // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    let product =  await findProductById(productId);
    // once we have the product details we can render out the HTML
    console.log(product);
    let productHTML = productDetailsTemplate(product);
    let container = document.querySelector(selector);

    container.insertAdjacentHTML('afterbegin', productHTML);

    // add a listener to Add to Cart button
    let button = document.querySelector('#addToCart')
    button.addEventListener('click', addProductToCart(product))

    // trigger animation
    const anim = document.querySelector('.cart svg');
    button.addEventListener('click', () => {
        anim.classList.add('animation');
        setTimeout(() => {
            anim.classList.remove('animation');
        }, 1000);
    })
    
}
   


function productDetailsTemplate(product){

    return `
    
    <h3 id="productName">${product.Name}</h3>

    <h2 class="divider" id="productNameWithoutBrand">${product.NameWithoutBrand}</h2>

    <img
        class="divider"
        id="productImage"
        src="${product.Image}"
        alt="${product.Name}"
    />

    <p class="product-suggested-retail__price" id="productSuggestedRetailPrice">$${product.SuggestedRetailPrice}.00</p>

    <p class="product-card__price" id="productFinalPrice">${product.FinalPrice}</p>

    <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>

    <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>

    <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
    
    `
}




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

    cartState.count = cartContents.length;
  }