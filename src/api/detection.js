import axios from 'axios';
import { TOKEN } from './global';
const detectionAPI = axios.create({
    baseURL: 'https://aibdproject.onrender.com/aibd/detection',
    headers:{
        'Authorization': `Bearer ${TOKEN}`
    }
});

export const createDetection = (detecion) => detectionAPI.post('/', detecion)


export const getDetections = async () =>{
    const res = await detectionAPI.get()
    return res.data;
}

