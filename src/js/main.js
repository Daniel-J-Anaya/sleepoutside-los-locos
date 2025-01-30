import ProductList from './components/ProductList.svelte';
import { mount } from 'svelte';

const productList = mount(ProductList, {
  target: document.querySelector('.products'),
  props: { category: 'tents' }
});
