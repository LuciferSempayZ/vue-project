<script setup>
import {onMounted, reactive, ref} from 'vue';
import {getCart} from '@/stores/cart.js'; // Функции работы с корзиной
import { URL_PHOTO} from "@/config/index.js";
const cart = ref([]); // Реактивное хранилище для корзины
const cartItems = reactive({
  total: 0,
  items: []
})

const showCart = ref(false); // Флаг для отображения корзины
const toggleCart = () => {
  console.log('Корзина переключается', showCart.value);
  showCart.value = !showCart.value; // Переключаем видимость корзины
};
// Функция для получения содержимого корзины
const loadCart = async () => {
  try {
    cartItems.items = await getCart()
    console.log(cartItems.items)
  } catch (error) {
    console.error("Ошибка при загрузке корзины:", error);
  }
};

onMounted(loadCart); // Загружаем корзину при монтировании
</script>

<template>
  <div class="cart-container">
    <h1>Корзина</h1>
    <ul class="cart-list">
      <li class="" v-for="item in cartItems.items" :key="item.id">
        <h3 class="product">{{ item.product }}</h3>
        <span>{{ item.id }}</span> <!-- Название товара -->
        <span>{{ item.count }}</span> <!-- Количество -->
        <span>{{ item.price }} ₽</span> <!-- Цена -->
      </li>
    </ul>
  </div>
</template>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto; /* Центрирование */
  padding: 2rem; /* Внутренние отступы */
  background: #a69696; /* Светлый фон */
  border-radius: 10px; /* Закругленные края */
}

.cart-list {
  list-style: none; /* Убираем стандартный стиль списка */
  padding: 0; /* Убираем внутренние отступы */
}

.cart-item {
  display: flex; /* Флекс для выравнивания элементов */
  justify-content: space-between; /* Равномерное распределение */
  padding: 1rem; /* Внутренние отступы */
  border-bottom: 1px solid #ddd; /* Разделительная линия */
}

.cart-item button {
  background-color: #ff4d4d; /* Красный цвет для кнопки удаления */
  color: white; /* Белый цвет текста */
  padding: 0.5rem 1rem; /* Внутренние отступы */
  border-radius: 5px; /* Закругленные края */
  border: none; /* Убираем обводку */
  cursor: pointer; /* Указатель мыши */
}

.cart-item button:hover {
  background-color: #d43f3f; /* Более темный красный при наведении */
}
</style>
