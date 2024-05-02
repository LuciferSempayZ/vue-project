<script>
import { ref, onMounted } from 'vue';
import { getProductsByCategory } from '@/api/methods/categoryProducts/products.js'; // Импорт метода для загрузки продуктов по категории

export default {
  data() {
    return {
      products: ref([]), // Реактивный массив для хранения продуктов
    };
  },
  async created() {
    try {
      const categoryId = this.$route.params.categoryId; // Получаем ID категории из URL
      this.products.value = await getProductsByCategory(categoryId); // Загружаем продукты по категории
    } catch (error) {
      console.error("Ошибка при загрузке продуктов по категории:", error); // Обработка ошибок
    }
  },
};
</script>

<template>
  <div>
    <h1>Продукты по категории {{ this.$route.params.categoryId }}</h1>
    <!-- Отображение списка продуктов по категории -->
    <ul v-if="products.value.length > 0">
      <li v-for="product in products.value" :key="product.id">
        <h3>{{ product.name }}</h3>
        <p>Цена: {{ product.price }}</p>
        <p>{{ product.description }}</p>
      </li>
    </ul>
    <div v-else>Нет продуктов по этой категории.</div> <!-- Если нет продуктов -->
  </div>
</template>
