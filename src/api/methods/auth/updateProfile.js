import { makeRequest } from "@/api/makeRequest"; // Функция для выполнения API-запросов

export const updateProfile = async (updatedFields) => {
// Создаем объект для хранения измененных данных
    const requestBody = {};

// Добавляем только те поля, которые изменились
    for (const key in updatedFields) {
        requestBody[key] = updatedFields[key];
    }

// Проверяем, есть ли изменения
    if (Object.keys(requestBody).length === 0) {
// Нет изменений, возвращаем пустой объект
        return {};
    }

// Отправляем запрос только если есть изменения
    const response = await makeRequest(
        '/profile',
        'POST',
        JSON.stringify(requestBody)
    );

    return response.json();
};


