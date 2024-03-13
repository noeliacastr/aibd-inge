import axios from 'axios';

const detectionAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/aibd/detecion',
    headers:{
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
});

export const createDetection = (detecion) => detectionAPI.post('/', detecion)


export const getDetections = async () =>{
    const res = await detectionAPI.get()
    return res.data;
}

