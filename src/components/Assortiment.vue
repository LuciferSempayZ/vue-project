<script>
import { ref } from 'vue';
import { getProducts, getProductPhotos } from '@/api/methods/categoryProducts/GetCategoryAndProducts.js';
import { URL_PHOTO} from "@/config/index.js";
import { addToCartBackend} from "@/stores/cart.js"; // Функция для добавления в корзину через backend

export const cart = ref([]); // Инициализация корзины как пустого массива

export default {
  data() {
    return {
      products: [],
      photos: [],
      currentSlide: 0,
    };
  },
  async created() {
    this.products = await getProducts();
    this.photos = await getProductPhotos();
  },
  methods: {
    async addToCart(productId) {
      try {
        const result = await addToCartBackend(productId, 1);
        console.log("Добавлено в корзину:", result);
      } catch (error) {
        console.error("Ошибка при добавлении в корзину:", error);
      }
    },
    URL_PHOTO() {
      return URL_PHOTO;
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.products.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.products.length) % this.products.length;
    },
  },
};


</script>

<template>
  <div class="slider">
    <h1>Продукты</h1>
    <div class="slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div v-for="product in products" :key="product.id" class="slide">
        <!-- Лейблы "Новый" или "Хит продаж" -->
        <div class="product-labels">
          <span v-if="product.new === 1" class="product-label new">Новинка</span>
          <span v-if="product.bestseller === 1" class="product-label bestseller">Хит продаж</span>
        </div>
        <img :src="URL_PHOTO() + product.photo" alt="Фото продукта" class="product-image">
        <div class="review-pizza">
          <h3>{{ product.name }}</h3>
          <p>Цена: {{ product.price }} ₽</p>
          <blockquote>{{ product.description }}</blockquote>
          <!-- Используем метод добавления в корзину -->
          <button @click="addToCart(product.id)">Добавить в корзину</button>
        </div>
      </div>
    </div>
    <!-- Кнопки для перехода между слайдами -->
    <button @click="prevSlide" class="slider-button prev">‹</button>
    <button @click="nextSlide" class="slider-button next">›</button>
  </div>
</template>


<style scoped>
.slider {
  position: relative;
  overflow: hidden;
  width: 100%; /* Слайдер занимает всю ширину */
  padding: 2rem 0; /* Внутренние отступы */
}
.slides {
  display: flex;
  transition: transform 0.7s ease-in-out; /* Плавный переход */
}

.slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100%;
}

.product-image {
  width: 300px;
  height: 210px;
}


.review-pizza {
  background: rgba(255, 255, 255, 0.52);
  padding: 1rem;
  border-radius: 8px;
  width: 300px;
}
blockquote {
  font-style: italic;
}
.new {
  border: 2px solid red;
  width: 100px;
}
.product-labels {
  display: flex;
  gap: 0.5rem;
}
.product-label {
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-size: 0.8rem;
  color: white;
}
.bestseller {
  border: 2px solid orange;
  width: 100px;
}
.slider-button {
  position: absolute;
  top: 50%; /* Центрируем по вертикали */
  transform: translateY(-50%);
  background: transparent; /* Прозрачный фон */
  border: 2px solid #756a6a; /* Обводка для видимости */
  border-radius: 10px; /* Закругление краев */
  cursor: pointer;
  font-size: 2rem; /* Размер шрифта */
  color: #7c6d6d;
  opacity: 0.7; /* Полупрозрачность при наведении */
  transition: all 0.3s ease;
}

.slider-button:hover {
  opacity: 1; /* Полная непрозрачность при наведении */
}

.slider-button.prev {
  left: 33%; /* Расположить ближе к центру */
}

.slider-button.next {
  right: 33%; /* Расположить ближе к центру */
}

button {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #0056b3; /* Темнее при наведении */
}
</style>
