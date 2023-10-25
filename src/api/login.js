import axios from 'axios';
const empleadoAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/aibd/empleado/login',
    headers:{
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
});

export const createEmployee = (empleado) => empleadoAPI.post('/', empleado)

export const updateEmployee = (empleado) => empleadoAPI.put('/', empleado)

export const deleteEmployee = id => empleadoAPI.delete(`/${id}`)

export const getEmployee = async (id) => {
    const res = await empleadoAPI.get(`/${id}`)
    return res.data;
}