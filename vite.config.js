import { resolve } from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  root: 'src/',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        product: resolve(__dirname, 'src/product_pages/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        success: resolve(__dirname, 'src/checkout/success.html'),
        orders: resolve(__dirname, 'src/orders/index.html'),
        login: resolve(__dirname, 'src/login/index.html')
        
      },
    },
  },
});
