<script setup>
import { onMounted, ref } from 'vue';
import Button from "@/components/Button.vue";
import { getProfile } from "@/api/methods/auth/profile.js";
import router from "@/router/index.js";

// Переменная для хранения данных профиля
const userProfile = ref(null);
// Функция для загрузки данных профиля
const loadUserProfile = async () => {
  try {
    // Получение данных из API
    const data = await getProfile();
    console.log("Полученные данные:", data); // Проверяем, что данные корректны
    userProfile.value = data; // Сохраняем данные
  } catch (error) {
    console.error("Ошибка при загрузке профиля:", error); // Обработка ошибок
  }
};

// Функция для выхода из профиля
const logout = () => {
  // Присваиваем токену пустое значение
  localStorage.setItem('token', '');

  // Перенаправляем на страницу авторизации
  router.push('/authorization');
};
// Переход на страницу изменения профиля
const goToEditProfile = () => {
  router.push('/edit-profile'); // Перенаправляем на страницу редактирования профиля
};

// Загружаем данные профиля при монтировании компонен
onMounted(() => {
  loadUserProfile(); // Загружаем данные при монтировании
});

</script>
<template>
  <div class="profile-container">
    <h2>Профиль пользователя</h2>
    <!-- Проверка, что данные загружены -->
    <div v-if="userProfile">
      <p><strong>Фамилия:</strong> {{ userProfile.data.surname }}</p>
      <p><strong>Имя:</strong> {{ userProfile.data.name }}</p>
      <p><strong>Электронная почта:</strong> {{ userProfile.data.email }}</p>
      <p><strong>Телефон:</strong> {{ userProfile.data.phone }}</p>
    </div>
    <!-- Если данные еще не загружены -->
    <div v-else>
      <p>Загрузка данных...</p>
    </div>
    <div class="buttons-class">
    <button @click="goToEditProfile" class="edit-button">Изменить профиль</button> <!-- Кнопка редактирования -->
    <button @click="logout" class="logout-button">Выйти</button>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  max-width: 500px;
  margin: 0 auto; /* Центрирование контейнера */
  padding: 2rem; /* Внутренние отступы */
  border-radius: 10px; /* Закругленные края */
  background-color: #7c7373; /* Цвет фона */
}
.buttons-class {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 50%;
  padding-left: 100px;
}
.edit-button {
  margin-top: 1rem; /* Отступ сверху */
  padding: 0.5rem 1rem; /* Внутренние отступы */
  border: none;
  border-radius: 5px;
  background-color: #13ce31; /* Красный фон */
  color: white;
  cursor: pointer; /* Указатель мыши */
  transition: all 0.3s ease; /* Плавный переход */
}

.edit-button:hover {
  background-color: #66bb6a; /* Темнее при наведении */
}
.profile-container p {
  color: white;
}
.logout-button {
  margin-top: 1rem; /* Отступ сверху */
  padding: 0.5rem 1rem; /* Внутренние отступы */
  border: none;
  border-radius: 5px;
  background-color: #ff4d4f; /* Красный фон */
  color: white;
  cursor: pointer; /* Указатель мыши */
  transition: all 0.3s ease; /* Плавный переход */
}

.logout-button:hover {
  background-color: #ff1a1a; /* Темнее при наведении */
}
</style>