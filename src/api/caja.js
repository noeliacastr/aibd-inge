import axios from 'axios'; 
const cajaApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/aibd/caja',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
});
export const createCaja = (caja) => cajaApi.post('/', caja);
export const updateCaja = (caja) => cajaApi.put('/', caja);
export const getCaja = async (id) => {
    const response = await cajaApi.get(`/${id}`)
    return response.data;
};
export const getInformes = async () => {
    const res = await cajaApi.get()
    return res.data;
}; 