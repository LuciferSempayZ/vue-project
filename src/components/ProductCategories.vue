<script setup>
import {onMounted, ref} from 'vue';
import { getCategory } from '@/api/methods/categoryProducts/GetCategory.js'; // Метод для загрузки категорий

const categories = ref([]);
onMounted(async () => {
  try {
    categories.value = await getCategory();
  } catch (error) {
    console.error('Ошибка при загрузке категорий', error); // Обработка ошибок
  }
});
</script>

<template>
  <div class="category-container">
    <h1>Категории продуктов</h1>
    <ul class="category-list">
        <!-- Ссылки на продукты по категориям -->
        <li v-for="category in categories" :key="category.id" class="category-item">
          <RouterLink :to="`/category/${category.id}`" class="category-link">{{ category.name }}</RouterLink> <!-- Ссылка на продукты по категории -->
        </li>
    </ul>
  </div>
</template>

<style scoped>
.category-container {
  max-width: 800px; /* Максимальная ширина */
  margin: 0 auto; /* Центрирование контейнера */
  padding: 2rem; /* Внутренние отступы */
  background-color: #b4a7a7; /* Светлый фон */
  border-radius: 10px; /* Закругленные края */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Легкая тень */
}
.category-container h1 {
  color: gray;
}
.category-list {
  list-style: none; /* Убираем маркеры списка */
  padding: 0; /* Убираем отступы */
}

.category-item {
  margin-bottom: 1rem; /* Отступ между элементами списка */
}

.category-link {
  text-decoration: none; /* Убираем подчеркивание */
  color: #333; /* Цвет текста */
  font-weight: bold; /* Жирный текст */
  padding: 0.5rem 1rem; /* Внутренние отступы */
  border-radius: 5px; /* Закругленные края */
  transition: all 0.3s ease; /* Плавный переход */
}

.category-link:hover {
  background-color: #e0e0e0; /* Светло-серый фон при наведении */
  color: #000; /* Более темный цвет текста при наведении */
}
</style>