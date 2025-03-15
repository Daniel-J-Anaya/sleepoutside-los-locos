import { renderHeaderFooter, getParam } from './utils.mjs';
import  LoginForm  from './components/LoginForm.svelte';
import {mount} from 'svelte';

let redirect = getParam('redirect');


function renderLogin(){
    const form = mount(LoginForm, {
        target: document.querySelector('#login'),
        props: {redirect: redirect}
    });
}

function init(){
    renderHeaderFooter()
    renderLogin()
    console.log('login.js');
};

init();
