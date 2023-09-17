import axios from 'axios';

const http = axios.create({
   baseURL: 'https://pvf.onrender.com/',
 // baseURL: 'http://192.168.200.56:5000', //Release Base URL
 //  baseURL: 'http://192.168.1.24:5000', //Release Base URL
  headers: {'Content-Type': 'application/json'},
});

http.interceptors.request.use(
  async config => { config.headers = { }; return config; },
  err => { return Promise.reject(err); },
);

export default http;