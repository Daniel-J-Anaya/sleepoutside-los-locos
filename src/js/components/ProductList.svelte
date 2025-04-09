<script>
  import ProductSummary from "./ProductSummary.svelte";
  import { getProductsByCategory } from "../externalServices.mjs";
  import SearchBar from "./SearchBar.svelte";

  let { category } = $props();

  let promise = getProductsByCategory(category);
</script>

<div><SearchBar /></div>

<h2>Top Products</h2>
{#await promise}
  <p>Loading</p>
{:then data}
  <ul class="product-list">
    {#each data as product}
      {#if product.Id != "880RT" && product.Id != "989CG"}
        <li class="product-card"><ProductSummary {product} /></li>
      {/if}
    {/each}
  </ul>
{/await}

