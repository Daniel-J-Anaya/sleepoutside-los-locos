import {renderHeaderFooter}  from './utils.mjs';
import CheckoutForm from './components/CheckoutForm.svelte'
import { mount } from 'svelte';

function renderForm(){
    const form = mount(CheckoutForm, {
        target: document.querySelector('.checkout-form')
    });
}



renderHeaderFooter();

renderForm();
