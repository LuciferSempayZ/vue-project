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
  <div>
    <h1>Категории продуктов</h1>
    <ul>
        <!-- Ссылки на продукты по категориям -->
        <li v-for="category in categories" :key="category.id">
          <RouterLink :to="`/category/${category.id}`">{{ category.name }}</RouterLink> <!-- Ссылка на продукты по категории -->
        </li>
    </ul>
  </div>
</template>
