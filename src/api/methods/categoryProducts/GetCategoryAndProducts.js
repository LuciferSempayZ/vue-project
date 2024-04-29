// productApi.js
import {makeRequest} from "@/api/makeRequest.js";

export const getProducts = async () => {
    const response = await makeRequest('/products'); // GET-запрос к API продуктов

    if (!response.ok) {
        throw new Error(`Ошибка при получении продуктов: ${response.statusText}`);
    }

    return response.json(); // Конвертация ответа в JSON
};

export const getProductPhotos = async () => {
    const response = await makeRequest('/photos'); // GET-запрос к API фотографий

    if (!response.ok) {
        throw new Error(`Ошибка при получении фотографий: ${response.statusText}`);
    }

    return response.json(); // Конвертация ответа в JSON
};
