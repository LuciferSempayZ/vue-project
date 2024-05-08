<script>
import { ref, onMounted } from 'vue';
import { getArticleById, updateArticle, deleteArticle } from '@/api/methods/getnews/news.js';
import { useRoute, useRouter } from 'vue-router'; // Для навигации и получения параметра маршрута

export default {
  data() {
    return {
      article: {}, // Переменная для хранения данных новости
      editMode: false, // Флаг режима редактирования
      newArticle: {
        title: '', // Переменные для новой новости
        description: '',
      },
    };
  },
  async created() {
    const route = useRoute(); // Получаем параметры маршрута
    const router = useRouter(); // Для перенаправления после удаления
    try {
      const id = route.params.id;
      this.article = await getArticleById(id); // Получаем новость по ID
    } catch (error) {
      console.error("Ошибка при загрузке новости:", error);
    }
  },
  methods: {
    // Функция удаления новости
    async removeArticle() {
      try {
        await deleteArticle(this.article.id); // Удаление новости по ID
        this.$router.push('/news'); // Перенаправление на страницу новостей после удаления
      } catch (error) {
        console.error("Ошибка при удалении новости:", error);
      }
    },
    // Функция обновления новости
    async updateArticle() {
      try {
        await updateArticle(this.article.id, {
          title: this.article.title,
          description: this.article.description,
        });
        console.log("Новость обновлена успешно!");
        this.editMode = false; // Выход из режима редактирования после сохранения
      } catch (error) {
        console.error("Ошибка при обновлении новости:", error);
      }
    },
    // Функция добавления новой новости
    async addArticle() {
      try {
        await addArticle({
          title: this.newArticle.title,
          description: this.newArticle.description,
        });
        console.log("Новость добавлена успешно!");
        this.$router.push('/news'); // Перенаправление после добавления
      } catch (error) {
        console.error("Ошибка при добавлении новости:", error);
      }
    },
    toggleEditMode() {
      this.editMode = !this.editMode; // Включение или выключение режима редактирования
    },
  },
};
</script>

<template>
  <div class="article-container">
    <div class="article-header">
      <!-- Заголовок новости -->
      <h1>{{ article.title }}</h1>
      <p class="article-date">{{ article.date }}</p> <!-- Дата статьи -->
    </div>

    <!-- Содержание новости -->
    <div v-if="!editMode" class="article-content"> <!-- Если не в режиме редактирования -->
      <p>{{ article.description }}</p>
      <button @click="toggleEditMode" class="edit-button">Редактировать</button>
      <button @click="removeArticle" class="delete-button">Удалить</button>
    </div>

    <!-- Форма редактирования -->
    <div v-else class="edit-form"> <!-- Если в режиме редактирования -->
      <input v-model="article.title" placeholder="Изменить заголовок" />
      <textarea v-model="article.description" placeholder="Изменить описание"></textarea>
      <button @click="updateArticle" class="submit-button">Сохранить</button>
    </div>
  </div>
</template>

<style scoped>
.article-container {
  max-width: 800px; /* Ограничение ширины */
  margin: 20px auto; /* Центрирование с отступом */
  padding: 2rem; /* Внутренние отступы */
  border-radius: 10px; /* Закругленные края */
  background: linear-gradient(to right, #a1a4ad, #85a8da); /* Градиент для фона */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Легкая тень */
}

.article-header {
  text-align: center; /* Центрирование текста */
  border-bottom: 1px solid #ddd; /* Разделительная линия */
  padding-bottom: 1rem; /* Отступ снизу */
  margin-bottom: 1rem; /* Отступ между элементами */
}

.article-content {
  font-size: 1.1rem; /* Размер шрифта */
  line-height: 1.6; /* Пространство между строками */
  color: #333; /* Цвет текста */
}

button {
  padding: 0.5rem 1rem; /* Внутренние отступы */
  border-radius: 5px; /* Закругление краев */
  transition: all 0.3s ease; /* Плавный переход */
}

.edit-button {
  background-color: #2196f3; /* Синий фон */
  color: white; /* Белый цвет текста */
}

.edit-button:hover {
  background-color: #1976d2; /* Более темный цвет при наведении */
}

.delete-button {
  background-color: #f44336; /* Красный фон */
  color: white; /* Белый цвет текста */
}

.delete-button:hover {
  background-color: #d32f2f; /* Темнее при наведении */
}

.edit-form {
  display: flex;
  flex-direction: column; /* Вертикальное размещение элементов */
}

input,
textarea {
  padding: 0.7rem; /* Внутренние отступы */
  border-radius: 5px; /* Закругленные края */
  border: 1px solid #ccc; /* Легкая граница */
  margin-bottom: 1rem; /* Отступ снизу */
}

.submit-button {
  background-color: #4caf50; /* Зеленый фон */
  color: white; /* Белый цвет текста */
}

.submit-button:hover {
  background-color: #388e3c; /* Более темный цвет при наведении */
}
</style>
