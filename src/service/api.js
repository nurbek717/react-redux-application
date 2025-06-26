import axios from "axios";
import { getItem } from "../helpers/locall-storage";

axios.defaults.baseURL = 'http://localhost:3000/api'

// axios.interceptors.request.use(config => {
// const token = getItem('token')
// console.log(token);
// })
axios.interceptors.request.use(config => {
    const token = getItem('token')
    const authorization = token ? `Token ${token}` : ''
    config.headers.Authorization = authorization
    return config
    
})


export default axios