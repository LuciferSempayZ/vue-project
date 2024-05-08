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
    <ul class="news-list">
      <li v-for="article in articles" :key="article.id" class="news-item">
        <h3>{{ article.title }}</h3>
        <p>{{ article.description.substring(0, 170) }}...</p>
        <p>{{ article.date }}</p>
        <RouterLink :to="{ name: 'article', params: { id: article.id } }" class="details-link">Подробнее</RouterLink>
      </li>
    </ul>

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
  background: linear-gradient(to right, #7b7e85, #6a8ab0);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.news-list {
  list-style: none;
  padding: 0;
}

.news-item {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.news-item h3 {
  color: #333;
}

.details-link {
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background: linear-gradient(to right, #2196F3, #21CBF3); /* Градиент для кнопки */
  color: white;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Тень для эффекта */
  transition: all 0.3s ease;
}

.details-link:hover {
  background-color: #1976D2; /* Темнее при наведении */
  text-decoration: underline; /* Подчеркивание при наведении */
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
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.submit-button {
  padding: 0.7rem 1.2rem;
  border-radius: 5px;
  background: linear-gradient(to right, #4caf50, #81c784);
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #66bb6a;
}
</style>