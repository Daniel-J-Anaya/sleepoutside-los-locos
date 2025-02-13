import { getLocalStorage, setLocalStorage } from './utils.mjs';
import { findProductById } from './productData.mjs';
import { cartState } from './components/state.svelte';

// let product = {};

export async function productDetails(productId, selector) {
    // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    try{
        let product =  await findProductById(productId);
        // once we have the product details we can render out the HTML
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
        calculateDiscountPercentage(product)
    }
    catch (error){
        console.log('Product not found')
        let errorHTML = errorTemplate()
        let container = document.querySelector(selector);

        container.insertAdjacentHTML('afterbegin', errorHTML);
    }
}
   


function productDetailsTemplate(product){

    return `
    
    <h3 id="productName">${product.Name}</h3>

    <h2 class="divider" id="productNameWithoutBrand">${product.NameWithoutBrand}</h2>

    <div class="product-container">
        <img
            class="divider"
            id="product-image"
            src="${product.Image}"
            alt="${product.Name}"
        />
        <img
            id="discount-tag-image"
            alt="Discount"
        />
    </div>

    <div class="product-pricing">
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product-suggested-retail__price">
            <s>$${product.SuggestedRetailPrice}</s>
        </p>
    </div>
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
  }



function errorTemplate(){

    return `<div class="error-container">
        <h1>Can't find product</h1>
        <p>Try another route</p>
        </div>`
}