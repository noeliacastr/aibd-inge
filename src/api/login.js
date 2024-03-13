import axios from 'axios';
const usuarioAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/aibd/usuario',
});

export const login = (user) => usuarioAPI.post('/login', user)
export const create = (user) => usuarioAPI.post('/',user)

