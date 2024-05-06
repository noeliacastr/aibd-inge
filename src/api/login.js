import axios from 'axios';
const usuarioAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/aibd/usuario',
});

export const login = (user) => usuarioAPI.post('/login', user)
export const create = (user) => usuarioAPI.post('/',user)

export const getUserData = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await usuarioAPI.get('/active/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const userData = response.data;
        return userData;
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        throw error;
    }
}