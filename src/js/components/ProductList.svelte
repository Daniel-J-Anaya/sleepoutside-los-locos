<script>
  import ProductSummary from "./ProductSummary.svelte";
  import { getData } from "../productData.mjs";
  import { loadAlerts } from "../alert.js";

  let { category } = $props();

  let promise = getData(category);
  loadAlerts();
</script>

<h2>Top Products {category}</h2>
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

