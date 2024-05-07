// src/api/methods/products.js
import { makeRequest } from "@/api/makeRequest"; // Импортируем вашу функцию для запросов к API

export const getProductsByCategory = async (categoryId) => {
    try {
        // Запрос к API, используя categoryId для фильтрации
        const response = await makeRequest(`/products/category/${categoryId}`, 'GET');
        console.log("API Response:", response);
        if (!response.ok) {
            throw new Error(`Ошибка при запросе продуктов по категории: ${response.statusText}`);
        }

        return await response.json(); // Возвращаем данные в виде JSON
    } catch (error) {
        console.error("Ошибка при загрузке продуктов по категории:", error); // Обработка ошибок
        throw error; // Бросаем ошибку, чтобы обработать ее в вызывающем коде
    }
};
