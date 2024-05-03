<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getProductsByCategory } from '@/api/methods/categoryProducts/products.js'; // Метод для загрузки продуктов по категории
import { URL_PHOTO} from "@/config/index.js";
import {getProductPhotos, getProducts} from "@/api/methods/categoryProducts/GetCategoryAndProducts.js";
const route = useRoute();
const categoryId = ref(route.params.id); // Получаем идентификатор категории из параметров маршрута
const products = ref([]);

onMounted(async () => {
  try {
    products.value = await getProductsByCategory(categoryId.value); // Загружаем товары по идентификатору категории
  } catch (error) {
    console.error('Ошибка при загрузке товаров', error);
  }
});
const getPhotoURL = (photo) => {
  return URL_PHOTO + photo;
};
</script>

<template>
  <div class="category-list">
    <h1>Продукты в категории {{ categoryId }}</h1>

    <div class="product-grid">
      <!-- Создаем карточку для каждого продукта -->
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="getPhotoURL(product.photo)" alt="product.name" class="product-image" /> <!-- Изображение продукта -->
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p class="product-price">{{ product.price }} ₽</p> <!-- Цена продукта -->
        <!-- Добавляем кнопку для добавления в корзину -->
        <button @click="addToCart(product)" class="add-to-cart-button">Добавить в корзину</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-list {
  padding: 20px;
}

.product-grid {
  display: grid; /* Используем грид для расположения элементов */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Определяем колонки в гриде */
  gap: 20px; /* Промежуток между элементами */
}

.product-card {
  border: 1px solid #ddd; /* Обрамление для каждой карточки */
  padding: 20px; /* Отступ внутри карточки */
  text-align: center; /* Центрируем текст */
  transition: box-shadow 0.3s ease; /* Анимация при наведении */
}

.product-card:hover {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Тень при наведении */
}

.product-image {
  max-width: 100%; /* Ограничиваем ширину изображения */
  height: auto; /* Сохраняем соотношение сторон */
}

.product-price {
  font-weight: bold; /* Жирный шрифт для цены */
  color: #e63946; /* Цвет для цены */
}

.add-to-cart-button {
  background-color: #457b9d; /* Синий цвет кнопки */
  color: white; /* Белый цвет текста */
  border: none; /* Убираем обрамление */
  padding: 10px 20px; /* Отступы в кнопке */
  cursor: pointer; /* Указатель при наведении */
}

.add-to-cart-button:hover {
  background-color: #1d3557; /* Темно-синий при наведении */
}
</style>
