<script>
import { ref } from 'vue';
import { getProducts, getProductPhotos } from '@/api/methods/categoryProducts/GetCategoryAndProducts.js';

export default {
  data() {
    return {
      products: [],
      photos: [],
      currentSlide: 0, // Индекс текущего слайда
    };
  },
  async created() {
    this.products = await getProducts();
    this.photos = await getProductPhotos();
  },
  methods: {
    getProductPhoto(photoId) {
      const photo = this.photos.find(photo => photo.id === photoId);
      return photo ? 'http://strekolovskii-av.tepk-it.ru/public/storage/' + photo.path : '/path/to/default/image.jpg';
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.products.length; // Переход к следующему слайду
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.products.length) % this.products.length; // Переход к предыдущему слайду
    },
  },
};
</script>

<template>
  <div class="slider">
    <h1>Продукты</h1>
    <div class="slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div v-for="product in products" :key="product.id" class="slide">
        <img :src="getProductPhoto(product.photo_id)" alt="" class="product-image">
        <div class="review-pizza">
          <h3>{{ product.name }}</h3>
          <p>Цена: {{ product.price }}</p>
          <blockquote><p>{{ product.description }}</p></blockquote>
        </div>
      </div>
    </div>
    <!-- Кнопки перехода -->
    <button @click="prevSlide" class="slider-button prev">‹</button>
    <button @click="nextSlide" class="slider-button next">›</button>
  </div>
</template>

<style scoped>
.slider {
  position: relative;
  overflow: hidden;
  width: 100%; /* Слайдер занимает всю ширину */
  height: 300px; /* Высота слайдера */
  padding-bottom: 250px;
}
.slides {
  display: flex;
  transition: transform 0.5s ease-in-out; /* Плавный переход */
}

.slide {
  display: flex; /* Используем Flexbox */
  flex-direction: column; /* Расположение элементов вертикально */
  align-items: center; /* Центрирование по горизонтали */
  justify-content: center; /* Центрирование по вертикали */
  min-width: 100%; /* Каждый слайд занимает 100% ширины */
  text-align: center;
}

.product-image {
  width: 300px;
  height: 210px;
}

.review-pizza {
  background: rgba(255, 255, 255, 0.52);
  padding: 1rem; /* Внутренний отступ */
  border-radius: 8px; /* Закругление краев */
  width: 300px; /* Ширина блока */
}
blockquote {
  font-style: italic;
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
</style>
