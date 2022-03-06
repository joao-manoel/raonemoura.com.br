import axios from "axios"

export function setupAPIClient(){
    const api = axios.create({
        baseURL: process.env.API_URL
    })

    return api
}

const api = setupAPIClient()

export default api