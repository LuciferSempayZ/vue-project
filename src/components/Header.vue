<script setup>

import {RouterLink} from "vue-router";
import {ref, watch} from "vue";
// Метод для переключения темы
const theme = ref('light'); // По умолчанию светлая тема
const toggleTheme = () => {
  document.documentElement.setAttribute('data-theme', theme.value);
};
// При первой загрузке страницы устанавливаем тему из локального хранилища или по умолчанию
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  theme.value = storedTheme;
  toggleTheme();
}
// Отслеживаем изменения темы и сохраняем ее в локальном хранилище
watch(theme, (newTheme) => {
  localStorage.setItem('theme', newTheme);
});



</script>

<template>
  <header>
    <div class="wrapper">
      <nav><img alt="Logo" class="logo" src="@/assets/mainlogo.png" width="150" height="150" />
        <select class="form-select theme-switcher" id="theme-select" v-model="theme" @change="toggleTheme">
        <option value="light">Светлая</option>
        <option value="dark">Темная</option>
      </select>
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/#about">О нас</RouterLink>
        <RouterLink to="/#category">Категории</RouterLink>
        <RouterLink to="/#pizza-block">Продукты</RouterLink>
        <RouterLink to="/#gallery">Галерея</RouterLink>
<!--        <RouterLink to="/basket">Корзина</RouterLink>-->
        <RouterLink to="/profile">Профиль</RouterLink>
        <div class="auth-buttons">
          <RouterLink to="/Authorization"><button class="auth-button login-button">Войти</button></RouterLink>
          <RouterLink to="/Registration"><button class="auth-button register-button">Регистрация</button></RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.logo {
  height: 50px;               /* Высота логотипа */
  width: auto;                /* Ширина логотипа автоматически */
  margin-right: 1rem;
}

nav {
  position: fixed; /* Фиксированное положение в верхней части страницы */
  top: 0;          /* Расположен в самом верху */
  left: 0;         /* Начинается с левого края */
  width: 100%;     /* Занимает всю ширину */
  font-size: 17px;
  text-align: center;
  margin-top: 0;   /* Убираем дополнительный отступ сверху */
  padding: 1rem 0; /* Добавим немного отступа сверху и снизу для комфортного вида */
  background-color: black; /* Добавляем фон для читаемости */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Добавляем небольшой теневой эффект */
  z-index: 1000; /* Устанавливаем z-index для обеспечения видимости поверх других элементов */
  display: flex;
  justify-content: center; /* Центрируем элементы */
  gap: 1rem; /* Добавим промежуток между ссылками */
}

nav a.router-link-exact-active {
  color: yellow;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

header {
  padding-bottom: 60px;
}
.auth-buttons {
  display: flex;
  gap: 1rem; /* Промежуток между кнопками */
}

.auth-button {
  padding: 0.5rem 1rem; /* Внутренние отступы */
  border: 2px solid #8a7c35; /* Синяя рамка */
  border-radius: 5px; /* Округление краев */
  background-color: transparent; /* Прозрачный фон */
  color: yellowgreen; /* Синий цвет текста */
  cursor: pointer; /* Указатель мыши */
  transition: all 0.3s ease; /* Плавный переход при наведении */
}

.auth-button:hover {
  background-color: #8f8f53; /* Синий фон при наведении */
  color: white; /* Белый цвет текста при наведении */
}

.login-button {
}

.register-button {
}
</style>