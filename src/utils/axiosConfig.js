import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://noteapp-758i.onrender.com/',
})

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers['Authorization'] = `Bearer ${token}`

    return config;
}, function (error) {
    return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
    return response && response.data ? response.data : response;
}, function (error) {
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance;