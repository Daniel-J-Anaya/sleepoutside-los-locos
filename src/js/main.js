import { mount } from 'svelte';
import { renderHeaderFooter, getLocalStorage, setLocalStorage } from './utils.mjs';
import { loadAlerts } from './alert.js';

renderHeaderFooter();
loadAlerts();

// const productList = mount(ProductList, {
//   target: document.querySelector('.products'),
//   props: { category: 'tents' }
// });

let visited = getLocalStorage('visited');

if (visited.length != 0){
  let prevDate = new Date(visited[0])
  const currentDate = new Date();
    
  const timeDifference = currentDate - prevDate; 
  const daysPassed = timeDifference / (1000 * 3600 * 24); // Convert ms to days
  
  if (daysPassed >= 3) {
    createSignUp()
    setLocalStorage('visited', currentDate.toISOString());
  }
} else{  
  setLocalStorage('visited', new Date().toISOString());
  createBanner();

}

function createBanner(){
    let bannerHTML = `
    <div class="banner" id="banner">
    <div class="banner-content">
      <span class="close" id="close">&times;</span>
      <h2>Win Big! 🎉</h2>
      <p>Register today to enter our exclusive giveaway and stand a chance to win amazing prizes!</p>
      <ul>
        <li>Free Giveaway for New Members</li>
        <li>Win exclusive prizes</li>
        <li>Easy registration - Get started now!</li>
      </ul>
      <button class="register-btn" id="register-btn">Register Now</button>
    </div>
  </div>
    `

  document.querySelector('main').insertAdjacentHTML('afterbegin',bannerHTML)

  document.querySelector('.close').addEventListener('click', closeBanner)
}

function closeBanner(){
  document.querySelector('.banner').style.display = 'none'
}

function createSignUp(){
  let signUpHTML = `
  <div class="banner" id="banner">
    <div class="banner-content">
      <span class="close" id="close">&times;</span>
      <h2>Join us</h2>
      <p>Subscribe to receive our offers and get notified about new products</p>
      <input style='width:300px; padding:12px; margin:10px;'' type=textarea placeholder="YOUR EMAIL ADDRESS">
      <button class="register-btn" id="register-btn">SUBSCRIBE</button>
    </div>
  </div>`

  document.querySelector('main').insertAdjacentHTML('afterbegin',signUpHTML)

  document.querySelector('.close').addEventListener('click', closeBanner)
}