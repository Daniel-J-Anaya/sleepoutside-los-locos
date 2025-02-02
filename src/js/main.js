import ProductList from './components/ProductList.svelte';
import { mount } from 'svelte';
import { loadAlerts } from './alert.js';

const productList = mount(ProductList, {
  target: document.querySelector('.products'),
  props: { category: 'tents' }
});
