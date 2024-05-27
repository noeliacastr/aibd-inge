import axios from 'axios';
import { TOKEN } from './global';
const empleadoAPI = axios.create({
    baseURL: 'https://aibdproject.onrender.com/aibd/empleado',
    headers:{
        'Authorization': `Bearer ${TOKEN}`
    }
});

export const createEmployee = (empleado) => empleadoAPI.post('/', empleado)

export const updateEmployee = (empleado) => empleadoAPI.put('/', empleado)

export const deleteEmployee = id => empleadoAPI.delete(`/${id}`)

export const getEmployee = async (id) => {
    const response = await empleadoAPI.get(`/${id}`)
    return response.data;
}

export const getEmployess = async () =>{
    const res = await empleadoAPI.get()
    return res.data;
}