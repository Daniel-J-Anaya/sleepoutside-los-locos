<script>
    import {login} from "../auth.mjs"
    let {redirect = "" } = $props()

    function handleSubmit(e){
        e.preventDefault();

        const form = new FormData(e.currentTarget)

        let creds = {'email':form.get('userName'), 'password':form.get('password')}
        console.log(creds)
        // let creds = {'email':"user1@email.com", 'password':'user1'}
        
        debugger
        login(creds, redirect)

    }

</script>

<div class="divider">
    <form id="loginForm" on:submit = {handleSubmit}>
        <h2>Welcome back</h2>
        <label for="userName">
            Username:
            <input name="userName" type="email" placeholder='userName'>
        </label>
        <label for="password">
            Password:
            <input name="password" type="text" placeholder='password'>
        </label>
        <br>

        <button>Log in</button>
    </form>
</div>

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
        width: 200px;
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

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        
    }

    form {
        margin: 3%;
        padding: 2%;
        border: 1px black solid ;
        border-radius: 2%;
    }
</style>