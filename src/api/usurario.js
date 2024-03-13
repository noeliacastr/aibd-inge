import axios from 'axios';

const usuarioAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/aibd/usuario',
    headers:{
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
});

export const updateUser = (usuario) => usuarioAPI.put('/', usuario)
export const deleteUser = (id) => usuarioAPI.delete(`/${id}`)
export const getUsuario = async (id) => {
    console.log(id)
    const response = await usuarioAPI.get(`/${id}`)
    return response.data;
}
export const getUser = async () => {
    const res = await usuarioAPI.get()
    return res.data;
}
