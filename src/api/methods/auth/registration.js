import {makeRequest} from "@/api/makeRequest.js";

export const registration = async (surname, name, password, email, phone) => {
    const response = await makeRequest(
        '/register',
        'POST',
        JSON.stringify({
            surname,
            name,
            password,
            email,
            phone
        })
    )
    return response.json()
}

