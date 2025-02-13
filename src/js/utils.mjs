import MainHeader from './components/MainHeader.svelte';
import MainFooter from './components/MainFooter.svelte';
import { mount } from 'svelte';

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      const parsedData = JSON.parse(data);

      // Ensure the returned data is an array, even if it's a single object
      return Array.isArray(parsedData) ? parsedData : [parsedData];
    } catch (e) {
      return 'Parsing Error'
    }
  }
  return []; // Return empty array if nothing is in localStorage
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}


export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  
  return product
}

export function renderHeaderFooter(){
  //something that will render our header and footer from svelte 
  const header = mount(MainHeader, {
    target: document.querySelector("#main-header"),
    props: { cartCount: getCartCount() },
  });

  const footer = mount(MainFooter, {
    target: document.querySelector('#main-footer'),
  });

  
};

export function getCartCount(){
  const count = getLocalStorage("so-cart")?.length ?? 0;
  return count;
};