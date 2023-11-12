import axios from 'axios';
const empleadoAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/aibd/empleado',
    headers:{
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
});

export const createEmployee = (empleado) => empleadoAPI.post('/', empleado)

export const updateEmployee = (empleado) => empleadoAPI.put('/', empleado)

export const deleteEmployee = id => empleadoAPI.delete(`/${id}`)

export const getEmployee = async (id) => {
    console.log(id)
    const response = await empleadoAPI.get(`/${id}`)
    return response.data;
}

export const getEmployess = async () =>{
    const res = await empleadoAPI.get()
    return res.data;
}