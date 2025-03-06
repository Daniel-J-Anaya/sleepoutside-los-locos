import { getLocalStorage, setLocalStorage, renderHeaderFooter, setupColorSelection } from './utils.mjs';
import { findProductById } from './externalServices.mjs';
import { cartState } from './components/state.svelte';

// let product = {};

function addProductToCart(product) {
    let cart = getLocalStorage('so-cart');

    if (!Array.isArray(cart)) {
        cart = cart ? [cart] : [];
    }

    // Check if the product is already in the cart
    let existingProduct = cart.find(item => item.Id === product.Id);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity
    } else {
        product.quantity = 1; // Add product with quantity property
        cart.push(product);
    }

    setLocalStorage('so-cart', cart);
};
  
export async function productDetails(productId, selector) {
    // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    try{
        renderHeaderFooter();
        let product =  await findProductById(productId);
        // once we have the product details we can render out the HTML
        let productHTML = productDetailsTemplate(product);
        let container = document.querySelector(selector);
        
        container.insertAdjacentHTML('afterbegin', productHTML);
        setupColorSelection();
        
        // add a listener to Add to Cart button
        let button = document.querySelector('#addToCart')
        button.addEventListener('click', () => {addProductToCart(product)})

        // trigger animation
        const anim = document.querySelector('.cart svg');
        button.addEventListener('click', () => {
            anim.classList.add('animation');
            setTimeout(() => {
                anim.classList.remove('animation');
            }, 1000);
        })
    }
    catch (error){
        console.log('Product not found')
        let errorHTML = errorTemplate()
        let container = document.querySelector(selector);

        container.insertAdjacentHTML('afterbegin', errorHTML);
    }
}



function productDetailsTemplate(product){
    
        // Generate color buttons
        let colorButtonsHTML = '';
        if (product.Colors && product.Colors.length > 1) {
            colorButtonsHTML = `
            <div class="color-buttons">
                ${product.Colors.map(color => `
                    <button 
                        class="detail-color-button" 
                        title="${color.ColorName}" 
                        style="background-image: url(${color.ColorChipImageSrc});"
                        data-image="${color.ColorPreviewImageSrc}"
                        data-color-name="${color.ColorName}"
                    ></button>
                `).join('')}
            </div>`;
        }
    return `
    
    <h3 id="productName">${product.Name}</h3>

    <h2 class="divider" id="productNameWithoutBrand">${product.NameWithoutBrand}</h2>

    <div class="product-container">
        <img
            class="divider"
            id="product-image"
            src="${product.Images.PrimaryExtraLarge}"
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
      ${colorButtonsHTML}
    <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>

    <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>

    <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
    
    `
}

function errorTemplate(){

    return `<div class="error-container">
        <h1>Can't find product</h1>
        <p>Try another route</p>
        </div>`
}