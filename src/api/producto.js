import axios from 'axios';
const productoAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/aibd/producto',
    headers:{
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
});

export const createProducto = (producto) => productoAPI.post('/', producto)

export const updateProducto = (producto) => productoAPI.put('/', producto)

export const deleteProducto = id => productoAPI.delete(`/${id}`)

export const getProducto = async (id) => {
    console.log(id)
    const response = await productoAPI.get(`/${id}`)
    return response.data;
}

export const getProductos = async () =>{
    const res = await productoAPI.get()
    return res.data;
}