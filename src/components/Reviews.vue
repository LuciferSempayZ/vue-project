<script setup>
import {ref} from "vue";

const customerReviews = ref([
  { id: 1, text: 'Отличная пицца, очень вкусная!', author: 'Мария' },
  { id: 2, text: 'Лучший сервис и вкусная пицца.', author: 'Иван' },
  { id: 3, text: 'Слишком вкусно, быстро и аккуратно!', author: 'Добби' },
  { id: 4, text: 'Впервые заказывал пиццу, явно не пожалел что у вас!', author: 'Герман' },
  { id: 5, text: 'Доставка за 5 минут, и по времени готовки не обидели, рекомендую!', author: 'Стас' },
]);
</script>

<template>
  <div class="customer-reviews">
    <h2>Отзывы клиентов</h2>
    <div class="review-list">
      <div class="review-item" v-for="review in customerReviews" :key="review.id">
        <blockquote>{{ review.text }}</blockquote>
        <cite>— {{ review.author }}</cite>
      </div>
    </div>
  </div>
</template>

<style scoped>
.customer-reviews h2 {
  font-size: 1.5rem; /* Размер шрифта заголовка */
  margin-bottom: 1rem; /* Отступ снизу */
}
.review-list {
  display: flex;
  flex-direction: column; /* Расположение элементов по вертикали */
  gap: 1rem; /* Промежуток между отзывами */
  text-align: center; /* Центрирование текста внутри отзывов */
  color: #333; /* Цвет текста */
}
blockquote {
  font-style: italic; /* Наклонный стиль для цитат */
}
cite {
  font-weight: bold; /* Жирный шрифт для авторов */
}
.review-item {
  background-color: #f5f5f5; /* Светлый фон для отзыва */
  padding: 1rem; /* Внутренний отступ */
  border-radius: 8px; /* Закругление краев */
}
.customer-reviews {
  padding-bottom: 20px;
}
.customer-reviews {
  display: flex;
  flex-direction: column; /* Вертикальное размещение элементов */
  align-items: center; /* Центрирование по горизонтали */
  justify-content: center; /* Центрирование по вертикали */
  width: 100%; /* Заполнение всей ширины */
  padding: 2rem; /* Отступы вокруг элемента */
  border: 1px solid #000000;
  border-radius: 10px; /* Закругленные углы */
  background: rgba(255, 255, 255, 0.6); /* Полупрозрачный белый фон */
}
</style>