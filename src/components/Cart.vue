<script setup>
import { ref, onMounted } from 'vue';
import { getCart, removeFromCart, clearCart } from '@/stores/cart.js'; // Импортируем функции работы с корзиной

const cart = ref([]); // Реактивное хранилище для корзины

// Функция для загрузки содержимого корзины
const loadCart = async () => {
  try {
    const data = await getCart(); // Загружаем данные о корзине из API
    console.log("Данные корзины:", data); // Проверяем загруженные данные
    cart.value = data; // Обновляем значение корзины
  } catch (error) {
    console.error("Ошибка при загрузке корзины:", error);
  }
};


// Функция для удаления товара из корзины
const deleteFromCart = async (productId) => {
  try {
    await removeFromCart(productId); // Удаляем товар из корзины
    await loadCart(); // Обновляем корзину
  } catch (error) {
    console.error("Ошибка при удалении из корзины:", error);
  }
};

// Функция для очистки всей корзины
const clearAllCart = async () => {
  try {
    await clearCart(); // Очищаем корзину
    await loadCart(); // Обновляем корзину
  } catch (error) {
    console.error("Ошибка при очистке корзины:", error);
  }
};

onMounted(loadCart); // Загружаем содержимое корзины при монтировании
</script>

<template>
  <div class="cart-container">
    <h1>Корзина</h1>
    <ul class="cart-list">
      <li v-for="item in cart.value" :key="item.id" class="cart-item">
        <span>{{ item.name }}</span> <!-- Название товара -->
        <span>{{ item.count }}</span> <!-- Количество -->
        <span>{{ item.price }} ₽</span> <!-- Цена -->
        <button @click="deleteFromCart(item.id)">Удалить</button> <!-- Кнопка удаления -->
      </li>
    </ul>
    <div v-if="cart.value && cart.value.length === 0">Корзина пуста</div>
    <button @click="clearAllCart" v-if="cart.value > 0">Очистить корзину</button> <!-- Очистить всю корзину -->
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

button {
  padding: 0.7rem 1.2rem;
  border-radius: 5px;
  background: linear-gradient(to right, #4caf50, #81c784); /* Градиент для кнопки */
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #66bb6a; /* Темный фон при наведении */
}
</style>
