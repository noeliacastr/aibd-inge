import axios from 'axios';
const empleadoAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/aibd/empleado',
});

export const login = (user) => empleadoAPI.post('/login', user)