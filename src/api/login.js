import axios from 'axios';
const usuarioAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/aibd/usuario',
});

export const authtenticated = false;

export const login = (user) => usuarioAPI.post('/login', user)

export const create = (user) => usuarioAPI.post('/',user)

export const getUserData = async () => {
    
    try {
        const token = localStorage.getItem('token');
        const response = await usuarioAPI.get('/active/user', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        
        const userData = response.data;
        
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("useer_rol", userData.rol);
       
        return response;
    } catch (error) {
        throw error;
    }
}