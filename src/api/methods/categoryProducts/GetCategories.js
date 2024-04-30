import {makeRequest} from "@/api/makeRequest.js";

export const getCategories = async () => {
    try {
        const response = await makeRequest('/categories'); // Проверьте правильность пути

        if (!response.ok) {
            throw new Error(`Ошибка при запросе категорий: ${response.statusText}`);
        }

        const data = await response.json(); // Ошибка может возникнуть при попытке парсинга HTML как JSON
        return data; // Возвращаем данные
    } catch (error) {
        console.error("Ошибка при получении категорий:", error); // Логируем ошибку
        throw error; // Бросаем ошибку, чтобы обработать ее выше
    }
};