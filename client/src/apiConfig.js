import axios from 'axios';

const http = axios.create({
   baseURL: 'https://pakistanvoterfront.herokuapp.com',
//  baseURL: 'http://192.168.200.158:5000', //Release Base URL
  headers: {'Content-Type': 'application/json'},
});

http.interceptors.request.use(
  async config => { config.headers = { }; return config; },
  err => { return Promise.reject(err); },
);

export default http;