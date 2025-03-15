<script>
  let { product } = $props();
</script>

<section>
  <a href="../product_pages/index.html?product={product.Id}">
      <img src={product.Images.PrimarySmall} 
          alt="Image of {product.Name}" />
      <h3 class="card__brand">{product.Brand.Name}</h3>
      <h2 class="card__name">{product.NameWithoutBrand}</h2>
      <p class="product-card__price">${product.FinalPrice}</p>
  </a>

  {#if product.Colors && product.Colors.length > 1}
      <div class="color-buttons">
          {#each product.Colors as color}
              <button class="color-button" 
              title="{color.ColorName}" 
              style="background-image: url({color.ColorChipImageSrc});" 
              aria-label="{color.ColorName}">
              </button>
          {/each}
      </div>
  {/if}
</section>

<style>
</style>
