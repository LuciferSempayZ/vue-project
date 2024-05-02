import {makeRequest} from "@/api/makeRequest.js";

export const getCategory = async () => {
    try {
        const response = await makeRequest('/categories'); // Проверьте правильность пути
        return response.json();
    } catch (error) {
        console.error("Ошибка при получении категорий:", error); // Логируем ошибку
        throw error; // Бросаем ошибку, чтобы обработать ее выше
    }
};