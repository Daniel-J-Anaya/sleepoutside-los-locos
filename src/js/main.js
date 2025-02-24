import { renderHeaderFooter, getLocalStorage, setLocalStorage } from './utils.mjs';

renderHeaderFooter();

let visited = (getLocalStorage('visited').length != 0) ? true : false;

if (visited){
    console.log(visited);
} else{
    setLocalStorage('visited',true);
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
        <li>💎 Free Giveaway for New Members</li>
        <li>🎁 Win exclusive prizes</li>
        <li>🚀 Easy registration - Get started now!</li>
      </ul>
      <button class="register-btn" id="register-btn">Register Now</button>
    </div>
  </div>
    `

    document.querySelector('main').insertAdjacentHTML('afterbegin',bannerHTML)
}