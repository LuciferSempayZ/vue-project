import { makeRequest } from "@/api/makeRequest"; // Метод для запросов к API

export const getNews = async () => {
    const response = await makeRequest('/articles', 'GET'); // Получение списка новостей
    return await response.json();
};

export const deleteArticle = async (id) => {
    try {
        const response = await makeRequest(`/articles/${id}`, 'DELETE'); // Запрос на удаление
        if (!response.ok) {
            throw new Error(`Ошибка при удалении статьи: ${response.statusText}`);
        }
        return true; // Возвращаем true в случае успешного удаления
    } catch (error) {
        console.error("Ошибка при удалении статьи:", error);
        throw error; // Перебрасываем ошибку для обработки
    }
};

export const updateArticle = async (id, data) => {
    try {
        const response = await makeRequest(`/articles/${id}`, 'POST', JSON.stringify(data)); // Запрос на обновление
        if (!response.ok) {
            throw new Error(`Ошибка при обновлении статьи: ${response.statusText}`);
        }
        return await response.json(); // Возвращаем обновленные данные
    } catch (error) {
        console.error("Ошибка при обновлении статьи:", error);
        throw error; // Перебрасываем ошибку для обработки
    }
};

export const getArticleById = async (id) => {
    try {
        const response = await makeRequest(`/articles/${id}`, 'GET'); // Запрос на получение статьи по ID
        if (!response.ok) {
            throw new Error(`Ошибка при получении статьи: ${response.statusText}`);
        }
        return await response.json(); // Возвращаем данные в виде JSON
    } catch (error) {
        console.error("Ошибка при получении статьи:", error);
        throw error; // Перебрасываем ошибку для обработки
    }
};
export const addArticle = async (article) => {
    try {
        const response = await makeRequest('/articles', 'POST', JSON.stringify(article)); // Запрос на добавление новой статьи
        if (!response.ok) {
            throw new Error(`Ошибка при добавлении статьи: ${response.statusText}`);
        }
        return await response.json(); // Возвращаем созданную статью
    } catch (error) {
        console.error("Ошибка при добавлении статьи:", error);
        throw error; // Обработка ошибки
    }
};