<script>
    // import { get } from 'svelte/store';
    import { getLocalStorage, formDataToJSON, alertMessage} from '../utils.mjs'
    import { checkout } from '../externalServices.mjs'
    
    let list = [];
    let shipping = 0
    let subtotal = 0
    let tax = 0
    let total = 0 


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

    const packageItems = function (items) {
    const simplifiedItems = items.map((item) => {
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
  };

    const handleSubmit = async function (e) {
        
        const json = formDataToJSON(this);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = total;
        json.tax = tax;
        json.shipping = shipping;
        json.items = packageItems(list);
        try {
            const res = await checkout(json);
            window.location.href='./success.html'
            
        } catch (err) {
            alertMessage(err.message)
            console.log(err);
            // alert('Information Error, please enter correct information.')
        }
    };
    
    init();
</script>

<h2>Review & Place your Order</h2>
        <form id='orderForm' on:submit|preventDefault={handleSubmit}>
            <fieldset>
                <legend>Shipping</legend>
                <label>First Name <input type='text' name='fname' id='firstName'required ></label>
                <label>Last Name <input type='text' name ='lname' id='lastName'required ></label>
                <label>Street <input type='text' name ='street' id='street'required ></label>
                <label>City <input type='text' name ='city' id='city'required ></label>
                <label>State <input type='text' name ='state' id='state'required ></label>
                <label>Zip <input type='text' name ='zip' id='zip'required ></label>
            </fieldset>
            <br>
            <fieldset>
                <legend>Payment</legend>
                <label>Card Number <input type='number' name='cardNumber' id='cardNumber' required minlength="16"></label>
                <label>Expiration Date <input type='text' name ='expiration' id='expiration'required ></label>
                <label>Security Code <input type='number' name ='code' id='securityCode'required ></label>-
            </fieldset>
            <p id='errorMessage' class='error'></p>
            <fieldset>
                <legend>Order Summary</legend>
                <ul>
                    <li>
                      <label for="cartTotal">Item Subtotal({list.length})</label>
                      <p name="cartTotal" id="cartTotal">${subtotal}</p>
                    </li>
                    <li>
                      <label for="shipping">Shipping Estimate</label>
                      <p id="shipping">${shipping}</p>
                    </li>
                    <li>
                      <label for="tax">Tax</label>
                      <p id="tax">${tax}</p>
                    </li>
                    <li>
                      <label for="orderTotal"><b>Order Total</b></label>
                      <p id="orderTotal">${total}</p>
                    </li>
                  </ul>
            </fieldset>
            <br>
            <button type='submit'>Place Order</button>
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
    li {
        text-decoration: none;
        list-style-type: none;
    }
    .error {
        color: red;
        font-size: 12px;
    }
</style>
 