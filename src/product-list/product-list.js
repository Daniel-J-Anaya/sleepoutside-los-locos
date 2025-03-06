import ProductList from '../js/components/ProductList.svelte';
import { mount } from 'svelte';
import { getParam, renderHeaderFooter, setupColorSelection} from '../js/utils.mjs';
 
console.log('hello')
 
renderHeaderFooter();
   
setupColorSelection();

const category = getParam('category');
const productList = mount(ProductList, {
    target: document.querySelector('.products'),
    props: { category: category},
  });
