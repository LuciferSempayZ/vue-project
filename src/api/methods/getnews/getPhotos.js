import {makeRequest} from "@/api/makeRequest.js";

export const getArticlePreview = async (articleId) => {
    const response = await makeRequest(`/article-photos/article/${articleId}`);
    return response.json();
}