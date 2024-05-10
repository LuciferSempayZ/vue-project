import { ref } from 'vue';
import { makeRequest } from "@/api/makeRequest.js";

const cart = ref([]); // Реактивный массив корзины

export const addToCartBackend = async (productId, count) => {
    try {
        const response = await makeRequest('/carts', 'POST', JSON.stringify({
            product_id: productId,
            count: count,
        }));
        if (!response.ok) {
            throw new Error(`Ошибка при добавлении в корзину: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Ошибка при добавлении в корзину:", error);
        throw error;
    }
};
// Запрос для получения содержимого корзины
export const getCart = async () => {
    try {
        const response = await makeRequest('/carts', 'GET'); // Запрос на получение корзины
        if (!response.ok) {
            throw new Error(`Ошибка при получении корзины: ${response.statusText}`);
        }
        return await response.json(); // Возвращаем данные в виде JSON
    } catch (error) {
        console.error("Ошибка при получении корзины:", error);
        throw error; // Бросаем ошибку для обработки
    }
};

export const removeFromCartBackend = async (productId) => {
    try {
        const response = await makeRequest(`/carts/${productId}`, 'DELETE'); // Удаление товара
        if (!response.ok) {
            throw new Error(`Ошибка при удалении товара: ${response.statusText}`);
        }
        return true; // Если запрос успешен
    } catch (error) {
        console.error("Ошибка при удалении товара из корзины:", error);
        throw error; // Обработка ошибки
    }
};

const clearCart = () => {
    cart.value = [];
};

// Экспортируем функции и корзину
export { cart, clearCart };
