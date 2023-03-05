import axios from 'axios';

const API = axios.create({
   baseURL: process.env.REACT_APP_BACKEND_URL,
   timeout: 5000,
   headers: {
      'Content-Type': 'application/json'
   }
});

export default API;