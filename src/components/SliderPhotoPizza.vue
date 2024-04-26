<script setup>
import { onMounted } from 'vue';

let slideIndex = 0;

// Функция для обновления отображения слайдера
function updateSlider(slides, slideIndex) {
  slides.forEach((slide, index) => {
    slide.style.display = index === slideIndex ? 'block' : 'none';
  });
}

// Функция для показа предыдущего слайда
function showPreviousSlide(slides) {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  updateSlider(slides, slideIndex);
}

// Функция для показа следующего слайда
function showNextSlide(slides) {
  slideIndex = (slideIndex + 1) % slides.length;
  updateSlider(slides, slideIndex);
}

onMounted(() => {
  // Получаем элементы слайдера
  const slider = document.querySelector('.slider');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const slides = Array.from(slider.querySelectorAll('img'));

  prevButton.addEventListener('click', () => showPreviousSlide(slides));
  nextButton.addEventListener('click', () => showNextSlide(slides));

  // Инициализация слайдера
  updateSlider(slides, slideIndex);
});
</script>

<template>
  <div id="gallery" class="title-photo"> Галерея </div>
  <div class="slider-container">
    <div class="slider">
      <img src="@/assets/backback.jpg" alt="Пицца">
      <img src="@/assets/whiteback.jpg" alt="Пицца">
      <img src="@/assets/backback.jpg" alt="Пицца">
      <img src="@/assets/whiteback.jpg" alt="Пицца">
      <img src="@/assets/backback.jpg" alt="Пицца">
      <img src="@/assets/whiteback.jpg" alt="Пицца">
    </div>
    <button class="prev-button" aria-label="Посмотреть предыдущий слайд">&lt;</button>
    <button class="next-button" aria-label="Посмотреть следующий слайд">&gt</button>
  </div>
</template>

<style scoped>
.title-photo {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  padding: 5px;
}

.slider-container {
  position: relative;
  width: 600px;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
}

.slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slider img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.prev-button,
.next-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон */
  color: white; /* Белый цвет текста */
  border: none; /* Без рамки */
  border-radius: 50%; /* Закругленные края */
  width: 40px; /* Ширина кнопки */
  height: 40px; /* Высота кнопки */
  font-size: 24px; /* Размер текста */
  display: flex; /* Центрирование содержимого */
  align-items: center;
  justify-content: center;
  cursor: pointer; /* Указатель при наведении */
  transition: background-color 0.3s; /* Плавный переход фона */
}

.prev-button {
  left: 10px;
}

.prev-button:hover,
.next-button:hover {
  background: rgba(0, 0, 0, 0.7); /* Более темный фон при наведении */
}
.next-button {
  right: 10px;
}
</style>