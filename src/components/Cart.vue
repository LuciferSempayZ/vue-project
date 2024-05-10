<script setup>
import {onMounted, reactive, ref} from 'vue';
import {getCart, removeFromCartBackend} from '@/stores/cart.js'; // Функции работы с корзиной
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
    cartItems.totalPrice = cartItems.items.reduce((total, item) => total + (item.count * item.price), 0); // Считаем общую стоимость
    console.log(cartItems.items)
  } catch (error) {
    console.error("Ошибка при загрузке корзины:", error);
  }
};
const removeFromCart = async (productId) => {
  try {
    await removeFromCartBackend(productId); // Удаляем товар из корзины
    await loadCart(); // Обновляем корзину
  } catch (error) {
    console.error("Ошибка при удалении товара из корзины:", error);
  }
};

onMounted(loadCart); // Загружаем корзину при монтировании
</script>

<template>
  <div class="cart-container">
    <h1>Корзина</h1>
    <ul class="cart-list">
      <li class="cart-item" v-for="item in cartItems.items" :key="item.id">
        <div class="cart-item-details">
          <h3 class="product-name">{{ item.product }}</h3> <!-- Название продукта -->
          <span class="product-count">{{ item.count }} шт.</span> <!-- Количество -->
          <span class="product-price">{{ item.count * item.price }} ₽</span> <!-- Цена -->
        </div>
        <button @click="removeFromCart(item.id)" class="delete-button">Удалить</button> <!-- Кнопка удаления -->
      </li>
    </ul>
    <div v-if="cartItems.items.length === 0" class="empty-cart">Корзина пуста</div> <!-- Сообщение, если корзина пуста -->
    <div v-else class="total-price">Общая стоимость: {{ cartItems.totalPrice }} ₽</div> <!-- Общая стоимость -->
  </div>
</template>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto; /* Центрирование */
  padding: 2rem; /* Внутренние отступы */
  background: linear-gradient(to right, #b3bb69, #885e5e); /* Градиент для фона */
  border-radius: 10px; /* Закругленные края */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Легкая тень */
}

.cart-list {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex; /* Флекс для выравнивания элементов */
  align-items: center; /* Выравнивание по центру */
  justify-content: space-between; /* Равномерное распределение */
  padding: 1rem;
  border-bottom: 1px solid #ddd; /* Разделительная линия */
}

.cart-item-image {
  width: 50px; /* Размер изображения */
  height: 50px;
  border-radius: 5px; /* Закругленные края */
  margin-right: 1rem; /* Отступ между изображением и текстом */
}

.cart-item-details {
  flex: 1; /* Позволяет элементам расти */
  display: flex;
  flex-direction: column; /* Вертикальная компоновка */
}

.product-name {
  font-size: 1.2rem; /* Размер шрифта */
  color: #333; /* Цвет текста */
}

.product-count {
  color: #555; /* Более темный цвет */
}

.product-price {
  color: #777; /* Более светлый цвет */
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #d43f3f;
}

.empty-cart {
  text-align: center; /* Центрируем текст */
  color: #999; /* Серая палитра */
}
.total-price {
  text-align: right;
  padding: 1rem;
  color: black;
}
</style>
