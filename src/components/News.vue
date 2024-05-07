<script setup>
import { ref, onMounted } from 'vue';
import {addArticle, getNews} from '@/api/methods/getnews/news.js'; // Методы для получения, удаления, обновления новостей

const articles = ref([]); // Массив новостей
const newArticle = ref({ title: '', description: '' });
const loadNews = async () => {
  try {
    articles.value = await getNews(); // Загрузка новостей из API
  } catch (error) {
    console.error("Ошибка при загрузке новостей:", error); // Обработка ошибок
  }
};
const addNews = async () => {
  try {
    await addArticle(newArticle.value); // Отправка новой статьи на сервер
    newArticle.value = { title: '', description: '' }; // Очистка формы после добавления
    await loadNews(); // Перезагрузка списка новостей
  } catch (error) {
    console.error("Ошибка при добавлении новости:", error); // Обработка ошибок
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
    <!-- Форма для добавления новой новости -->
    <!-- Форма для добавления новой новости -->
    <div class="add-article">
      <h2>Добавить новость</h2>
      <form @submit.prevent="addNews" class="add-article-form">
        <div class="form-group">
          <label for="title">Заголовок:</label>
          <input
              id="title"
              v-model="newArticle.title"
              placeholder="Введите заголовок новости"
              required
          />
        </div>
        <div class="form-group">
          <label for="description">Описание:</label>
          <textarea
              id="description"
              v-model="newArticle.description"
              placeholder="Введите описание новости"
              required
          ></textarea>
        </div>
        <button type="submit" class="submit-button">Добавить новость</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.news-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.news-item {
  border-bottom: 1px solid #ccc;
  padding: 1rem;
}

.add-article {
  margin-top: 2rem;
}

.add-article-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: #99a5ad;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover {
  background-color: #59c254;
}
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
