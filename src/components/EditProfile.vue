<template>
  <div class="edit-profile-page"> <!-- Центрирование страницы -->
    <h1 class="text-center">Изменение профиля</h1>
    <div class="profile-form-container">
      <form @submit.prevent="handleUpdateProfile"> <!-- Предотвращаем перезагрузку страницы -->
        <div class="form-group"> <!-- Группа полей ввода -->
          <label for="name" class="form-label">Имя</label>
          <input
              type="text"
              id="name"
              class="form-control"
              v-model="formData.name"
              placeholder="Введите ваше имя"
          />
        </div>

        <div class="form-group">
          <label for="surname" class="form-label">Фамилия</label>
          <input
              type="text"
              id="surname"
              class="form-control"
              v-model="formData.surname"
              placeholder="Введите вашу фамилию"
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Пароль</label>
          <input
              type="password"
              id="password"
              class="form-control"
              v-model="formData.password"
              placeholder="Оставьте пустым, если не хотите изменять пароль"
          />
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Электронная почта</label>
          <input
              type="email"
              id="email"
              class="form-control"
              v-model="formData.email"
              placeholder="Введите ваш email"
          />
        </div>

        <div class="form-group">
          <label for="phone" class="form-label">Телефон</label>
          <input
              type="text"
              id="phone"
              class="form-control"
              v-model="formData.phone"
              placeholder="Введите ваш номер телефона"
          />
        </div>

        <button type="submit" class="btn btn-primary">Сохранить изменения</button> <!-- Кнопка сохранения -->
        <BackButton /> <!-- Используем компонент "Назад" -->
      </form>
    </div>
  </div>
</template>

<script>
import {updateProfile } from "@/api/methods/auth/updateProfile.js";
import BackButton from "@/components/BackButton.vue"; // Импортируем компонент "Назад"
import {getProfile} from "@/api/methods/auth/profile.js";

export default {
  components: {BackButton},
  data() {
    return {
      formData: {
        name: '',
        surname: '',
        password: '',
        email: '',
        phone: '',
      },
      initialProfile: null,
    };
  },
  async created() {
    try {
      const response = await getProfile(); // Загрузка изначальных данных
      this.initialProfile = response.data;

      this.formData = {
        name: this.initialProfile.name,
        surname: this.initialProfile.surname,
        password: '', // Оставляем пустым, если не изменяем
        email: this.initialProfile.email,
        phone: this.initialProfile.phone,
      };
    } catch (error) {
      console.error("Ошибка при загрузке профиля:", error); // Обработка ошибок
    }
  },
  methods: {
    async handleUpdateProfile() { // Обновление профиля
      try {
        const updatedFields = {};

        for (const key in this.formData) {
          if (this.formData[key] !== this.initialProfile[key]) { // Если есть изменения
            updatedFields[key] = this.formData[key];
          }
        }
        if (Object.keys(updatedFields).length > 0) { // Если есть что обновлять
          const response = await updateProfile(updatedFields);
          console.log("Профиль обновлен:", response);
          // Дополнительная обработка успешного сохранения
        } else {
          console.log("Нет изменений для сохранения."); // Если изменений нет
        }
      } catch (error) {
        console.error("Ошибка при обновлении профиля:", error); // Обработка ошибок
      }
    },
  },
};
</script>

<style scoped>
.edit-profile-page {
  text-align: center; /* Центрируем текст */
  padding-top: 2rem; /* Отступ сверху */
}

.profile-form-container {
  max-width: 600px; /* Максимальная ширина контейнера */
  margin: 0 auto; /* Центрирование */
  background: #7c7373; /* Цвет фона */
  padding: 2rem; /* Внутренние отступы */
  border-radius: 10px; /* Закругленные края */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Легкая тень */
}

.form-group {
  margin-bottom: 1rem; /* Отступ между группами */
}

.form-label {
  font-weight: bold; /* Жирные метки */
  padding-right: 20px;
}

.form-control {
  border-radius: 5px; /* Закругленные края */
  padding: 0.5rem; /* Внутренние отступы */
  border: 1px solid #ddd; /* Легкая граница */
}

.btn-primary {
  background: linear-gradient(to right, #4caf50, #81c784); /* Градиент для кнопки */
  border-radius: 5px; /* Закругленные края */
  color: white; /* Белый текст */
}

.btn-primary:hover {
  background-color: #66bb6a; /* Темный зеленый при наведении */
}
</style>
