import axios from 'axios'; 
import { TOKEN } from './global';
const cajaApi = axios.create({
    baseURL: 'https://aibdproject.onrender.com/aibd/caja',
    headers: {
        'Authorization': `Bearer ${TOKEN}`
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