import { getLocalStorage, setLocalStorage, renderHeaderFooter } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  const deleteButtons = document.querySelectorAll('#removeButton')
  let count = 0 
  deleteButtons.forEach((element)=>{
    count += 1
    let index = count
    element.addEventListener('click', () =>{
      deleteItemFromCart(index - 1)
    })
  })
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>

  <p class="cart-card__quantity">qty: 1</p>
  <p class="product-suggested-retail__price">$${item.SuggestedRetailPrice}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <a href="#" id="removeButton" > Remove Item</a>
</li>`;

  return newItem;
}

function deleteItemFromCart(index){
  
  const cartItems = getLocalStorage('so-cart');
  cartItems.splice(index, 1)
  setLocalStorage('so-cart', cartItems);
  renderCartContents()
  
}

// function calculateCartTotal(){
//   const cartItems = getLocalStorage('so-cart');
//   const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

//   const cartTotal = document.querySelector('.cart-total');
//   console.log(cartTotal)
//   cartTotal.innerText = `Total: $${total}`;
// };

function innit(){
  renderCartContents();
  renderHeaderFooter();
};

innit()