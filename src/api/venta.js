import axios from 'axios';
const ventaAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/aibd/venta',
    headers:{
        'Authorization': `Bearer ${localStorage.getItem("token")}`
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