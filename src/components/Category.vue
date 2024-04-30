<script>
import { ref, onMounted } from 'vue';
import { getCategories} from  '@/api/methods/categoryProducts/GetCategories.js'
export default {
  data() {
    return {
      categories: [], // Реактивный массив категорий
      loading: false, // Флаг загрузки
    };
  },
  async created() {
    this.loading = true; // Устанавливаем флаг загрузки

    try {
      console.log("Fetching categories..."); // Лог для проверки загрузки
      this.categories = await getCategories(); // Загружаем категории
      console.log("Fetched categories:", this.categories); // Лог для проверки данных
    } catch (error) {
      console.error("Failed to fetch categories:", error); // Обработка ошибки
    }

    this.loading = false; // Снимаем флаг загрузки
  },
};
</script>

<template>
  <div class="category-page">
    <h1>Категории продуктов</h1>
    <div v-if="loading">Загрузка...</div> <!-- Показываем, если идет загрузка -->

    <!-- Отображаем список категорий, если он не пуст -->
    <ul v-if="categories.length > 0">
      <li v-for="category in categories" :key="category.id" class="category-item">
        <h3>{{ category.name }}</h3> <!-- Имя категории -->
      </li>
    </ul>

    <!-- Сообщение, если категории не найдены -->
    <div v-else>
      <p>Категории не найдены.</p>
    </div>
  </div>
</template>

<style scoped>
.category-page {
  padding: 2rem; /* Внутренние отступы */
}

.category-item {
  padding: 0.5rem; /* Внутренние отступы внутри элемента */
  border-bottom: 1px solid #ccc; /* Разделительная линия */
}

h1 {
  text-align: center; /* Центрируем заголовок */
}
</style>
