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
      <h1>{{ article.title }}</h1> <!-- Заголовок статьи -->
      <p class="article-date">{{ article.date }}</p> <!-- Дата статьи -->
    </div>

    <!-- Содержание новости -->
    <div v-if="!editMode" class="article-content"> <!-- Если не в режиме редактирования -->
      <p>{{ article.description }}</p>

      <!-- Кнопки редактирования и удаления -->
      <button @click="toggleEditMode">Редактировать</button>
      <button @click="removeArticle">Удалить</button>
    </div>

    <!-- Форма редактирования -->
    <div v-else> <!-- Если в режиме редактирования -->
      <input v-model="article.title" placeholder="Изменить заголовок" />
      <textarea v-model="article.description" placeholder="Изменить описание"></textarea>
      <button @click="updateArticle">Сохранить</button>
    </div>
  </div>

  <!-- Форма для добавления новой новости -->
  <div class="add-news">
    <h2>Добавить новую новость</h2>
    <input v-model="newArticle.title" placeholder="Заголовок новой новости" />
    <textarea v-model="newArticle.description" placeholder="Описание новой новости"></textarea>
    <button @click="addArticle">Создать</button>
  </div>
</template>

<style scoped>
.article-container {
  max-width: 800px; /* Ограничение ширины */
  margin: 20px auto; /* Центрирование с отступом */
  padding: 2rem; /* Внутренние отступы */
  border-radius: 10px; /* Закругленные края */
  background-color: #f5f5f5; /* Светлый фон */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1); /* Легкая тень */
}

.article-content {
  font-size: 1.1rem; /* Размер шрифта */
  line-height: 1.6; /* Пространство между строками */
  color: #333; /* Темный цвет текста */
}

button {
  padding: 0.5rem 1rem; /* Внутренние отступы */
  border-radius: 5px; /* Закругление краев */
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #f5f5f5; /* Светло-серый цвет при наведении */
}

.add-news {
  padding-top: 20px; /* Отступ сверху */
}

input, textarea {
  display: block;
  width: 100%; /* Ширина 100% */
  padding: 0.5rem; /* Внутренние отступы */
  border-radius: 5px; /* Закругление краев */
  border: 1px solid #ccc; /* Граница */
}
</style>
