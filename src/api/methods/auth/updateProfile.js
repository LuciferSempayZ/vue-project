import { makeRequest } from "@/api/makeRequest"; // Функция для выполнения API-запросов

export const updateProfile = async (profileData) => {
    try {
        // Запрос к API для обновления данных профиля
        const response = await makeRequest('/profile', 'PUT', JSON.stringify(profileData)); // Используем PUT-запрос

        if (!response.ok) {
            throw new Error(`Ошибка при обновлении профиля: ${response.statusText}`); // Если запрос не успешен
        }

        return await response.json(); // Возвращаем результат в виде JSON
    } catch (error) {
        console.error("Ошибка при обновлении профиля:", error); // Обработка ошибок
        throw error; // Возвращаем ошибку, чтобы вызвать обработку в вызывающем коде
    }
};
