import axios from 'axios';
import { TOKEN } from './global';
const usuarioAPI = axios.create({
    baseURL: 'https://aibdproject.onrender.com/aibd/usuario',
    headers:{
        'Authorization': `Bearer ${TOKEN}`
    }
});

export const updateUser = (usuario) => usuarioAPI.put('/', usuario)
export const deleteUser = id => usuarioAPI.delete(`/${id}`)
export const getUsuario = async (id) => {
    const response = await usuarioAPI.get(`/${id}`)
    return response.data;
}
export const getUsers = async () => {
   
    const res = await usuarioAPI.get()
    return res.data;
   
}
