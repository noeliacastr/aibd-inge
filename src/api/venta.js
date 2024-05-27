import axios from 'axios';
import { TOKEN } from './global';
const ventaAPI = axios.create({
    baseURL: 'https://aibdproject.onrender.com/aibd/venta',
    headers:{
        'Authorization': `Bearer ${TOKEN}`
    }
});

export const createVenta = (venta) => ventaAPI.post('/', venta)

export const updateVenta = (venta) => ventaAPI.put('/', venta)

export const deleteVenta = id => ventaAPI.delete(`/${id}`)

export const getVenta = async (id) => {
    const response = await ventaAPI.get(`/${id}`)
    return response.data;
}

export const getVentas = async () =>{
    const res = await ventaAPI.get()
    return res.data;
}