<script>
import { ref, onMounted } from 'vue';
import { GetCategoryAndProducts } from '@/api/methods/categoryProducts/GetCategoryAndProducts.js'; // Метод для загрузки продуктов по категории

export default {
  data() {
    return {
      products: [],
    };
  },
  async created() {
    const categoryId = this.$route.params.categoryId; // Получаем ID категории из URL
    this.products = await GetCategoryAndProducts(categoryId); // Загружаем продукты по категории
  },
};
</script>

<template>
  <div>
    <h1>Продукты категории {{ this.$route.params.categoryId }}</h1>
    <ul>
      <!-- Отображаем продукты этой категории -->
      <li v-for="product in products" :key="product.id">
        <h3>{{ product.name }}</h3>
        <p>Цена: {{ product.price }}</p>
        <p>{{ product.description }}</p>
      </li>
    </ul>
  </div>
</template>
