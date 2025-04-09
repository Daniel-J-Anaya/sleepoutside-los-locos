<script>
    let query = "";
    let results = [];
    let items = ["Tent", "Backpack", "Sleeping Bag", "Flashlight", "Camping Stove"];
  
    function search() {
      results = items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    }
  </script>
  
  <style>
    .search-container {
        padding: 20px;
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 300px;
      margin: auto;
    }
    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    ul {
      list-style: none;
      padding: 0;
      margin-top: 5px;
    }
    li {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-top: 2px;
    }
  </style>
  
  <div class="search-container">
    <input type="text" bind:value={query} on:input={search} placeholder="Search..." />
    <ul>
      {#each results as result}
        <li>{result}</li>
      {/each}
    </ul>
  </div>
  