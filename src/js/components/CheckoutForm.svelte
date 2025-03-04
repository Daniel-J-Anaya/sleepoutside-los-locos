<script>
    import { get } from 'svelte/store';
    import { getLocalStorage } from '../utils.mjs'
    let list = [];
    let shipping = 0
    let subtotal = 0
    let tax = 0
    let total = 0 
    console.log('hello')
 
    
 
    function init(){
        list = getLocalStorage('so-cart');
        setTimeout(()=>{
            document.querySelector('#zip').addEventListener('input',calculateItemSummary)}
            ,1000)

    };
 
    function calculateItemSummary(){  
        subtotal = list.reduce((sum, item) => sum + item.FinalPrice, 0);
        shipping = 10 + (list.length - 1) * 2 
        tax = subtotal * .06;
        total = (subtotal + shipping + tax);
        // round to 2 decimal places
        subtotal = subtotal.toFixed(2);
        tax = tax.toFixed(2);
        total = total.toFixed(2);

    };
    
    init();
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
            <br>
            <fieldset>
                <legend>Payment</legend>
                <label>Card Number <input type='text' name ='cardNumber' id='cardNumber'></label>
                <label>Expiration <input type='text' name ='expiration' id='expiration'></label>
                <label>Security Code <input type='text' name ='code' id='securityCode'></label>
            </fieldset>
            <p id='errorMessage' class='error'></p>
            <fieldset>
                <legend>Order Summary</legend>
                    <p>Subtotal({list.length}): ${subtotal}</p>
                    <p>Tax: ${tax}</p>
                    <p>Shipping: ${shipping}</p>
                    <p><strong>Total: ${total}</strong></p>
            </fieldset>
            <br>
            <button type='button'>Place Order</button>
            <br>
        </form>
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
 