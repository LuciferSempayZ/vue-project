import {makeRequest} from "@/api/makeRequest.js";

export const registration = async (email, password, name, surname, phone) => {
    const response = await makeRequest(
        '/register',
        'POST',
        JSON.stringify({
            email,
            password,
            name,
            surname,
            phone
        })
    )

    return response.json()
}
