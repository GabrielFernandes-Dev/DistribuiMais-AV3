import axios from 'axios'

const BASE_URL = "http://localhost:8000/projectstructures/";

const api = axios.create({
    baseURL: BASE_URL,
})

export default api;