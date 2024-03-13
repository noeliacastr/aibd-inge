import axios from 'axios';

const VentaAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/aibd/venta',
    headers:{
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
    }
});

export const getVenta = async (id) => {
    console.log(id)
    const response = await VentaAPI.get(`/${id}`)
    return response.data;
}

export const getVentas = async () =>{
    const res = await VentaAPI.get()
    return res.data;
}