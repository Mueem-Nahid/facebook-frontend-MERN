import axios from 'axios';

const API = axios.create({
   baseURL: process.env.REACT_APP_BACKEND_URL,
   timeout: 60000,
   headers: {
      'Content-Type': 'application/json'
   }
});

export default API;