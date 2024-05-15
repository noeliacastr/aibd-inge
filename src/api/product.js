import axios from 'axios';
const productAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/aibd/producto',
    headers:{
        'Authorization': `Bearer ${localStorage.getItem("token")}`
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