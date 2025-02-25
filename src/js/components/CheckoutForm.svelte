<script>
    import { get } from 'svelte/store';
    import { getLocalStorage } from '../utils.mjs'
    let tax = price * .06;
    let productNames = [];
    let price = 0      // cart subtotal
    let shipping = 0  // 10 + (number of items - 1) * 2
    let total = 0 // everything added together
    console.log('hello')
 
    
 
    function init(){
        const cartItems = getLocalStorage('so-cart');
        const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
        
 
    }
 
    function calculateItemSummary(){    
        
    }
</script>
<h2>Review & Place your Order</h2>
        <form id='orderForm'>
            <fieldset>
                <legend>Shipping</legend>
                <label>First Name <input type='text' name='fname' id='firstName'></label>
                <label>Last Name <input type='text' name ='lname' id='lastName'></label>
                <label>Street <input type='text' name ='street' id='street'></label>
                <label>City <input type='text' name ='city' id='city'></label>
                <label>State <input type='text' name ='state' id='state'></label>
                <label>Zip <input type='text' name ='zip' id='zip'></label>
            </fieldset>
            <fieldset>
                <legend>Payment</legend>
                <label>Card Number <input type='text' name ='cardNumber' id='cardNumber'></label>
                <label>Expiration <input type='text' name ='expiration' id='expiration'></label>
                <label>Security Code <input type='text' name ='code' id='securityCode'></label>
            </fieldset>
            <p id='errorMessage' class='error'></p>
        </form>
        <div class='order-summary'>
            <h3>Order Summary</h3>
            <p>Product: {productNames}</p>
            <p>Price: ${price}</p>
            <p>Tax: ${tax}</p>
            <p>Shipping: ${shipping}</p>
            <p><strong>Total: ${total}</strong></p>
        </div>
        
        <button type='button'>Place Order</button>
 
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 20px;
    }
    .container {
        max-width: 400px;
        margin: auto;
    }
    label {
        display: block;
        margin-top: 10px;
    }
    input {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
    }
    .order-summary {
        margin-top: 20px;
        padding: 10px;
        border: 1px solid #ccc;
    }
    .error {
        color: red;
        font-size: 12px;
    }
</style>
 