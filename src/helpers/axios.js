import axios from 'axios'
import { api } from '../urlConfig'
const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
});

export default axiosInstance