import axios from 'axios';
import { TOKEN } from './global';
const productAPI = axios.create({
    baseURL: 'https://aibdproject.onrender.com/aibd/producto',
    headers:{
        'Authorization': `Bearer ${TOKEN}`
    }
});

export const createProduct = (producto) => productAPI.post('/', producto)

export const updateProduct = (producto) => productAPI.put('/', producto)

export const deleteProduct = id => productAPI.delete(`/${id}`)

export const getProduct = async (id) => {
    const response = await productAPI.get(`/${id}`)
    return response.data;
}

export const getProducts = async () =>{
    const res = await productAPI.get()
    return res.data;
}