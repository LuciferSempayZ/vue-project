<script setup>
import { ref, onMounted } from 'vue';
import { getNews} from '@/api/methods/getnews/news.js'; // Методы для получения, удаления, обновления новостей

const articles = ref([]); // Массив новостей

const loadNews = async () => {
  try {
    articles.value = await getNews(); // Загрузка новостей из API
  } catch (error) {
    console.error("Ошибка при загрузке новостей:", error); // Обработка ошибок
  }
};


onMounted(loadNews); // Загружаем новости при монтировании
</script>

<template>
  <div class="news-container">
    <h1>Новости</h1>
    <ul>
      <li v-for="article in articles" :key="article.id" class="news-item">
        <h3>{{ article.title }}</h3>
        <p>{{ article.description.substring(0, 170) }}...</p>
        <p>{{ article.date }}</p>
        <RouterLink :to="{ name: 'article', params: { id: article.id} }">Подробнее</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.news-container {
  max-width: 800px;
  margin: 0 auto; /* Центрирование */
  padding: 2rem; /* Внутренние отступы */
}

.news-item {
  border-bottom: 1px solid #ccc; /* Разделительная линия */
  padding: 1rem; /* Внутренние отступы */
}

button {
  padding: 0.5rem 1rem; /* Внутренние отступы */
  border-radius: 5px; /* Закругление краев */
  border: none; /* Убираем обводку */
  cursor: pointer; /* Указатель мыши */
  transition: all 0.3s ease; /* Плавный переход */
}

button:hover {
  background-color: #f5f5f5; /* Светло-серый фон при наведении */
}
</style>
